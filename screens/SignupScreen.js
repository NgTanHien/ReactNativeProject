import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { TextInput, Button, Title, HelperText } from 'react-native-paper';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const checkEmail = () => !email.includes('@');
  const checkPasswordMatch = () => password !== confirmPassword;

  return (
    <View style={styles.container}>
     
      <Title style={styles.title}>Create a new account!</Title>

      <TextInput
        label="Enter email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon icon="email" />}
      />
      <HelperText type="error" visible={checkEmail()}>
        Nhap dia chi email khong hop le
      </HelperText>

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon 
            icon={showPassword ? "eye-off" : "eye"} 
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showPassword}
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon icon="lock-check" />}
      />
      <HelperText type="error" visible={checkPasswordMatch()}>
        Mật khẩu không khớp
      </HelperText>

      <Button 
        mode="contained"
        buttonColor="pink"
        textColor="#fff"
        style={styles.button}
        onPress={() => {}}
      >
        Sign Up
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
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
