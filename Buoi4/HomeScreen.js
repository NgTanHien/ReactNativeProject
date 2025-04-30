import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text, Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => (
  <>
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title="Home" />
    </Appbar.Header>
    <View style={styles.container}>
      <Text variant="headlineMedium">Home Screen</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Profile')}
        style={{ marginTop: 16 }}
      >
        Go to Profile
      </Button>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default HomeScreen;
