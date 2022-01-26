import CardLoader from '@/components/common/CardLoader';
import GridCol from '@/components/grid/GridCol';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import useDispatchConnect from '@/hooks/actions/useDispatchConnect';
import balanceService from '@/services/balanceService';
import LedgerAdapter from '@/services/newSigners/ledgerAdapter';
import TransportBLE from '@ledgerhq/react-native-hw-transport-ble';
import CasperApp from '@zondax/ledger-casper';
import { useCallback, useEffect, useState } from 'react';
import { Button, Caption, Card, Paragraph, Title, useTheme } from 'react-native-paper';

export default function LedgerKeys({ selectedDevice, handleCancel }) {
  const theme = useTheme();
  const dispatchConnect = useDispatchConnect();
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [balances, setBalances] = useState([]);


  useEffect(async () => {
    if (addresses.length === 0) {
      await loadMoreKeys();
    }
  }, [selectedDevice]);

  const loadMoreKeys = useCallback(async () => {
    setLoading(true);
    const transport = await TransportBLE.open(selectedDevice.id);
    const app = new CasperApp(transport);
    const nextKeyPath = addresses.length;
    const newAddresses = [];
    const newBalances = [];
    for (let i = nextKeyPath; i < nextKeyPath + 4; i++) {
      const ledgerKey = (await app.getAddressAndPubKey(`m/44'/506'/0'/0/${i}`)).publicKey.toString('hex');
      const address = `02${ledgerKey}`;
      const balance = await balanceService.fetchBalanceOfPublicKey(address);
      newAddresses.push(address);
      newBalances.push(balance);
    }
    setAddresses([...addresses, ...newAddresses]);
    setBalances([...balances, ...newBalances]);
    setLoading(false);
  }, [addresses, balances, selectedDevice]);

  const handleAddressSelect = useCallback((activeKeyPath) => {
    dispatchConnect({
      adapterId: LedgerAdapter.ID,
      options: {
        keysByKeyPaths: addresses,
        activeKeyPath,
        deviceId: selectedDevice.id,
        deviceName: selectedDevice.name,
      },
    });
  }, [selectedDevice, addresses]);

  return (
    <>
      <GridCol>
        <Title>
          Select a key
        </Title>
      </GridCol>
      <GridCol>
        {loading && (
          <>
            <GridCol>
              <CardLoader height={100} />
            </GridCol>
          </>
        )}
        {addresses.map((address, index) => <GridCol key={index}>
          <Card style={{ backgroundColor: theme.colors.background }}>
            <Card.Content>
              <Paragraph>
                {address}
              </Paragraph>
              <Caption>
                {formatCasperAmount(balances[index])}
              </Caption>
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'flex-end' }}>
              <Button
                contentStyle={{ flexDirection: 'row-reverse' }}
                icon="chevron-right"
                color="white"
                onPress={() => handleAddressSelect(index)}
              >
                Select
              </Button>
            </Card.Actions>
          </Card>
        </GridCol>)}
      </GridCol>
      <GridCol>
        <Button
          loading={loading}
          icon="key"
          type="info"
          mode="contained"
          onPress={() => loadMoreKeys()}
        >
          {loading ? 'Loading...' : 'Load more keys'}
        </Button>
      </GridCol>
      <GridCol>
        <Button
          type="info"
          mode="contained"
          onPress={handleCancel}
        >
          Cancel
        </Button>
      </GridCol>
    </>
  );
}