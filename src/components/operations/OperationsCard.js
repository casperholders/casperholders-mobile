import CardWithIcons from '@/components/common/CardWithIcons';
import Icon from '@/components/common/Icon';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import useNetwork from '@/hooks/useNetwork';
import {
  STATUS_KO,
  STATUS_OK,
  STATUS_UNKNOWN,
} from '@casperholders/core/dist/services/results/deployResult';
import { upperFirst } from 'lodash';
import { useMemo } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Caption, ProgressBar, Text, useTheme } from 'react-native-paper';

/**
 * Display operation details
 * @param type
 * @param hash
 * @param status
 * @param amount
 * @param cost
 * @param message
 * @param additionalInfo
 * @returns {JSX.Element}
 * @constructor
 */
export default function OperationsCard(
  { type, hash, status, amount, cost, message, additionalInfo },
) {
  const theme = useTheme();
  const network = useNetwork();
  const RESULT_STATUSES_ICONS = {
    [STATUS_UNKNOWN]: 'help-circle',
    [STATUS_OK]: 'check-circle',
    [STATUS_KO]: 'alert-circle',
  };
  const RESULT_STATUSES_COLORS = {
    [STATUS_UNKNOWN]: 'white',
    [STATUS_OK]: theme.colors.success,
    [STATUS_KO]: theme.colors.error,
  };

  const icon = RESULT_STATUSES_ICONS[status];
  const color = RESULT_STATUSES_COLORS[status];
  const url = useMemo(() => `${network.csprLiveUrl}/deploy/${hash}`, [network]);
  const details = `Amount: ${formatCasperAmount(amount)} - Cost: ${formatCasperAmount(cost)}`;
  const loading = status === STATUS_UNKNOWN;

  return (
    <CardWithIcons
      left={<Icon
        name={icon}
        color={color}
        size={24}
        left
      />}
      right={<Icon
        name="open-in-new"
        size={16}
        style={styles.deployOpenIcon}
      />}
      onPress={() => Linking.openURL(url)}
    >
      <View style={{ ...styles.deployType, backgroundColor: theme.colors.background }}>
        <Text>
          {upperFirst(type)}
        </Text>
      </View>
      <Caption style={styles.deployDetails}>
        {details}
      </Caption>
      {additionalInfo && <Caption style={styles.deployDetails}>
        {additionalInfo}
      </Caption>}
      {loading && <ProgressBar
        style={styles.deployProgress}
        indeterminate
      />}
      {!loading && (message || undefined) && <Caption style={styles.deployDetails}>
        {message}
      </Caption>}
    </CardWithIcons>
  );
}

const styles = StyleSheet.create({
  deployType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  deployOpenIcon: {
    alignSelf: 'flex-start',
  },
  deployDetails: {
    marginLeft: 4,
  },
  deployProgress: {
    marginTop: 4,
    borderRadius: 4,
  },
});
