import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán thành công!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Customer')}
      >
        <Text style={styles.buttonText}>Hoàn tất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 24},
  button: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {color: 'white', fontWeight: 'bold', fontSize: 18},
});

export default SuccessScreen;
