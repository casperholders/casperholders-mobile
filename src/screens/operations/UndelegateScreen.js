import Alert from '@/components/common/Alert';
import Loader from '@/components/common/Loader';
import AmountInput from '@/components/inputs/AmountInput';
import DeployForm from '@/components/inputs/DeployForm';
import ValidatorInput from '@/components/inputs/ValidatorInput';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import OperationSummary from '@/components/operations/OperationSummary';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import usePublicKey from '@/hooks/auth/usePublicKey';
import useDeployForm from '@/hooks/inputs/useDeployForm';
import useBalance from '@/hooks/useBalance';
import useBalanceValidator from '@/hooks/useBalanceValidator';
import useNetwork from '@/hooks/useNetwork';
import deployManager from '@/services/deployManager';
import { Undelegate } from '@casperholders/core';
import Big from 'big.js';
import { useEffect, useState } from 'react';
import { Paragraph } from 'react-native-paper';

/**
 * Undelegate screen
 * @param navigation
 * @param route
 * @returns {JSX.Element}
 * @constructor
 */
export default function UndelegateScreen({ navigation, route }) {
  const minAmount = 1;
  const unstakeFee = 2.5;
  const activeKey = usePublicKey();
  const network = useNetwork();
  const deployForm = useDeployForm(
    navigation,
    route,
    { address: '', amount: '0' },
    ['address'],
    async (signer, deployOptions, values) => {
      const deployResult = await deployManager(network.rpcUrl).prepareSignAndSendDeploy(
        new Undelegate(
          values.amount, activeKey, values.address, network.network, network.auctionManagerHash,
        ),
        signer,
        deployOptions,
      );

      deployResult.amount = values.amount;
      deployResult.cost = unstakeFee;

      return deployResult;
    },
  );

  const [balanceLoading, balance, balanceError] = useBalance();
  const [balanceAfter, setBalanceAfter] = useState(undefined);

  const [, balanceValidator] = useBalanceValidator(deployForm.form.values.address, [deployForm.form.values.address]);
  useEffect(() => {
    try {
      setBalanceAfter(
        Big(balance).plus(deployForm.form.values.amount).minus(unstakeFee),
      );
    } catch (_) {
      setBalanceAfter(undefined);
    }
  }, [balance, unstakeFee, deployForm.form.values.amount]);

  const operationSummaryItems = [
    { label: 'Unstaking fee', amount: unstakeFee },
    { label: 'Staking balance', amount: balanceValidator },
    { label: 'Balance', amount: balance },
    { label: 'Balance after unstaking', amount: balanceAfter },
  ];

  return balanceLoading ? <Loader /> : (
    <ScreenWrapper>
      <DeployForm
        icon="send"
        name="Unstake"
        testID="UnstakeSubmit"
        disabled={balanceError}
        dialogChildren={<>
          <Paragraph
            testID="amountConfirmation"
            style={{ marginBottom: 12 }}
          >
            You are about to unstake {formatCasperAmount(deployForm.form.values.amount)} from the
            following address:
          </Paragraph>
          <Paragraph style={{ marginBottom: 12 }}>
            {deployForm.form.values.address}
          </Paragraph>
          <Paragraph>
            Please verify those information are correct before unstaking the funds!
          </Paragraph>
        </>}
        {...deployForm}
      >
        {balanceError && <Alert
          type="error"
          message={balanceError.message}
        />}
        <ValidatorInput
          label="Validator"
          form={deployForm.form}
          value={deployForm.form.values.address}
          onChangeValue={(address) => deployForm.form.setValues({ address })}
          undelegate={true}
        />

        <AmountInput
          label="Amount"
          hint={`Amount to unstake (minimum of ${minAmount} CSPR)`}
          form={deployForm.form}
          min={minAmount}
          fee={0}
          funds={balanceValidator || 0}
          value={deployForm.form.values.amount}
          onChangeValue={(amount) => deployForm.form.setValues({ amount })}
        />
        <OperationSummary
          title="Unstaking summary"
          items={operationSummaryItems}
        />
      </DeployForm>
    </ScreenWrapper>
  );
}
