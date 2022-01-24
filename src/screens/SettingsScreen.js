import SectionHeading from '@/components/common/SectionHeading';
import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import InputWrapper from '@/components/inputs/InputWrapper';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import useDispatchDisconnect from '@/hooks/actions/useDispatchDisconnect';
import usePublicKey from '@/hooks/auth/usePublicKey';
import * as Clipboard from 'expo-clipboard';
import { StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

export default function SettingsScreen() {
  const dispatchDisconnect = useDispatchDisconnect();
  const activeKey = usePublicKey();
  const logo = require('../../assets/logo.png');
  const copyToClipboard = () => {
    Clipboard.setString(activeKey);
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
