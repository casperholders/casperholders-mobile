import CardWithIcons from '@/components/common/CardWithIcons';
import Icon from '@/components/common/Icon';
import { CASPER_LIVE_URL, RPC } from '@/env';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import useDispatchSetDeployResult from '@/hooks/actions/useDispatchSetDeployResult';
import useDeployResult from '@/hooks/selectors/operations/useDeployResult';
import deployManager from '@/services/deployManager';
import { CurrencyUtils } from '@casperholders/core/dist/services/helpers/currencyUtils';
import {
  STATUS_KO,
  STATUS_OK,
  STATUS_UNKNOWN,
} from '@casperholders/core/dist/services/results/deployResult';
import { useEffect, useState } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import RNEventSource from 'react-native-event-source';
import { Caption, Paragraph, ProgressBar, Title, useTheme } from 'react-native-paper';

const WATCHER_MAX_WAIT_IN_SECONDS = 60;

export default function OperationHistory({ deployData }) {
  const theme = useTheme();
  const types = [
    { text: 'Transfer', value: 'transfer' },
    { text: 'Simple Transfer', value: 'simpleTransfer' },
    { text: 'Add Bid', value: 'addBid' },
    { text: 'Withdraw Bid', value: 'withdrawBid' },
    { text: 'Delegate', value: 'delegate' },
    { text: 'Undelegate', value: 'undelegate' },
    { text: 'Unknown', value: 'unknown' },
    { text: 'Activate Bid', value: 'activateBid' },
    { text: 'Account Info', value: 'accountInfo' },
    { text: 'Wasm Deploy', value: 'wasmDeploy' },
    { text: 'Key Management', value: 'keyManagement' },
    { text: 'Key Weight', value: 'keyWeight' },
    { text: 'Key Management Threshold', value: 'keyManagementThreshold' },
    { text: 'CasperSign Contract', value: 'casperSignContract' },
    { text: 'ERC20', value: 'ERC20' },
    { text: 'Faucet', value: 'faucet' },
  ];
  const icon = deployData.result ? 'check-circle' : 'alert-circle';
  const color = deployData.result ? theme.colors.success : theme.colors.error;
  const url = `${CASPER_LIVE_URL}/deploy/${deployData.hash}`;
  const details = `Amount: ${formatCasperAmount(deployData.data.amount ? CurrencyUtils.convertMotesToCasper(deployData.data.amount) : '0' )} ꞏ Cost: ${formatCasperAmount(CurrencyUtils.convertMotesToCasper(deployData.cost))}`;
  const name = deployData.type.charAt(0).toUpperCase() + deployData.type.slice(1);
  return (
    <CardWithIcons
      left={<Icon
        name={icon}
        color={color}
        size={24}
        left
      />}
    >
      <Title>
        {name}
      </Title>
      <View style={styles.deployHashWrapper}>
        <Paragraph
          numberOfLines={1}
          style={styles.deployHashText}
          onPress={() => Linking.openURL(url)}
        >
          {deployData.hash}
        </Paragraph>
        <Icon
          name="open-in-new"
          style={styles.deployHashIcon}
        />
      </View>
      <Caption>
        {details}
      </Caption>
    </CardWithIcons>
  );
}

const styles = StyleSheet.create({
  deployHashWrapper: {
    flexDirection: 'row',
  },
  deployHashText: {
    textDecorationLine: 'underline',
  },
  deployHashIcon: {
    alignSelf: 'flex-start',
  },
  deployProgress: {
    marginTop: 4,
    borderRadius: 4,
  },
});
