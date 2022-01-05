import ErrorAlert from '@/components/common/ErrorAlert';
import AddressInput from '@/components/inputs/AddressInput';
import AmountInput from '@/components/inputs/AmountInput';
import TransferIdInput from '@/components/inputs/TransferIdInput';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import OperationSummary from '@/components/operations/OperationSummary';
import useForm from '@/hooks/inputs/useForm';
import useBalance from '@/hooks/useBalance';
import Big from 'big.js';
import { useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';

export default function TransferScreen() {
  const minAmount = 2.5;
  const transferFee = 0.1;

  const [balanceLoading, balance, balanceError] = useBalance();

  const form = useForm();

  const [address, setAddress] = useState('');
  const [transferId, setTransferId] = useState('0');
  const [amount, setAmount] = useState('0');

  const balanceAmount = balanceLoading || balanceError ? undefined : balance;
  let balanceAmountAfter;
  try {
    balanceAmountAfter = Big(balanceAmount).minus(amount).minus(transferFee).toString();
  } catch (_) {
    balanceAmountAfter = undefined;
  }

  const operationSummaryItems = [
    { label: 'Transfer fee', amount: transferFee },
    { label: 'Balance', amount: balance },
    { label: 'Balance after transfer', amount: balanceAmountAfter },
  ];

  const handleSubmit = () => {
    if (form.validate()) {
      console.log('Submit transfer', {
        address,
        transferId,
        amount,
      });
    }
  };

  return (
    <ScreenWrapper>
      {balanceLoading ? (
        <View style={{ paddingVertical: 50, alignItems: 'center', justifyItems: 'center' }}>
          <ActivityIndicator
            size={50}
            animating
          />
        </View>
      ) : (
        <>
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
            disabled={balanceError}
            onPress={handleSubmit}
          >
            Transfer
          </Button>
        </>
      )}
    </ScreenWrapper>
  );
}
