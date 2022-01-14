import Alert from '@/components/common/Alert';
import Loader from '@/components/common/Loader';
import AmountInput from '@/components/inputs/AmountInput';
import DeployForm from '@/components/inputs/DeployForm';
import ValidatorInput from '@/components/inputs/ValidatorInput';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import OperationSummary from '@/components/operations/OperationSummary';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import useDispatchSetDeployResult from '@/hooks/actions/useDispatchSetDeployResult';
import useDeployForm from '@/hooks/inputs/useDeployForm';
import useOperationsOptions from '@/hooks/selectors/auth/useOperationsOptions';
import usePublicKey from '@/hooks/selectors/auth/usePublicKey';
import useSigner from '@/hooks/selectors/auth/useSigner';
import useBalance from '@/hooks/useBalance';
import deployManager from '@/services/deployManager';
import { Delegate } from '@casperholders/core/dist/services/deploys/auction/actions/delegate';
import { APP_AUCTION_MANAGER_HASH, APP_NETWORK } from '@env';
import Big from 'big.js';
import { useEffect, useState } from 'react';
import { Paragraph } from 'react-native-paper';

export default function DelegateScreen({ navigation, route }) {
  const minAmount = 1;
  const stakeFee = 2.5;
  const activeKey = usePublicKey();
  const signer = useSigner();
  const operationsOptions = useOperationsOptions();
  const dispatchSetDeployResult = useDispatchSetDeployResult();
  const deployForm = useDeployForm(
    route,
    { address: '', amount: '0' },
    ['address'],
    async (values) => {
      const deployResult = await deployManager.prepareSignAndSendDeploy(
        new Delegate(
          values.amount, activeKey, values.address, APP_NETWORK, APP_AUCTION_MANAGER_HASH,
        ),
        signer,
        operationsOptions,
      );

      deployResult.amount = values.amount;
      deployResult.cost = stakeFee;

      dispatchSetDeployResult({ deployResult });

      navigation.jumpTo('HistoryTab');
    },
  );

  const [balanceLoading, balance, balanceError] = useBalance();
  const [balanceAfter, setBalanceAfter] = useState(undefined);
  useEffect(() => {
    try {
      setBalanceAfter(
        Big(balance).minus(deployForm.form.values.amount).minus(stakeFee),
      );
    } catch (_) {
      setBalanceAfter(undefined);
    }
  }, [balance, stakeFee, deployForm.form.values.amount]);

  const operationSummaryItems = [
    { label: 'Staking fee', amount: stakeFee },
    { label: 'Balance', amount: balance },
    { label: 'Balance after staking', amount: balanceAfter },
  ];

  return balanceLoading ? <Loader /> : (
    <ScreenWrapper>
      <DeployForm
        icon="send"
        name="Stake"
        disabled={balanceError}
        dialogChildren={<>
          <Paragraph style={{ marginBottom: 12 }}>
            You are about to stake {formatCasperAmount(deployForm.form.values.amount)} to the
            following address:
          </Paragraph>
          <Paragraph style={{ marginBottom: 12 }}>
            {deployForm.form.values.address}
          </Paragraph>
          <Paragraph>
            Please verify those information are correct before staking the funds!
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
          undelegate={false}
        />

        <AmountInput
          label="Amount"
          hint={`Amount to stake (minimum of ${minAmount} CSPR)`}
          form={deployForm.form}
          min={minAmount}
          fee={stakeFee}
          funds={balance || 0}
          value={deployForm.form.values.amount}
          onChangeValue={(amount) => deployForm.form.setValues({ amount })}
        />
        <OperationSummary
          title="Staking summary"
          items={operationSummaryItems}
        />
      </DeployForm>
    </ScreenWrapper>
  );
}
