import OperationSummaryRow from '@/components/operations/OperationSummaryRow';
import { StyleSheet, View } from 'react-native';
import { Divider, Subheading } from 'react-native-paper';

export default function OperationSummary({ title, items }) {
  return (
    <View style={styles.summary}>
      <Subheading style={styles.summaryTitle}>
        {title}
      </Subheading>
      {items.map(({ label, amount }, index) => (
        <>
          <Divider key={`dividers-${index}`} />
          <OperationSummaryRow
            key={`rows-${index}`}
            label={label}
            amount={amount}
          />
        </>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    marginVertical: 8,
  },
  summaryTitle: {
    marginBottom: 8,
  },
});
