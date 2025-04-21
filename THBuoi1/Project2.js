// App.tsx
import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

const App = () => {
  const showAlert = () => {
    Alert.alert('Thông báo', 'Hello');
  };

  return (
    <View style={styles.container}>
      <Button title="Alert" onPress={showAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default App;
