import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import auth from "@react-native-firebase/auth";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const hasErrorEmail = () => !email.includes("@");

  const handleSendResetEmail = async () => {
    if (hasErrorEmail()) {
      Alert.alert("Email không hợp lệ");
      return;
    }
    setLoading(true);
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        "Thành công",
        "Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error("Forgot password error:", error);
      Alert.alert("Lỗi", "Không thể gửi email đặt lại mật khẩu.");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt lại mật khẩu</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <HelperText type="error" visible={hasErrorEmail()}>
        Địa chỉ Email không hợp lệ
      </HelperText>

      <Button
        mode="contained"
        onPress={handleSendResetEmail}
        loading={loading}
        disabled={loading}
        style={{ marginTop: 20 }}
      >
        Gửi email đặt lại mật khẩu
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#d32f2f",
  },
});

export default ForgotPasswordScreen;
