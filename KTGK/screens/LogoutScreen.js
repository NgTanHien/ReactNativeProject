import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { useMyContextController } from "../store/index"; 
const LogoutScreen = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await auth().signOut();
        dispatch({ type: "LOGOUT" }); // Reset user trong context
        navigation.replace("Login"); 
      } catch (error) {
        console.error("Logout failed:", error);
        Alert.alert("Đăng xuất thất bại", "Vui lòng thử lại.");
      }
    };

    logoutUser();
  }, [dispatch, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#d32f2f" />
      <Text>Đang đăng xuất...</Text>
    </View>
  );
};

export default LogoutScreen;
