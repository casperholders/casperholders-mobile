import Alert from '@/components/common/Alert';
import Loader from '@/components/common/Loader';
import AddressInput from '@/components/inputs/AddressInput';
import AmountInput from '@/components/inputs/AmountInput';
import DeployForm from '@/components/inputs/DeployForm';
import TransferIdInput from '@/components/inputs/TransferIdInput';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import OperationSummary from '@/components/operations/OperationSummary';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import getMatchedExchange from '@/helpers/getMatchedExchange';
import usePublicKey from '@/hooks/auth/usePublicKey';
import useDeployForm from '@/hooks/inputs/useDeployForm';
import useBalance from '@/hooks/useBalance';
import useNetwork from '@/hooks/useNetwork';
import deployManager from '@/services/deployManager';
import { TransferDeployParameters } from '@casperholders/core';
import Big from 'big.js';
import { useEffect, useState } from 'react';
import { Paragraph } from 'react-native-paper';

/**
 * Transfer screen
 * @param navigation
 * @param route
 * @returns {JSX.Element}
 * @constructor
 */
export default function TransferScreen({ navigation, route }) {
  const minAmount = 2.5;
  const transferFee = 0.1;
  const activeKey = usePublicKey();
  const network = useNetwork();
  const deployForm = useDeployForm(
    navigation,
    route,
    { address: '', transferId: '1', amount: '0' },
    ['address'],
    async (signer, deployOptions, values) => {
      const deployResult = await deployManager(network.rpcUrl).prepareSignAndSendDeploy(
        new TransferDeployParameters(
          activeKey, network.network, values.amount, values.address, values.transferId,
        ),
        signer,
        deployOptions,
      );

      deployResult.amount = values.amount;
      deployResult.cost = transferFee;

      return deployResult;
    },
  );

  const matchedExchange = getMatchedExchange(deployForm.form.values.address);
  const [balanceLoading, balance, balanceError] = useBalance();
  const [balanceAfter, setBalanceAfter] = useState(undefined);
  useEffect(() => {
    try {
      setBalanceAfter(
        Big(balance).minus(deployForm.form.values.amount).minus(transferFee),
      );
    } catch (_) {
      setBalanceAfter(undefined);
    }
  }, [balance, transferFee, deployForm.form.values.amount]);

  const operationSummaryItems = [
    { label: 'Transfer fee', amount: transferFee },
    { label: 'Balance', amount: balance },
    { label: 'Balance after transfer', amount: balanceAfter },
  ];

  return balanceLoading ? <Loader /> : (
    <ScreenWrapper>
      <DeployForm
        icon="send"
        name="Transfer"
        testID="TransferSubmit"
        disabled={balanceError}
        dialogChildren={<>
          <Paragraph
            testID="amountConfirmation"
            style={{ marginBottom: 12 }}
          >
            You are about to transfer {formatCasperAmount(deployForm.form.values.amount)} to the
            following address:
          </Paragraph>
          <Paragraph style={{ marginBottom: 12 }}>
            {deployForm.form.values.address}
          </Paragraph>
          <Paragraph>
            Please verify those information are correct before transferring the funds!
          </Paragraph>
        </>}
        {...deployForm}
      >
        {balanceError && <Alert
          type="error"
          message={balanceError.message}
        />}
        <AddressInput
          label="Address"
          form={deployForm.form}
          value={deployForm.form.values.address}
          onChangeValue={(address) => deployForm.form.setValues({ address })}
        />
        {
          matchedExchange &&
          <Alert message={`Looks like you're transferring the funds to ${matchedExchange}. Please verify your transfer ID before sending the deploy.`} />
        }
        <TransferIdInput
          label="Transfer ID"
          hint="You can leave 1 if unknown"
          form={deployForm.form}
          value={deployForm.form.values.transferId}
          onChangeValue={(transferId) => deployForm.form.setValues({ transferId })}
        />
        <AmountInput
          label="Amount"
          hint={`Amount to transfer (minimum of ${minAmount} CSPR)`}
          form={deployForm.form}
          min={minAmount}
          fee={transferFee}
          funds={balance || 0}
          value={deployForm.form.values.amount}
          onChangeValue={(amount) => deployForm.form.setValues({ amount })}
        />
        <OperationSummary
          title="Transfer summary"
          items={operationSummaryItems}
        />
      </DeployForm>
    </ScreenWrapper>
  );
}
