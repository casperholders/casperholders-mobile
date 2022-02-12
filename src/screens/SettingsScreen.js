import Alert from '@/components/common/Alert';
import SectionHeading from '@/components/common/SectionHeading';
import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import InputWrapper from '@/components/inputs/InputWrapper';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import useDispatchChangeNetwork from '@/hooks/actions/useDispatchChangeNetwork';
import useDispatchDisconnect from '@/hooks/actions/useDispatchDisconnect';
import usePublicKey from '@/hooks/auth/usePublicKey';
import useNetwork from '@/hooks/useNetwork';
import MainnetAdapter from '@/services/networks/mainnetAdapter';
import NetworkManager from '@/services/networks/networkManager';
import TestnetAdapter from '@/services/networks/testnetAdapter';
import * as Clipboard from 'expo-clipboard';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

/**
 * Settings Screen display the public key & QRCode and manage the network state
 * @returns {JSX.Element}
 * @constructor
 */
export default function SettingsScreen() {
  const dispatchDisconnect = useDispatchDisconnect();
  const dispatchChangeNetwork = useDispatchChangeNetwork();
  const activeKey = usePublicKey();
  const network = useNetwork();
  const switchNetwork = useMemo(() => {
    if (network.name === 'Testnet') {
      return NetworkManager.adapter(MainnetAdapter.ID);
    } else {
      return NetworkManager.adapter(TestnetAdapter.ID);
    }
  }, [network]);
  const logo = require('../../assets/logo.png');
  const copyToClipboard = () => {
    Clipboard.setString(activeKey);
  };

  const switchToNetwork = () => {
    if (network.name === 'Testnet') {
      dispatchChangeNetwork({
        network: MainnetAdapter.ID,
      });
    } else {
      dispatchChangeNetwork({
        network: TestnetAdapter.ID,
      });
    }

  };

  return (
    <ScreenWrapper>
      <GridRow>
        <GridCol>
          <SectionHeading title="Public Key" />
          <InputWrapper>
            <TextInput
              value={activeKey}
              dense
              left={<TextInput.Icon name="account" />}
              editable={false}
              right={<TextInput.Icon
                name="content-copy"
                accessibilityLabel="Copy"
                forceTextInputFocus={false}
                onPress={copyToClipboard}
              />}
            />
          </InputWrapper>
        </GridCol>
        <GridCol style={{ alignItems: 'center' }}>
          <SectionHeading
            title="QR Code"
            description="Share your public key easily."
          />
          <QRCode
            value={activeKey}
            logo={logo}
            size={200}
            quietZone={10}
            logoBackgroundColor="black"
          />
        </GridCol>
        <GridCol style={{ alignItems: 'center' }}>
          <SectionHeading
            title="Network"
            description="Switch to testnet or mainnet"
          />
          <GridRow>
            <GridCol>
              <Alert
                type="info"
                message={`You are actually using the ${network.name}.`}
              />
            </GridCol>
            <GridCol>
              <Button
                mode="contained"
                icon="switch"
                style={{ marginBottom: 20 }}
                onPress={switchToNetwork}
                testID='toggleNetwork'
              >
                Switch to {switchNetwork.name}
              </Button>
            </GridCol>
          </GridRow>
        </GridCol>
      </GridRow>

      <Button
        mode="contained"
        icon="logout"
        style={styles.logoutBtn}
        onPress={dispatchDisconnect}
      >
        Logout
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    marginTop: 'auto',
  },
});
