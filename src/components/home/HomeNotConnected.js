import useDispatchConnect from '@/hooks/actions/useDispatchConnect';
import { Image, ImageBackground, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';

export default function HomeNotConnected() {
  const dispatchConnect = useDispatchConnect();

  const handleConnect = () => {
    // FIXME This will be removed in favor of a real connection step.
    const payload = {
      signerId: 'LOCAL_SIGNER',
      key: '01270a577d2d106c4d29402775f3dffcb9f04aad542579dd4d1cfad20572ebcb7c',
    };

    dispatchConnect(payload);
  };

  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
        <Title style={styles.header}>Casper Holders</Title>
        <Text style={styles.text}>The first Casper Network mobile wallet !</Text>
        <Button
          icon={() => (
            <Image
              source={require('../../../assets/torus.png')}
              style={{ width: 32, height: 32 }}
            />
          )}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
          onPress={handleConnect}
        >
          Connect with Torus
        </Button>
        <Button
          icon={() => (
            <Image
              source={require('../../../assets/ledger_logo.png')}
              style={{ width: 32, height: 32 }}
            />
          )}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
          onPress={handleConnect}
        >
          Connect with Ledger
        </Button>
        <Button
          icon="account"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
          disabled="true"
        >
          Connect locally (Coming soon)
        </Button>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

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
