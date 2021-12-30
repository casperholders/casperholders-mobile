import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Image, StyleSheet, View } from 'react-native';
import { Divider, Drawer, Headline } from 'react-native-paper';

export default function DrawerContent({ navigation, ...props }) {
  return (
    <DrawerContentScrollView navigation={navigation} {...props}>
      <View
        style={styles.titleWrapper}
      >
        <Image
          source={require('../../../assets/icon.png')}
          style={styles.titleLogo}
        />
        <Headline style={styles.titleText}>
          Casper Holders
        </Headline>
      </View>
      <Divider />
      <Drawer.Item
        label="Home"
        icon="home"
        onPress={() => navigation.navigate('Home')}
      />
      <Drawer.Section title="Account">
        <Drawer.Item
          label="Balance"
          icon="wallet"
          onPress={() => navigation.navigate('Balance')}
        />
        <Drawer.Item
          label="Transfer"
          icon="send"
          onPress={() => navigation.navigate('Transfer')}
        />
      </Drawer.Section>
      <Drawer.Section title="Staking">
        <Drawer.Item
          label="Stake"
          icon="safe"
          onPress={() => navigation.navigate('Balance')}
        />
        <Drawer.Item
          label="Unstake"
          icon="lock-open"
          onPress={() => navigation.navigate('Transfer')}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  titleLogo: {
    marginRight: 8,
    width: 32,
    height: 32,
  },
  titleText: {
    fontWeight: 'bold',
  },
});
