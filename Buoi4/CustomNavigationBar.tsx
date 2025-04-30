import React from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { StackHeaderProps } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';

const CustomNavigationBar: React.FC<StackHeaderProps> = ({
  navigation,
  route,
  options,
  back,
}) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const title = getHeaderTitle(options, route.name);

  // Cast to drawer navigation to access .navigate()
  const drawerNavigation = navigation as unknown as DrawerNavigationProp<ParamListBase>;

  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={title} />
      {!back && (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="dots-vertical" onPress={openMenu} />
          }
        >
          <Menu.Item
            onPress={() => {
              drawerNavigation.navigate('Home');
              closeMenu();
            }}
            title="Home"
          />
          <Menu.Item
            onPress={() => {
              drawerNavigation.navigate('Profile'); // renamed from 'Details'
              closeMenu();
            }}
            title="Profile"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 3 was pressed');
              closeMenu();
            }}
            title="Option 3"
            disabled
          />
        </Menu>
      )}
    </Appbar.Header>
  );
};

export default CustomNavigationBar;
