import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";
import Customer from "../screens/Customer";
import SuccessScreen from "../screens/SuccessScreen";
import { useMyContextController } from "../store";

const Stack = createStackNavigator();

const Router = () => {
  const [controller] = useMyContextController();
  const { userLogin } = controller;

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
        name="Success" 
        component={SuccessScreen}
        listeners={{
          focus: () => console.log('Success screen focused'),
        }}
      />
      
        <Stack.Screen 
          name="Customer" 
          component={Customer}
          listeners={{
            focus: () => console.log('Customer screen focused'),
          }}
        />

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