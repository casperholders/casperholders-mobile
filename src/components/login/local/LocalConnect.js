import Alert from '@/components/common/Alert';
import PublicKeyInput from '@/components/inputs/PublicKeyInput';
import useDispatchConnect from '@/hooks/actions/useDispatchConnect';
import useForm from '@/hooks/inputs/useForm';
import ReadOnlyAdapter from '@/services/signers/readOnlyAdapter';
import { useState } from 'react';
import { Button } from 'react-native-paper';

/**
 * Local connect bottom sheet content
 * @returns {JSX.Element}
 * @constructor
 */
export default function LocalConnect() {
  const dispatchConnect = useDispatchConnect();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    publicKey: '',
  });

  const handleConnect = () => {
    if (!form.validate()) {
      return;
    }
    if (!loading) {
      setLoading(true);

      dispatchConnect({
        adapterId: ReadOnlyAdapter.ID,
        options: { publicKey: form.values.publicKey },
      });
    }
  };

  return (
    <>
      <Alert
        type="info"
        message="You will connect in Read Only mode. You won't be able to make any operations."
      />
      <PublicKeyInput
        label="Public key"
        form={form}
        value={form.values.publicKey}
        onChangeValue={(publicKey) => form.setValues({ publicKey })}
      />
      <Button
        mode="contained"
        icon="login"
        testID="localConnectSubmit"
        loading={loading}
        onPress={handleConnect}
      >
        Login
      </Button>
    </>
  );
}
