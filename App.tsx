import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";

import Login from "./KTGK/screens/LoginScreen";
import Register from "./KTGK/screens/RegisterScreen";

import HomeScreen from "./KTGK/screens/Customer";
import CartScreen from "./KTGK/screens/CartScreen";
import FoodList from "./KTGK/screens/FoodList";
import FoodDetail from "./KTGK/screens/FoodDetail";
import LogoutScreen from "./KTGK/screens/LogoutScreen";
import SuccessScreen from "./KTGK/screens/SuccessScreen";

import { MyContextControllerProvider } from "./KTGK/store";
import { CartProvider } from "./KTGK/context/CartContext";
import { MenuProvider } from "react-native-popup-menu";
import ForgotPasswordScreen from "./KTGK/screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#d32f2f" },
      headerTintColor: "#fff",
      drawerActiveTintColor: "#d32f2f",
    }}
  >
    <Drawer.Screen
      name="Restaurant App"
      component={HomeScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Icon name="restaurant-menu" color={color} size={size} />
        ),
      }}
    />
    <Drawer.Screen
      name="Giỏ hàng"
      component={CartScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Icon name="shopping-cart" color={color} size={size} />
        ),
      }}
    />
    <Drawer.Screen
      name="Đăng xuất"
      component={LogoutScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Icon name="logout" color={color} size={size} />
        ),
      }}
    />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <MenuProvider>
      <MyContextControllerProvider>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{ headerShown: false }}
            >
              {/* Màn hình Login và Register */}
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              <Stack.Screen name="Register" component={Register} />

              {/* Drawer Navigator cho màn chính */}
              <Stack.Screen name="Customer" component={DrawerNavigator} />

              {/* Ẩn nhưng vẫn có thể điều hướng được */}
              <Stack.Screen name="FoodList" component={FoodList} />
              <Stack.Screen name="FoodDetail" component={FoodDetail} />

              {/* Màn hình thanh toán thành công */}
              <Stack.Screen name="Success" component={SuccessScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </MyContextControllerProvider>
    </MenuProvider>
  );
};

export default App;
