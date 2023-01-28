import Alert from '@/components/common/Alert';
import GridCol from '@/components/grid/GridCol';
import PublicKeyInput from '@/components/inputs/PublicKeyInput';
import useDispatchConnect from '@/hooks/actions/useDispatchConnect';
import useForm from '@/hooks/inputs/useForm';
import usePreviousKeys from '@/hooks/usePreviousKeys';
import ReadOnlyAdapter from '@/services/signers/readOnlyAdapter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Button, Card, Paragraph, Title, useTheme } from 'react-native-paper';

/**
 * Local connect bottom sheet content
 * @returns {JSX.Element}
 * @constructor
 */
export default function LocalConnect() {
  const theme = useTheme();
  const dispatchConnect = useDispatchConnect();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    publicKey: '',
  });
  const [reloadKeys, setReloadKeys] = useState(false);

  const [loadingPreviousKeys, previousKeys] = usePreviousKeys(setReloadKeys, [reloadKeys]);

  const handleConnect = async () => {
    if (!form.validate()) {
      return;
    }
    if (!loading) {
      setLoading(true);
      const value = await AsyncStorage.getItem('@previous_public_keys');
      if (value !== null) {
        const oldKeys = JSON.parse(value);
        if (!oldKeys.includes(form.values.publicKey.toLowerCase())) {
          oldKeys.unshift(form.values.publicKey.toLowerCase());
          if (oldKeys.length > 5) {
            oldKeys.pop();
          }
          await AsyncStorage.setItem('@previous_public_keys', JSON.stringify(oldKeys));
        }
      } else {
        await AsyncStorage.setItem('@previous_public_keys', JSON.stringify([form.values.publicKey.toLowerCase()]));
      }
      dispatchConnect({
        adapterId: ReadOnlyAdapter.ID,
        options: { publicKey: form.values.publicKey },
      });
    }
  };

  const handleConnectPreviousKey = (key) => {
    dispatchConnect({
      adapterId: ReadOnlyAdapter.ID,
      options: { publicKey: key },
    });
  };
  const clearHistory = async () => {
    await AsyncStorage.removeItem('@previous_public_keys');
    setReloadKeys(true);
  };
  return (
    <>
      <Alert
        type="info"
        message="You will connect in Read Only mode. You won't be able to make any operations."
      />
      <PublicKeyInput
        label="Public key"
        form={form}
        value={form.values.publicKey}
        onChangeValue={(publicKey) => form.setValues({ publicKey })}
      />
      <Button
        mode="contained"
        icon="login"
        testID="localConnectSubmit"
        loading={loading}
        onPress={handleConnect}
      >
        Login
      </Button>
      {
        !loadingPreviousKeys && previousKeys !== null && previousKeys !== [] &&
        (<>
            <Title>
              Previous keys
            </Title>
            {previousKeys.map((key, index) => <GridCol key={index}>
              <Card style={{ backgroundColor: theme.colors.background }}>
                <Card.Content>
                  <Paragraph>
                    {key}
                  </Paragraph>
                </Card.Content>
                <Card.Actions style={{ justifyContent: 'flex-end' }}>
                  <Button
                    contentStyle={{ flexDirection: 'row-reverse' }}
                    icon="chevron-right"
                    color="white"
                    onPress={() => handleConnectPreviousKey(key)}
                  >
                    Select
                  </Button>
                </Card.Actions>
              </Card>
            </GridCol>)}
            <Button
              mode="contained"
              icon="delete"
              onPress={clearHistory}
            >
              Clear history
            </Button>
          </>
        )
      }

    </>
  );
}
