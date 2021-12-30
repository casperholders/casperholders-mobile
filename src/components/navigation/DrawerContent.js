import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Divider, Drawer, Headline } from 'react-native-paper';

export default function DrawerContent({ navigation, ...props }) {
  return (
    <DrawerContentScrollView navigation={navigation} {...props}>
      <Headline style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        CasperHolders
      </Headline>
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
