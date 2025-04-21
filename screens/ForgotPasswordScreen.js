import React, { useState } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { TextInput, Button, Title, HelperText } from 'react-native-paper';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const checkEmail = () => !email.includes('@');

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Forgot Password</Title>

      <TextInput
        label="Enter your email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon icon="email" />}
      />
      <HelperText type="error" visible={checkEmail()}>
        Nhập sai địa chỉ email
      </HelperText>

      <Button 
        mode="contained"
        buttonColor="pink"
        textColor="#fff"
        style={styles.button}
        onPress={() => {}}
      >
        Sent Reset Password
      </Button>

      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Go back to Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { textAlign: 'center', marginBottom: 20, fontSize: 30, fontWeight:'bold'},
  input: { marginBottom: 10 },
  button: { marginVertical: 10, borderRadius: 10 },
  link: { textAlign: 'center', color: '#333', marginTop: 10 },
  logo: { width: "100%", height: 150, marginBottom: 10 }
});
