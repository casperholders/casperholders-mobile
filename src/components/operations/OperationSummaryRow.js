import useFormattedAmount from '@/hooks/useFormattedAmount';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function OperationSummaryRow({ label, amount }) {
  const formattedAmount = useFormattedAmount(amount);

  return (
    <View style={styles.summaryRow}>
      <View style={styles.summaryCol}>
        <Text style={styles.summaryColLabel}>
          {label}
        </Text>
      </View>
      <View style={styles.summaryCol}>
        <Text style={styles.summaryColAmount}>
          {formattedAmount}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  summaryCol: {
    flex: 1,
  },
  summaryColLabel: {
    textAlign: 'left',
  },
  summaryColAmount: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
});
