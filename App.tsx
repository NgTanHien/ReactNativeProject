import React from 'react';
import { SafeAreaView, View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { Button, Provider as PaperProvider, Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Import các project
import Project1 from './THBuoi1/Project1';
import Project2 from './THBuoi1/Project2';
import Project3 from './THBuoi1/Project3';
import Project4 from './THBuoi1/Project4';
import Project5 from './THBuoi1/Project5';
import Project6 from './THBuoi1/Project6';
import Project7 from './THBuoi1/Project7';
import Project8 from './THBuoi1/Project8';
import Calculator from './THBuoi1/Calculator';
// Định nghĩa các screen
type RootStackParamList = {
  Home: undefined;
  Project1: undefined;
  Project2: undefined;
  Project3: undefined;
  Project4: undefined;
  Project5: undefined;
  Project6: undefined;
  Project7: undefined;
  Project8: undefined;
  Calculator: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: Props) {
  const projects = [
    { name: 'Project1', component: 'Project1' },
    { name: 'Project2', component: 'Project2' },
    { name: 'Project3', component: 'Project3' },
    { name: 'Project4', component: 'Project4' },
    { name: 'Project5', component: 'Project5' },
    { name: 'Project6', component: 'Project6' },
    { name: 'Project7', component: 'Project7' },
    { name: 'Project8', component: 'Project8' },
    { name: 'Calculator', component: 'Calculator'},
  ] as const;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('./THBuoi1/background1.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.header}>Choose a Project</Text>
          {projects.map((project) => (
            <Button
              key={project.name}
              mode="contained"
              style={styles.button}
              onPress={() => navigation.navigate(project.component)}
              labelStyle={styles.buttonLabel}
            >
              {project.name}
            </Button>
          ))}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Project1" component={Project1} />
          <Stack.Screen name="Project2" component={Project2} />
          <Stack.Screen name="Project3" component={Project3} />
          <Stack.Screen name="Project4" component={Project4} />
          <Stack.Screen name="Project5" component={Project5} />
          <Stack.Screen name="Project6" component={Project6} />
          <Stack.Screen name="Project7" component={Project7} />
          <Stack.Screen name="Project8" component={Project8} />
          <Stack.Screen name="Calculator" component={Calculator} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    
  },
  button: {
    marginBottom: 8,
    width: 220, 
    borderRadius: 10,
    paddingVertical: 15,
    backgroundColor: '#FF1493',
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

