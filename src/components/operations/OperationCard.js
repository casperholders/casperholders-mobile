import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Caption, Card, Title, useTheme } from 'react-native-paper';

export default function OperationCard({ name, description, icon, disabled, onPress }) {
  const theme = useTheme();
  const color = disabled ? theme.colors.disabled : theme.colors.text;
  const styles = StyleSheet.create({
    operationCard: {
      flex: 1,
    },
    operationCardContent: {
      alignItems: 'center',
    },
    operationCardText: {
      textAlign: 'center',
      color,
    },
  });

  const handlePress = disabled ? undefined : onPress;

  return (
    <Card
      style={styles.operationCard}
      onPress={handlePress}
    >
      <Card.Content style={styles.operationCardContent}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={color}
        />
        <Title style={styles.operationCardText}>
          {name}
        </Title>
        <Caption style={styles.operationCardText}>
          {description}
        </Caption>
      </Card.Content>
    </Card>
  );
}
