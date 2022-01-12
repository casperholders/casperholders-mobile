import Alert from '@/components/common/Alert';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import Loader from '@/components/common/Loader';
import AddressInput from '@/components/inputs/AddressInput';
import AmountInput from '@/components/inputs/AmountInput';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import OperationSummary from '@/components/operations/OperationSummary';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import useDispatchSetDeployResult from '@/hooks/actions/useDispatchSetDeployResult';
import useForm from '@/hooks/inputs/useForm';
import usePublicKey from '@/hooks/selectors/auth/usePublicKey';
import useSigner from '@/hooks/selectors/auth/useSigner';
import useAsyncHandler from '@/hooks/useAsyncHandler';
import useBalance from '@/hooks/useBalance';
import deployManager from '@/services/deployManager';
import { Delegate } from '@casperholders/core/dist/services/deploys/auction/actions/delegate';
import { APP_AUCTION_MANAGER_HASH, APP_NETWORK } from '@env';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Big from 'big.js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Paragraph, Text } from 'react-native-paper';
import useOperationsOptions from '../../hooks/selectors/auth/useOperationsOptions';

export default function DelegateScreen({ navigation, route }) {
  const activeKey = usePublicKey();
  const signer = useSigner();
  const operationsOptions = useOperationsOptions();

  const minAmount = 1;
  const stakingFee = 2.5;

  const form = useForm({
    address: '',
    amount: '0',
  });

  useEffect(() => {
    form.setValues({ address: route?.params?.address ? route?.params?.address : '' });
  }, [route?.params?.address]);

  const [balanceLoading, balance, balanceError] = useBalance();
  const [balanceAfter, setBalanceAfter] = useState(undefined);
  useEffect(() => {
    try {
      setBalanceAfter(
        Big(balance).minus(form.values.amount).minus(stakingFee),
      );
    } catch (_) {
      setBalanceAfter(undefined);
    }
  }, [balance, stakingFee, form.values.amount]);

  const operationSummaryItems = [
    { label: 'Staking fee', amount: stakingFee },
    { label: 'Balance', amount: balance },
    { label: 'Balance after staking', amount: balanceAfter },
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
        new Delegate(
          form.values.amount, activeKey, form.values.address, APP_NETWORK, APP_AUCTION_MANAGER_HASH,
        ),
        signer,
        operationsOptions,
      );
      deployResult.amount = form.values.amount;
      deployResult.cost = stakingFee;
      dispatchSetDeployResult({ deployResult });

      navigation.jumpTo('AccountTab');
    } catch (error) {
      console.error(error);
      // TODO manage error
    }
  });


  // hooks
  const sheetRef = useRef(null);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  );
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback((value) => {
    console.log(value);
    form.setValues({ address: value })
    sheetRef.current?.close();
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 200,
    },
    contentContainer: {
      backgroundColor: '#0d0e35',
    },
    itemContainer: {
      padding: 6,
      margin: 6,
      backgroundColor: '#00126b',
    },
  });
  // render
  const renderItem = useCallback(
    (item) => (
      <View
        key={item}
        style={styles.itemContainer}
      >
        <Text onPress={() => handleClosePress(item)}>{item}</Text>
      </View>
    ),
    [],
  );


  return balanceLoading ? <Loader /> : (
    <ScreenWrapper>
      {balanceError && <Alert
        type="error"
        message={balanceError.message}
      />}
      <AddressInput
        label="Validator"
        form={form}
        value={form.values.address}
        onChangeValue={(address) => form.setValues({ address })}
      />
      <Button mode="contained" style={{elevation: 0}} onPress={() => handleSnapPress(0)}>Select a validator</Button>
      <AmountInput
        label="Amount"
        hint={`Amount to stake (minimum of ${minAmount} CSPR)`}
        form={form}
        min={minAmount}
        fee={stakingFee}
        funds={balance || 0}
        value={form.values.amount}
        onChangeValue={(amount) => form.setValues({ amount })}
      />
      <OperationSummary
        title="Staking summary"
        items={operationSummaryItems}
      />
      <Button
        mode="contained"
        icon="send"
        style={{ marginTop: 'auto', elevation: 0 }}
        disabled={balanceError}
        loading={loading}
        onPress={handleDialogOpen}
      >
        Stake
      </Button>
      <ConfirmDialog
        visible={dialogVisible}
        title="Confirm staking"
        confirmLabel="Stake"
        onClose={handleDialogClose}
        onConfirm={handleDialogConfirm}
      >
        <Paragraph style={{ marginBottom: 12 }}>
          You are about to stake {formatCasperAmount(form.values.amount)} to the following
          validator:
        </Paragraph>
        <Paragraph style={{ marginBottom: 12 }}>
          {form.values.address}
        </Paragraph>
        <Paragraph>
          Please verify those information are correct before staking!
        </Paragraph>
      </ConfirmDialog>
      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: '#0d0e35',
        }}
        handleIndicatorStyle={{
          backgroundColor: 'white'
        }}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {data.map(renderItem)}
        </BottomSheetScrollView>
      </BottomSheet>
    </ScreenWrapper>
  );
}
