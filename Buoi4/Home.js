import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text variant="displayLarge">Home Screen</Text>
      <Button mode="contained" style={{ marginTop: 20 }}>
        Go to Detail
      </Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
