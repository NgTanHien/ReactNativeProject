import { createStackNavigator } from "@react-navigation/stack";
import Services from "../screens/Services";
import AddNewService from "../screens/AddNewService";
import ServiceDetail from "../screens/ServiceDetail";
import EditService from "../screens/EditService";
import BookAppointment from "../screens/BookAppointment";
import CustomerDetail from "../screens/CustomerDetail";
import { useMyContextController } from "../store";
import { IconButton } from "react-native-paper";

const Stack = createStackNavigator();

const RouterService = () => {
  const [controller] = useMyContextController();
  const { userLogin } = controller;

  return (
    <Stack.Navigator
      initialRouteName="Services"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="AddNewService" component={AddNewService} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
      <Stack.Screen name="EditService" component={EditService} />
      <Stack.Screen name="BookAppointment" component={BookAppointment} />
      <Stack.Screen name="CustomerDetail" component={CustomerDetail} />
    </Stack.Navigator>
  );
};

export default RouterService; 