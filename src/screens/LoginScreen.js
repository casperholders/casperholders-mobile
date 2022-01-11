import DotsGridBackground from '@/components/common/DotsGridBackground';
import useDispatchConnect from '@/hooks/actions/useDispatchConnect';
import testLocalSigner, { TEST_ASYMMETRIC_KEY } from '@/services/signers/testLocalSigner';
import { Image, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';

export default function LoginScreen() {
  const dispatchConnect = useDispatchConnect();

  const handleConnect = (payload) => {
    dispatchConnect(payload);
  };

  return (
    <DotsGridBackground>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
        <Title style={styles.header}>Casper Holders</Title>
        <Text style={styles.text}>The first Casper Network mobile wallet !</Text>
        <Button
          icon={() => (
            <Image
              source={require('../../assets/torus.png')}
              style={{ width: 32, height: 32 }}
            />
          )}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
          disabled="true"
        >
          Connect with Torus
        </Button>
        <Button
          icon={() => (
            <Image
              source={require('../../assets/ledger_logo.png')}
              style={{ width: 32, height: 32 }}
            />
          )}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
          disabled="true"
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
        {TEST_ASYMMETRIC_KEY && <Button
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
          onPress={() => handleConnect({
            signerId: testLocalSigner.id,
            key: TEST_ASYMMETRIC_KEY.publicKey.toHex(),
          })}
        >
          Connect with test key
        </Button>}
      </KeyboardAvoidingView>
    </DotsGridBackground>
  );
}

const styles = StyleSheet.create({
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
