import ScreenWrapper from '@/components/layout/ScreenWrapper';
import useDispatchDisconnect from '@/hooks/actions/useDispatchDisconnect';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function SettingsScreen() {
  const dispatchDisconnect = useDispatchDisconnect();

  return (
    <ScreenWrapper>
      <Button
        mode="contained"
        icon="logout"
        style={styles.logoutBtn}
        onPress={() => dispatchDisconnect()}
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
