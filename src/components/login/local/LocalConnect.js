import Alert from '@/components/common/Alert';
import PrivateKeyInput from '@/components/inputs/PrivateKeyInput';
import useDispatchConnect from '@/hooks/actions/useDispatchConnect';
import useForm from '@/hooks/inputs/useForm';
import ReadOnlyAdapter from '@/services/signers/readOnlyAdapter';
import { useState } from 'react';
import { Button } from 'react-native-paper';

export default function LocalConnect() {
  const dispatchConnect = useDispatchConnect();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    publicKey: '',
  });

  const handleConnect = () => {
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
      <PrivateKeyInput
        label="Public key"
        form={form}
        value={form.values.publicKey}
        onChangeValue={(publicKey) => form.setValues({ publicKey })}
      />
      <Button
        mode="contained"
        icon="login"
        loading={loading}
        onPress={handleConnect}
      >
        Login
      </Button>
    </>
  );
}
