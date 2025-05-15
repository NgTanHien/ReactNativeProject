import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterService from "../routers/RouterService";
import RouterTransaction from "../routers/RouterTransaction";
import Customers from "./Customers";
import Setting from "./Setting";
import React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMyContextController } from "../store";

const Tab = createMaterialBottomTabNavigator();

const Admin = () => {
  const [controller] = useMyContextController();
  const { userLogin } = controller;
  const isAdmin = userLogin?.role === "admin";

  return (
    <Tab.Navigator
    initialRouteName="RouterService"
    shifting={true}
    barStyle={{
      backgroundColor: '#f8bbd0',
      elevation: 0,           // Xóa bóng đổ (Android)
      borderTopWidth: 0,      // Xóa viền trên (iOS/Android)
      shadowOpacity: 0,       // Xóa bóng đổ (iOS)
      }}
    >
      <Tab.Screen 
        name="RouterService" 
        component={RouterService} 
        options={{ 
          tabBarLabel: 'Services',
          tabBarIcon: ({ color }) => (
            <Icon name="tools" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen 
        name="Transaction" 
        component={RouterTransaction}
        options={{ 
          tabBarLabel: 'Transactions',
          tabBarIcon: ({ color }) => (
            <Icon name="file-document" color={color} size={24} />
          ),
        }}
      />
      {isAdmin && (
        <Tab.Screen 
          name="Customers" 
          component={Customers} 
          options={{ 
            tabBarLabel: 'Customers',
            tabBarIcon: ({ color }) => (
              <Icon name="account-group" color={color} size={24} />
            ),
          }}
        />
      )}
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

export default Admin; 