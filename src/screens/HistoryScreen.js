import ScreenWrapper from '@/components/layout/ScreenWrapper';
import OperationsHistory from '@/components/operations/OperationsHistory';
import OperationsResults from '@/components/operations/OperationsResults';
import useUniqueKey from '@/hooks/useUniqueKey';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';

/**
 * HistoryScreen with recent & past operations
 * @returns {JSX.Element}
 * @constructor
 */
export default function HistoryScreen() {
  const [uniqueKey, updateUniqueKey] = useUniqueKey();

  return (
    <ScreenWrapper onRefresh={updateUniqueKey}>
      <View>
        <OperationsResults />
        <Divider style={{ marginVertical: 12 }} />
        <OperationsHistory key={uniqueKey} />
      </View>
    </ScreenWrapper>
  );
}
