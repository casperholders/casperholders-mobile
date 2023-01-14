import ScreenWrapper from '@/components/layout/ScreenWrapper';
import CollectionCard from '@/components/nft/CollectionCard';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

/**
 * NFTs screen, display NFTs
 * @param navigation
 * @returns {JSX.Element}
 * @constructor
 */
export default function NFTsScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <Button
        style={styles.operationsDescription}
        icon="plus"
        mode="contained"
        onPress={() => {
        }}
      >
        Add collection
      </Button>
      <CollectionCard tokenID="test" />
      <CollectionCard tokenID="test2" />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  operationsDescription: {
    marginBottom: 12,
  },
});
