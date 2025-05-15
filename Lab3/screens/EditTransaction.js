import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

const EditTransaction = ({ navigation, route }) => {
  const { transaction } = route.params;
  const [customerName, setCustomerName] = useState(transaction.customerName || '');
  const [service, setService] = useState(transaction.service || '');
  const [phone, setPhone] = useState(transaction.phone || '');
  const [date, setDate] = useState(transaction.date || '');
  const [note, setNote] = useState(transaction.note || '');
  const [status, setStatus] = useState(transaction.status || 'pending');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!customerName || !service || !phone || !date) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin bắt buộc");
      return;
    }
    setLoading(true);
    try {
      await firestore().collection("TRANSACTIONS").doc(transaction.id).update({
        customerName,
        service,
        phone,
        date,
        note,
        status,
        update: firestore.FieldValue.serverTimestamp(),
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật cuộc hẹn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tên khách hàng *</Text>
      <TextInput value={customerName} onChangeText={setCustomerName} style={styles.input} />
      <Text style={styles.title}>Dịch vụ *</Text>
      <TextInput value={service} onChangeText={setService} style={styles.input} />
      <Text style={styles.title}>Số điện thoại *</Text>
      <TextInput value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
      <Text style={styles.title}>Ngày giờ hẹn *</Text>
      <TextInput value={date} onChangeText={setDate} style={styles.input} placeholder="VD: 20/06/2024 14:00" />
      <Text style={styles.title}>Ghi chú</Text>
      <TextInput value={note} onChangeText={setNote} style={styles.input} />
      <Text style={styles.title}>Trạng thái</Text>
      <TextInput value={status} onChangeText={setStatus} style={styles.input} placeholder="pending/confirmed/completed/cancelled" />
      <Button mode="contained" onPress={handleUpdate} style={styles.button} loading={loading} disabled={loading}>
        Lưu thay đổi
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { marginTop: 20 },
  input: { backgroundColor: "white", marginBottom: 10 },
  button: { marginTop: 30, backgroundColor: "#f06277" },
});

export default EditTransaction;