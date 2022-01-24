import BottomSheetModalContainer from '@/components/common/BottomSheetModalContainer';
import DotsGridBackground from '@/components/common/DotsGridBackground';
import LedgerConnect from '@/components/login/ledger/LedgerConnect';
import useDispatchConnect from '@/hooks/actions/useDispatchConnect';
import LocalAdapter from '@/services/newSigners/localAdapter';
import { TEST_LOCAL_SIGNER_KEY } from '@env';
import { useCallback, useMemo, useRef } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';

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
          disabled="true"
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
          onPress={handlePresentModalPress}
        >
          Connect with Ledger
        </Button>
        <BottomSheetModalContainer
          bottomSheetModalRef={bottomSheetModalRef}
          snapPoints={snapPoints}
        >
          <LedgerConnect />
        </BottomSheetModalContainer>
        <Button
          icon="account"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
          onPress={() => navigation.navigate('Login locally')}
        >
          Connect locally
        </Button>
        {TEST_LOCAL_SIGNER_KEY && <Button
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
          onPress={() => handleConnect({
            adapterId: LocalAdapter.ID,
            options: { privateKey: TEST_LOCAL_SIGNER_KEY },
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
