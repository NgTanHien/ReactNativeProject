import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { TextInput, Button, Title, HelperText } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('tanhien@gmail.com');
  const [password, setPassword] = useState('Hien@123');
  const [showPassword, setShowPassword] = useState(false);

  const checkEmail = () => !email.includes('@');

  const checkPassword = () => {
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return !regularExpression.test(password);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/images.jpg")} 
        style={styles.logo}
        resizeMode="contain"
      />

      <Title style={styles.title}>Welcome back!</Title>
       
      <TextInput
        label="Enter email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon icon="email" />}
      />
      <HelperText type="error" visible={checkEmail()}>
        Nhập sai địa chỉ email
      </HelperText>

      <TextInput
        label="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon icon="key" />}
        right={
          <TextInput.Icon 
            icon={showPassword ? "eye-off" : "eye"} 
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <HelperText type="error" visible={checkPassword()}>
        Password phai co 6-16 ky tu gom hoa thuong va ky tu dac biet
      </HelperText>

      <Button 
       mode="contained" 
       buttonColor="pink"  
       textColor="#fff"       
       style={styles.button}
       onPress={() => {}}
      >
        Login
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Create a new account?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { textAlign: 'center', marginBottom: 20, fontSize: 30, fontWeight:'bold'},
  input: { marginBottom: 10 },
  button: { marginVertical: 10,borderRadius: 10 },
  link: { textAlign: 'center', color: '#333', marginTop: 10 },
  logo: { width: "100%", height: 150, marginBottom: 10 }
});
