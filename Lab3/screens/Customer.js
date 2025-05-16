import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Services from "./Services";
import RouterTransaction from "../routers/RouterTransaction";
import Setting from "./Setting";
import React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const Customer = () => {
  return (
    <Tab.Navigator
      initialRouteName="Services"
      shifting={true}
      barStyle={{ backgroundColor: '#f8bbd0' }}
    >
      <Tab.Screen
        name="Services"
        component={Services}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={RouterTransaction}
        options={{
          tabBarLabel: 'Transaction',
          tabBarIcon: ({ color }) => (
            <Icon name="file-document" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Customer"
        component={Setting}
        options={{
          tabBarLabel: 'Customer',
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Customer; 