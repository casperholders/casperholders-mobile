import useDispatchConnect from '@/hooks/actions/useDispatchConnect';
import { View } from 'react-native';
import { Button, Paragraph, Title } from 'react-native-paper';

export default function HomeNotConnected() {
  const dispatchConnect = useDispatchConnect();
  // FIXME This will be removed in favor of a real connection step.
  const payload = {
    key: 'MC4CAQAwBQYDK2VwBCIEIBb1u9Dps6qB7959qw1BqisO4BhgmJvDtvN3veb3DeqC',
  };

  return (
    <View>
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
    </View>
  );
}
