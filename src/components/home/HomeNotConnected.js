import ScreenWrapper from '@/components/layout/ScreenWrapper';
import useDispatchConnect from '@/hooks/actions/useDispatchConnect';
import { Button, Paragraph, Title } from 'react-native-paper';

export default function HomeNotConnected() {
  const dispatchConnect = useDispatchConnect();
  // FIXME This will be removed in favor of a real connection step.
  const payload = {
    signerId: 'LOCAL_SIGNER',
    key: '01270a577d2d106c4d29402775f3dffcb9f04aad542579dd4d1cfad20572ebcb7c',
  };

  return (
    <ScreenWrapper>
      <Title>Welcome to Casper Holders!</Title>
      <Paragraph>
        You can connect your Casper key to see your balance, transfer funds, or stake your Casper
        tokens!
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => dispatchConnect(payload)}
      >
        Connect now
      </Button>
    </ScreenWrapper>
  );
}
