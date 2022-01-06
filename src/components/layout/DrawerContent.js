import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Image, StyleSheet, View } from 'react-native';
import { Divider, Drawer, Headline } from 'react-native-paper';
import useDispatchDisconnect from '../../hooks/actions/useDispatchDisconnect';

export default function DrawerContent({ navigation, ...props }) {
  const dispatchDisconnect = useDispatchDisconnect();
  return (
    <DrawerContentScrollView style={styles.drawer} navigation={navigation} {...props}>
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
      <Drawer.Section style={styles.bottom}>
        <Drawer.Item
          label="Logout"
          icon="logout"

          onPress={() => dispatchDisconnect()}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    alignContent: 'space-between',
    flexDirection: 'row',
  },
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
  bottom: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});
