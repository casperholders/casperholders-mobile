import DotsGridBackground from '@/components/common/DotsGridBackground';
import LedgerConnect from '@/components/login/ledger/LedgerConnect';
import LocalConnect from '@/components/login/local/LocalConnect';
import LoginBottomSheet from '@/components/login/LoginBottomSheet';
import LoginButton from '@/components/login/LoginButton';
import TorusConnect from '@/components/login/torus/TorusConnect';
import useDispatchConnect from '@/hooks/actions/useDispatchConnect';
import LocalAdapter from '@/services/signers/localAdapter';
import { TEST_LOCAL_SIGNER_KEY } from '@env';
import { Image, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Text, Title } from 'react-native-paper';

/**
 * Login screen with Ledger USB & BLE + ReadOnly.
 * @param navigation
 * @returns {JSX.Element}
 * @constructor
 */
export default function LoginScreen({ navigation }) {
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
        <LoginBottomSheet
          icon={() => (
            <Image
              source={require('../../assets/torus.png')}
              style={{ width: 32, height: 32 }}
            />
          )}
          title="Connect with Torus"
        >
          <TorusConnect />
        </LoginBottomSheet>
        <LoginBottomSheet
          icon={() => (
            <Image
              source={require('../../assets/ledger_logo.png')}
              style={{ width: 32, height: 32 }}
            />
          )}
          title="Connect with Ledger"
        >
          <LedgerConnect />
        </LoginBottomSheet>
        <LoginBottomSheet
          icon="account"
          title="Connect locally"
        >
          <LocalConnect />
        </LoginBottomSheet>
        {TEST_LOCAL_SIGNER_KEY !== undefined && <LoginButton
          title="Connect with test key"
          onPress={() => handleConnect({
            adapterId: LocalAdapter.ID,
            options: { privateKey: TEST_LOCAL_SIGNER_KEY },
          })}
        />}
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
});
