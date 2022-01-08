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
import useBalanceOperation from '@/hooks/useBalanceOperation';
import Big from 'big.js';
import { useState } from 'react';
import { Button } from 'react-native-paper';

export default function TransferScreen() {
  const minAmount = 2.5;
  const transferFee = 0.1;

  const [address, setAddress] = useState('');
  const [transferId, setTransferId] = useState('0');
  const [amount, setAmount] = useState('0');

  const form = useForm();

  const [balanceLoading, balance, balanceError] = useBalance();
  const balanceAmount = useBalanceOperation(balanceLoading, balance, balanceError, (b) => b);
  const balanceAmountAfter = useBalanceOperation(
    balanceLoading, balance, balanceError, (b) => Big(b).minus(amount).minus(transferFee), [
      amount, transferFee,
    ],
  );

  const operationSummaryItems = [
    { label: 'Transfer fee', amount: transferFee },
    { label: 'Balance', amount: balanceAmount },
    { label: 'Balance after transfer', amount: balanceAmountAfter },
  ];

  const [loading, handleSubmit] = useAsyncHandler(() => {
    return new Promise((resolve) => {
      if (!form.validate()) {
        resolve();
        return;
      }

      setTimeout(() => {
        console.log('Submit transfer', {
          address,
          transferId,
          amount,
        });

        resolve();
      }, 2000);
    });
  });

  return balanceLoading ? (
    <Loader />
  ) : (
    <ScreenWrapper>
      {balanceError && <ErrorAlert message={balanceError.message} />}
      <AddressInput
        form={form}
        address={address}
        onChangeAddress={setAddress}
      />
      <TransferIdInput
        form={form}
        transferId={transferId}
        onChangeTransferId={setTransferId}
      />
      <AmountInput
        form={form}
        amount={amount}
        hint={`Amount to transfer (minimum of ${minAmount} CSPR)`}
        min={minAmount}
        fee={transferFee}
        funds={balance || 0}
        onChangeAmount={setAmount}
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
