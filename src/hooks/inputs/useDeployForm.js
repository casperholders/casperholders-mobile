import useForm from '@/hooks/inputs/useForm';
import useRouteFillForm from '@/hooks/inputs/useRouteFillForm';
import useAsyncHandler from '@/hooks/useAsyncHandler';
import { useState } from 'react';

export default function useDeployForm(route, initialState, filledFromRoute, runDeploy) {
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

    try {
      await runDeploy(form.values);
    } catch (error) {
      console.error(error);

      setError(error);
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
