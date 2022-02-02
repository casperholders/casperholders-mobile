import useDispatchSetDeployResult from '@/hooks/actions/useDispatchSetDeployResult';
import useAdapter from '@/hooks/auth/useAdapter';
import useOptions from '@/hooks/auth/useOptions';
import useForm from '@/hooks/inputs/useForm';
import useRouteFillForm from '@/hooks/inputs/useRouteFillForm';
import useAsyncHandler from '@/hooks/useAsyncHandler';
import { useState } from 'react';

/**
 * Deploy form handler
 * @param navigation
 * @param route
 * @param initialState
 * @param filledFromRoute
 * @param runDeploy
 * @returns {{form: ({resetValues: (function(): void), setValues: (function(*): void), values: {}, setValue: (function(*, *): void), unregister: (function(*): *[]), register: (function(*): number), validate: (function(): this is *[])}|*), dialogVisible: boolean, handleDialogOpen: handleDialogOpen, handleDialogConfirm: *, loading: *, error: unknown, handleDialogClose: (function(): void)}}
 */
export default function useDeployForm(navigation, route, initialState, filledFromRoute, runDeploy) {
  const dispatchSetDeployResult = useDispatchSetDeployResult();

  const adapter = useAdapter();
  const options = useOptions();

  const form = useForm(initialState);

  useRouteFillForm(route, form, filledFromRoute);

  const [dialogVisible, setDialogVisible] = useState(false);
  const handleDialogClose = () => setDialogVisible(false);
  const handleDialogOpen = () => {
    if (!form.validate()) {
      return;
    }

    setDialogVisible(true);
  };

  const [error, setError] = useState(undefined);
  const [loading, handleDialogConfirm] = useAsyncHandler(async () => {
    handleDialogClose();
    setError(undefined);

    const connection = await adapter.openConnection(options);

    try {
      const deployResult = await runDeploy(adapter.coreSigner, connection.options, form.values);

      dispatchSetDeployResult({ deployResult });

      navigation.jumpTo('HistoryTab');
    } catch (error) {
      console.error(error);

      setError(error);
    } finally {
      connection.close();
    }
  });

  return {
    form,
    loading,
    error,
    dialogVisible,
    handleDialogOpen,
    handleDialogClose,
    handleDialogConfirm,
  };
}
