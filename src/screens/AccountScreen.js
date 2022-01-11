import ScreenWrapper from '@/components/layout/ScreenWrapper';
import OperationsHistory from '@/components/operations/OperationsHistory';
import OperationsResults from '@/components/operations/OperationsResults';
import useDispatchDisconnect from '@/hooks/actions/useDispatchDisconnect';
import { StyleSheet, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';

export default function AccountScreen() {
  const dispatchDisconnect = useDispatchDisconnect();

  return (
    <ScreenWrapper>
      <View style={styles.operationsWrapper}>
        <OperationsResults />
        <Divider style={{ marginVertical: 12 }} />
        <OperationsHistory />
      </View>
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
  operationsWrapper: {
    marginBottom: 16,
  },
  logoutBtn: {
    marginTop: 'auto',
  },
});
