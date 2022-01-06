import useDispatchConnect from '@/hooks/actions/useDispatchConnect';
import { Button, Text, Title, useTheme } from 'react-native-paper';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Image
} from 'react-native';

export default function HomeNotConnected() {
  const dispatchConnect = useDispatchConnect();
  // FIXME This will be removed in favor of a real connection step.
  const payload = {
    signerId: 'LOCAL_SIGNER',
    key: '01270a577d2d106c4d29402775f3dffcb9f04aad542579dd4d1cfad20572ebcb7c',
  };
  const theme = useTheme();
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
    },
    container: {
      flex: 1,
      padding: 20,
      width: '100%',
      maxWidth: 340,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 128,
      height: 150,
      marginBottom: 12,
    },
    text: {
      fontSize: 16,
      lineHeight: 26,
      textAlign: 'center',
      marginBottom: 14,
    },
    header: {
      fontSize: 26,
      fontWeight: 'bold',
      paddingVertical: 14,
    },
    button: {
      width: '100%',
      marginVertical: 10,
    },
    buttonLabel: {
      fontWeight: 'bold',
      fontSize: 12,
      lineHeight: 26,
    },
  });
  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        <Title style={styles.header}>Casper Holders</Title>
        <Text style={styles.text}>The first Casper Network mobile wallet !</Text>
        <Button
          icon={({ size, color }) => (
            <Image
              source={require('../../../assets/torus.png')}
              style={{ width: 32, height: 32 }}
            />
          )}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
          onPress={() => dispatchConnect(payload)}
        >
          Connect with Torus
        </Button>
        <Button
          icon={({ size, color }) => (
            <Image
              source={require('../../../assets/ledger_logo.png')}
              style={{ width: 32, height: 32 }}
            />
          )}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
          onPress={() => dispatchConnect(payload)}
        >
          Connect with Ledger
        </Button>
        <Button
          icon='account'
          labelStyle={{fontSize: 32}}
          style={styles.button}
          mode="contained"
          disabled="true"
        >
          <Text style={styles.buttonLabel}>Connect locally (Coming soon)</Text>
        </Button>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
