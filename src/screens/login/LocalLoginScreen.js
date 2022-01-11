import PrivateKeyInput from '@/components/inputs/PrivateKeyInput';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import useDispatchConnect from '@/hooks/actions/useDispatchConnect';
import useForm from '@/hooks/inputs/useForm';
import localSigner from '@/services/signers/localSigner';
import { useState } from 'react';
import { Button } from 'react-native-paper';

export default function LocalLoginScreen() {
  const dispatchConnect = useDispatchConnect();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    privateKey: '',
  });

  const handleConnect = () => {
    if (!loading) {
      setLoading(true);

      dispatchConnect({
        signerId: localSigner.id,
        key: form.values.privateKey,
      });
    }
  };

  return (
    <ScreenWrapper>
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
    </ScreenWrapper>
  );
}
