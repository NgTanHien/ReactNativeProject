import { Alert, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const Register = ({ navigation }) => {
  console.log('Register screen rendered');
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenPasswordConfirm, setHiddenPasswordConfirm] = useState(true);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const hasErrorFullName = () => !fullName;
  const hasErrorEmail = () => !email.includes("@");
  const hasErrorPassword = () => password.length < 6;
  const hasErrorPasswordConfirm = () => passwordConfirm !== password;

  const USERS = firestore().collection("USERS");

 
  useEffect(() => {
    console.log('Form validation:');
    console.log('- Full name:', hasErrorFullName() ? 'Invalid' : 'Valid');
    console.log('- Email:', hasErrorEmail() ? 'Invalid' : 'Valid');
    console.log('- Password:', hasErrorPassword() ? 'Invalid' : 'Valid');
    console.log('- Password confirm:', hasErrorPasswordConfirm() ? 'Invalid' : 'Valid');
  }, [fullName, email, password, passwordConfirm]);

  const handleCreateAccount = () => {
    console.log('Attempting to create account with email:', email);
    auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Firebase auth account created successfully');
        const userData = {
          fullName, email, password, phone, address, role: "customer"
        };
        console.log('Saving user data to Firestore:', userData);
        USERS.doc(email).set(userData)
          .then(() => {
            console.log('User data saved to Firestore successfully');
            console.log('Navigating to Login screen');
            navigation.navigate("Login");
          })
          .catch(error => {
            console.error('Error saving user data to Firestore:', error);
          });
      })
      .catch(error => {
        console.error('Error creating Firebase auth account:', error);
        Alert.alert("Tài khoản tồn tại");
      });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 30, fontWeight: "bold", alignSelf: "center", marginTop: 50, marginBottom: 50 }}>Register New Account</Text>
      <TextInput 
        label="Full Name" 
        value={fullName} 
        onChangeText={(text) => {
          console.log('Full name changed:', text);
          setFullName(text);
        }} 
      />
      <HelperText type="error" visible={hasErrorFullName()}>Full name không được phép để trống</HelperText>
      <TextInput 
        label="Email" 
        value={email} 
        onChangeText={(text) => {
          console.log('Email changed:', text);
          setEmail(text);
        }} 
      />
      <HelperText type="error" visible={hasErrorEmail()}>Địa chỉ email không hợp lệ</HelperText>
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => {
          console.log('Password changed');
          setPassword(text);
        }}
        secureTextEntry={hiddenPassword}
        right={
          <TextInput.Icon 
            icon="eye" 
            onPress={() => {
              console.log('Password visibility toggled');
              setHiddenPassword(!hiddenPassword);
            }} 
          />
        }
      />
      <HelperText type="error" visible={hasErrorPassword()}>Password ít nhất 6 kí tự</HelperText>
      <TextInput
        label="Confirm Password"
        value={passwordConfirm}
        onChangeText={(text) => {
          console.log('Confirm password changed');
          setPasswordConfirm(text);
        }}
        secureTextEntry={hiddenPasswordConfirm}
        right={
          <TextInput.Icon 
            icon="eye" 
            onPress={() => {
              console.log('Confirm password visibility toggled');
              setHiddenPasswordConfirm(!hiddenPasswordConfirm);
            }} 
          />
        }
      />
      <HelperText type="error" visible={hasErrorPasswordConfirm()}>Password phải so khớp với password</HelperText>
      <TextInput 
        label="Address" 
        value={address} 
        onChangeText={(text) => {
          console.log('Address changed:', text);
          setAddress(text);
        }} 
      />
      <TextInput 
        label="Phone" 
        value={phone} 
        onChangeText={(text) => {
          console.log('Phone changed:', text);
          setPhone(text);
        }} 
        style={{ marginBottom: 20 }} 
      />
      <Button mode="contained" onPress={handleCreateAccount}>Create New Account</Button>
      <Button onPress={() => {
        console.log('Navigating to Login screen');
        navigation.navigate("Login");
      }}>Login Account</Button>
    </View>
  );
};

export default Register; 