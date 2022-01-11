import Alert from '@/components/common/Alert';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import Loader from '@/components/common/Loader';
import AddressInput from '@/components/inputs/AddressInput';
import AmountInput from '@/components/inputs/AmountInput';
import TransferIdInput from '@/components/inputs/TransferIdInput';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import OperationSummary from '@/components/operations/OperationSummary';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import getMatchedExchange from '@/helpers/getMatchedExchange';
import useDispatchSetDeployResult from '@/hooks/actions/useDispatchSetDeployResult';
import useForm from '@/hooks/inputs/useForm';
import useActiveKey from '@/hooks/selectors/auth/useActiveKey';
import useSigner from '@/hooks/selectors/auth/useSigner';
import useTransferOptions from '@/hooks/selectors/auth/useTransferOptions';
import useAsyncHandler from '@/hooks/useAsyncHandler';
import useBalance from '@/hooks/useBalance';
import deployManager from '@/services/deployManager';
import { TransferDeployParameters } from '@casperholders/core';
import { APP_NETWORK } from '@env';
import Big from 'big.js';
import { useEffect, useState } from 'react';
import { Button, Paragraph } from 'react-native-paper';

export default function TransferScreen({ jumpTo }) {
  const activeKey = useActiveKey();
  const signer = useSigner();
  const transferOptions = useTransferOptions();

  const minAmount = 2.5;
  const transferFee = 0.1;

  const form = useForm({
    address: '',
    transferId: '0',
    amount: '0',
  });

  const matchedExchange = getMatchedExchange(form.values.address);

  const [balanceLoading, balance, balanceError] = useBalance();
  const [balanceAfter, setBalanceAfter] = useState(undefined);
  useEffect(() => {
    try {
      setBalanceAfter(
        Big(balance).minus(form.values.amount).minus(transferFee),
      );
    } catch (_) {
      setBalanceAfter(undefined);
    }
  }, [balance, transferFee, form.values.amount]);

  const operationSummaryItems = [
    { label: 'Transfer fee', amount: transferFee },
    { label: 'Balance', amount: balance },
    { label: 'Balance after transfer', amount: balanceAfter },
  ];

  const [dialogVisible, setDialogVisible] = useState(false);
  const handleDialogClose = () => setDialogVisible(false);
  const handleDialogOpen = () => {
    if (!form.validate()) {
      return;
    }

    setDialogVisible(true);
  };

  const dispatchSetDeployResult = useDispatchSetDeployResult();
  const [loading, handleDialogConfirm] = useAsyncHandler(async () => {
    handleDialogClose();

    try {
      const deployResult = await deployManager.prepareSignAndSendDeploy(
        new TransferDeployParameters(
          activeKey, APP_NETWORK, form.values.amount, form.values.address, form.values.transferId,
        ),
        signer,
        transferOptions,
      );

      dispatchSetDeployResult({ deployResult });

      jumpTo('account');
    } catch (error) {
      console.error(error);
      // TODO manage error
    }
  });

  return balanceLoading ? <Loader /> : (
    <ScreenWrapper>
      {balanceError && <Alert
        type="error"
        message={balanceError.message}
      />}
      <AddressInput
        label="Address"
        form={form}
        value={form.values.address}
        onChangeValue={(address) => form.setValues({ address })}
      />
      {
        matchedExchange &&
        <Alert message={`Looks like you're transferring the funds to ${matchedExchange}. Please verify your transfer ID before sending the deploy.`} />
      }
      <TransferIdInput
        label="Transfer ID"
        hint="You can leave 0 if unknown"
        form={form}
        value={form.values.transferId}
        onChangeValue={(transferId) => form.setValues({ transferId })}
      />
      <AmountInput
        label="Amount"
        hint={`Amount to transfer (minimum of ${minAmount} CSPR)`}
        form={form}
        min={minAmount}
        fee={transferFee}
        funds={balance || 0}
        value={form.values.amount}
        onChangeValue={(amount) => form.setValues({ amount })}
      />
      <OperationSummary
        title="Transfer summary"
        items={operationSummaryItems}
      />
      <Button
        mode="contained"
        icon="send"
        style={{ marginTop: 'auto' }}
        disabled={balanceError}
        loading={loading}
        onPress={handleDialogOpen}
      >
        Transfer
      </Button>
      <ConfirmDialog
        visible={dialogVisible}
        title="Confirm transfer"
        confirmLabel="Transfer"
        onClose={handleDialogClose}
        onConfirm={handleDialogConfirm}
      >
        <Paragraph style={{ marginBottom: 12 }}>
          You are about to transfer {formatCasperAmount(form.values.amount)} to the following
          address:
        </Paragraph>
        <Paragraph style={{ marginBottom: 12 }}>
          {form.values.address}
        </Paragraph>
        <Paragraph>
          Please verify those information are correct before transferring the funds!
        </Paragraph>
      </ConfirmDialog>
    </ScreenWrapper>
  );
}
