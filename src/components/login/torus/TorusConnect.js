import { APP_CASPERHOLDERS_URL } from '@env';
import { Linking } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function TorusConnect() {
  return <>
    <Text>
      Unfortunately Torus is not supported on the mobile app.
      You can use CasperHolders website instead !
    </Text>
    <Button
      icon="link"
      mode="contained"
      style={{ marginTop: 30 }}
      onPress={() => Linking.openURL(APP_CASPERHOLDERS_URL)}
    >
      Open CasperHolders website
    </Button>
  </>;
}
