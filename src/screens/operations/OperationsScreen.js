import Alert from '@/components/common/Alert';
import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import OperationsChoiceCard from '@/components/operations/OperationsChoiceCard';
import useAdapter from '@/hooks/auth/useAdapter';
import ReadOnlyAdapter from '@/services/signers/readOnlyAdapter';
import { StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';

/**
 * Operation screen, display all types of operations
 * @param navigation
 * @returns {JSX.Element}
 * @constructor
 */
export default function OperationsScreen({ navigation }) {
  const adapter = useAdapter();
  const readOnly = adapter.constructor.ID === ReadOnlyAdapter.ID;

  const operations = [
    {
      route: 'Transfer',
      icon: 'send',
      name: 'Transfer',
      description: 'Transfer funds to another address',
    },
    {
      route: 'Unstake',
      icon: 'lock-open',
      name: 'Unstake',
      description: 'Unstake your tokens from the network.',
    },
    {
      route: 'Stake',
      icon: 'safe',
      name: 'Stake',
      description: 'Stake your tokens to secure the network.',
    },
  ];

  return (
    <ScreenWrapper>
      <Paragraph style={styles.operationsDescription}>
        Choose an operation to execute from the list bellow.
      </Paragraph>
      {readOnly &&
        <Alert
          type="info"
          message="You are in Read Only mode. You can't make any operations."
        />
      }
      <GridRow>
        {operations.map(({ route, name, description, icon, disabled }, index) => (
          <GridCol
            key={index}
            width={1 / 2}
          >
            <OperationsChoiceCard
              name={name}
              description={description}
              icon={icon}
              disabled={disabled || readOnly}
              onPress={() => navigation.navigate(route)}
            />
          </GridCol>
        ))}
      </GridRow>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  operationsDescription: {
    marginBottom: 12,
  },
});
