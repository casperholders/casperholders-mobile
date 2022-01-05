import ScreenWrapper from '@/components/layout/ScreenWrapper';
import useDispatchDisconnect from '@/hooks/actions/useDispatchDisconnect';
import { Button, Paragraph, Title } from 'react-native-paper';

export default function HomeConnected() {
  const dispatchDisconnect = useDispatchDisconnect();

  return (
    <ScreenWrapper>
      <Title>Welcome back to Casper Holders!</Title>
      <Paragraph>
        TODO
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => dispatchDisconnect()}
      >
        Disconnect
      </Button>
    </ScreenWrapper>
  );
}
