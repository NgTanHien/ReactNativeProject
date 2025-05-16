import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Admin from "../screens/Admin";
import Customers from "../screens/Customers";
import { useMyContextController } from "../store";

const Stack = createStackNavigator();

const Router = () => {
  const [controller] = useMyContextController();
  const { userLogin } = controller;
  const isAdmin = userLogin?.role === "admin";

  console.log('Router component initialized');
  return (
    <Stack.Navigator 
      initialRouteName="Login" 
      screenOptions={{ headerShown: false }}
      screenListeners={{
        state: (e) => {
          console.log('Navigation state changed:', e.data.state);
        },
        focus: () => {
          console.log('Screen focused');
        },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={Login}
        listeners={{
          focus: () => console.log('Login screen focused'),
        }}
      />
      <Stack.Screen 
        name="Admin" 
        component={Admin}
        listeners={{
          focus: () => console.log('Admin screen focused'),
        }}
      />
      {isAdmin && (
        <Stack.Screen 
          name="Customer" 
          component={Customers}
          listeners={{
            focus: () => console.log('Customer screen focused'),
          }}
        />
      )}
      <Stack.Screen 
        name="Register" 
        component={Register}
        listeners={{
          focus: () => console.log('Register screen focused'),
        }}
      />
    </Stack.Navigator>
  );
};

export default Router; 