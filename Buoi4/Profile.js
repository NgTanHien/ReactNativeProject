import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

const Profile = ({ navigation }) => (
  <>
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title="Profile" />
    </Appbar.Header>
    <View style={styles.container}>
      <Text variant="headlineMedium">This is the Profile Screen</Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Profile;
