import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => { 
    Alert.alert("Thông tin đăng nhập", `Username: ${username}\nPassword: ${password}`);
  };
  
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ImageBackground
        source={require("../images/background1.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Image
            source={require("../images/images.jpg")} 
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.registerText}>REGISTER</Text>

          <TextInput
            placeholder="USERNAME"
            placeholderTextColor="#333"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            placeholder="PASSWORD"
            placeholderTextColor="#333"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "90%",
    backgroundColor: "#fff", // màu vàng có độ mờ giống ảnh mẫu
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: 100,
    marginBottom: 10,
  },
  registerText: {
    alignSelf: "flex-end",
    marginBottom: 20,
    marginRight: 5,
    color: "#000",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#c96e63",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    borderRadius:5,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default App;
