import PrivateKeyInput from '@/components/inputs/PrivateKeyInput';
import useDispatchConnect from '@/hooks/actions/useDispatchConnect';
import useForm from '@/hooks/inputs/useForm';
import LocalAdapter from '@/services/newSigners/localAdapter';
import { useState } from 'react';
import { Button } from 'react-native-paper';

export default function LocalConnect() {
  const dispatchConnect = useDispatchConnect();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    privateKey: '',
  });

  const handleConnect = () => {
    if (!loading) {
      setLoading(true);

      dispatchConnect({
        adapterId: LocalAdapter.ID,
        options: { privateKey: form.values.privateKey },
      });
    }
  };

  return (
    <>
      <PrivateKeyInput
        label="Private key"
        form={form}
        value={form.values.privateKey}
        onChangeValue={(privateKey) => form.setValues({ privateKey })}
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
