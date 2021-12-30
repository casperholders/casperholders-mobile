import useDispatchDisconnect from '@/hooks/actions/useDispatchDisconnect';
import { View } from 'react-native';
import { Button, Paragraph, Title } from 'react-native-paper';

export default function HomeConnected() {
  const dispatchDisconnect = useDispatchDisconnect();

  return (
    <View>
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
    </View>
  );
}
