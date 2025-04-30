import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 

import Contacts from '../screens/Contacts';
import Profile from '../screens/Profile';
import Favorites from '../screens/Favorites';
import User from '../screens/User';
import colors from '../utility/colors';
import Options from '../screens/Options';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); 

const getTabBarIcon = iconName => ({ color, size = 24 }) => (
  <MaterialIcons name={iconName} size={size} color={color} />
);

const ContactsScreens = () => (
  <Stack.Navigator
    initialRouteName="Contacts"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: 'tomato' },
      headerTitleAlign: 'center',
    }}
  >
    <Stack.Screen name="Contacts" component={Contacts} options={{ title: 'Contacts' }} />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={({ route }) => {
        const { contact } = route.params;
        const { name } = contact;
        return {
          title: name.split(' ')[0],
          headerTintColor: 'white',
          headerStyle: { backgroundColor: colors.blue },
        };
      }}
    />
  </Stack.Navigator>
);

const FavoritesScreens = () => (
  <Stack.Navigator initialRouteName="Favorites">
    <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
    <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
  </Stack.Navigator>
);

const UserScreens = ({ navigation }) => (
  <Stack.Navigator initialRouteName="User">
    <Stack.Screen
      name="User"
      component={User}
      options={{
        headerTitle: 'Me',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: colors.blue },
        headerRight: () => (
          <MaterialIcons
            name="settings"
            size={24}
            style={{ color: 'white', marginRight: 10 }}
            onPress={() => {
              console.log("Settings pressed");
            }}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName="ContactsScreens"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.greyLight,
        tabBarInactiveTintColor: colors.greyDark,
        tabBarStyle: { backgroundColor: colors.blue },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="ContactsScreens"
        component={ContactsScreens}
        options={{ tabBarIcon: getTabBarIcon('list') }}
      />
      <Tab.Screen
        name="FavoritesScreens"
        component={FavoritesScreens}
        options={{ tabBarIcon: getTabBarIcon('star') }}
      />
      <Tab.Screen
        name="UserScreens"
        component={UserScreens}
        options={{ tabBarIcon: getTabBarIcon('person') }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default TabNavigator;
