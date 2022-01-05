import Big from 'big.js';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

function formatAmount(amount) {
  let formattedAmount;
  if (amount !== undefined) {
    try {
      formattedAmount = Big(amount).toString();
    } catch (_) {
      formattedAmount = '-';
    }
  } else {
    formattedAmount = '-';
  }

  return `${formattedAmount} CSPR`;
}

export default function OperationSummaryRow({ label, amount }) {
  return (
    <View style={styles.summaryRow}>
      <View style={styles.summaryCol}>
        <Text style={styles.summaryColLabel}>
          {label}
        </Text>
      </View>
      <View style={styles.summaryCol}>
        <Text style={styles.summaryColAmount}>
          {formatAmount(amount)}
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
