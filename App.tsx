import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';
import HomeScreen from './Buoi4/HomeScreen';
import ProfileScreen from './Buoi4/Profile';
import CustomNavigationBar from './Buoi4/CustomNavigationBar';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: (props: StackHeaderProps) => <CustomNavigationBar {...props} />,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
