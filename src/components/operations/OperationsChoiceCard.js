import Icon from '@/components/common/Icon';
import { StyleSheet } from 'react-native';
import { Caption, Card, Title, useTheme } from 'react-native-paper';

/**
 * Abstract Operation card choice
 * @param name
 * @param testID
 * @param description
 * @param icon
 * @param disabled
 * @param onPress
 * @returns {JSX.Element}
 * @constructor
 */
export default function OperationsChoiceCard({
                                               name,
                                               testID,
                                               description,
                                               icon,
                                               disabled,
                                               onPress,
                                             }) {
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
      testID={testID}
    >
      <Card.Content style={styles.operationCardContent}>
        <Icon
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
