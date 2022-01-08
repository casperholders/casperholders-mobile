import ErrorAlert from '@/components/common/ErrorAlert';
import Loader from '@/components/common/Loader';
import AddressInput from '@/components/inputs/AddressInput';
import AmountInput from '@/components/inputs/AmountInput';
import TransferIdInput from '@/components/inputs/TransferIdInput';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import OperationSummary from '@/components/operations/OperationSummary';
import useForm from '@/hooks/inputs/useForm';
import useAsyncHandler from '@/hooks/useAsyncHandler';
import useBalance from '@/hooks/useBalance';
import Big from 'big.js';
import { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';

export default function TransferScreen() {
  const minAmount = 2.5;
  const transferFee = 0.1;

  const form = useForm({
    address: '',
    transferId: '0',
    amount: '0',
  });

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

  const [loading, handleSubmit] = useAsyncHandler(() => {
    return new Promise((resolve) => {
      if (!form.validate()) {
        resolve();
        return;
      }

      setTimeout(() => {
        console.log('Submit transfer', form.values);

        resolve();
      }, 2000);
    });
  });

  return balanceLoading ? <Loader /> : (
    <ScreenWrapper>
      {balanceError && <ErrorAlert message={balanceError.message} />}
      <AddressInput
        label="Address"
        form={form}
        value={form.values.address}
        onChangeValue={(address) => form.setValues({ address })}
      />
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
        onPress={handleSubmit}
      >
        Transfer
      </Button>
    </ScreenWrapper>
  );
}
