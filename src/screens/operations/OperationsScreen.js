import GridCol from '@/components/grid/GridCol';
import GridRow from '@/components/grid/GridRow';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import OperationsChoiceCard from '@/components/operations/OperationsChoiceCard';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';

export default function OperationsScreen({ navigation }) {
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
      description: 'Coming soon',
      disabled: true,
    },
    {
      route: 'Stake',
      icon: 'safe',
      name: 'Stake',
      description: 'Coming soon',
      disabled: true,
    },
  ];

  return (
    <ScreenWrapper>
      <Paragraph style={styles.operationsDescription}>
        Choose an operation to execute from the list bellow.
      </Paragraph>
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
              disabled={disabled}
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
