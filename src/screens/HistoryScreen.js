import ScreenWrapper from '@/components/layout/ScreenWrapper';
import OperationsHistory from '@/components/operations/OperationsHistory';
import OperationsResults from '@/components/operations/OperationsResults';
import useDispatchDisconnect from '@/hooks/actions/useDispatchDisconnect';
import useUniqueKey from '@/hooks/useUniqueKey';
import { StyleSheet, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';

export default function HistoryScreen() {
  const [uniqueKey, updateUniqueKey] = useUniqueKey();
  const dispatchDisconnect = useDispatchDisconnect();

  return (
    <ScreenWrapper onRefresh={updateUniqueKey}>
      <View style={styles.operationsWrapper}>
        <OperationsResults />
        <Divider style={{ marginVertical: 12 }} />
        <OperationsHistory key={uniqueKey} />
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
