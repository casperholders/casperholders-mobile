import CardWithIcons from '@/components/common/CardWithIcons';
import ValidatorIcon from '@/components/common/ValidatorIcon';
import formatCasperAmount from '@/helpers/formatCasperAmount';
import { StyleSheet, View } from 'react-native';
import { Caption, Divider, Text, useTheme } from 'react-native-paper';

/**
 * Display validator infos
 * @param validator
 * @param onPress
 * @returns {JSX.Element}
 * @constructor
 */
export default function ValidatorCard({ validator, onPress }) {
  const theme = useTheme();
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
    validatorName: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    validatorDetails: {
      marginLeft: 4,
    },
  });
  return (
    <>
      <CardWithIcons
        left={validator.png ? <ValidatorIcon
          url={validator.png}
          size={35}
          left
        /> : undefined}
        onPress={onPress}
      >
        <View style={{ ...styles.validatorName, backgroundColor: theme.colors.background }}>
          <Text>
            {validator.name}
          </Text>
        </View>
        {
          validator.name !== validator.publicKey &&
          <Caption style={styles.validatorDetails}>
            {validator.publicKey}
          </Caption>
        }
        <Caption style={styles.validatorDetails}>
          {validator.group} - {validator.delegation_rate}% Fee
          - {formatCasperAmount(validator.staked_amount)} CSPR Staked
        </Caption>
      </CardWithIcons>
      <Divider />
    </>
  );
}
