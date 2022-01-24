import DotsGridBackground from '@/components/common/DotsGridBackground';
import LedgerConnect from '@/components/login/ledger/LedgerConnect';
import LocalConnect from '@/components/login/local/LocalConnect';
import LoginBottomSheet from '@/components/login/LoginBottomSheet';
import LoginButton from '@/components/login/LoginButton';
import useDispatchConnect from '@/hooks/actions/useDispatchConnect';
import LocalAdapter from '@/services/newSigners/localAdapter';
import { TEST_LOCAL_SIGNER_KEY } from '@env';
import { useCallback, useMemo, useRef } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Text, Title } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
  const dispatchConnect = useDispatchConnect();

  const bottomSheetModalRef = useRef(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  // variables
  const snapPoints = useMemo(() => ['46%'], []);
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
        <LoginButton
          icon={() => (
            <Image
              source={require('../../assets/torus.png')}
              style={{ width: 32, height: 32 }}
            />
          )}
          title="Connect with Torus"
          disabled={true}
        />
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
        {TEST_LOCAL_SIGNER_KEY && <LoginButton
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
