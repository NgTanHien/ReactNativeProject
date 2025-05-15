import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { Text, TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import { useMyContextController } from "../store";

const AddNewTransaction = ({ navigation }) => {
  const [controller] = useMyContextController();
  const { userLogin } = controller;
  const isAdmin = userLogin?.role === 'admin';

  // State chung
  const [customerName, setCustomerName] = useState(isAdmin ? '' : userLogin?.fullName || '');
  const [service, setService] = useState('');
  const [phone, setPhone] = useState(isAdmin ? '' : userLogin?.phone || '');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('pending');

  const handleAdd = async () => {
    if (!customerName || !service || !phone || !date) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }
    await firestore().collection("TRANSACTIONS").add({
      customerName,
      customerId: isAdmin ? '' : userLogin?.email,
      service,
      phone,
      date,
      note,
      status,
      createdAt: new Date(),
      update: new Date(),
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thêm cuộc hẹn</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Tên khách hàng *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên khách hàng"
          value={customerName}
          onChangeText={setCustomerName}
          editable={isAdmin}
        />
        <Text style={styles.label}>Dịch vụ *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên dịch vụ"
          value={service}
          onChangeText={setService}
        />
        <Text style={styles.label}>Số điện thoại *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          editable={isAdmin}
        />
        <Text style={styles.label}>Ngày giờ hẹn *</Text>
        <TextInput
          style={styles.input}
          placeholder="VD: 20/06/2024 14:00"
          value={date}
          onChangeText={setDate}
        />
        <Text style={styles.label}>Ghi chú</Text>
        <TextInput
          style={styles.input}
          placeholder="Ghi chú thêm (không bắt buộc)"
          value={note}
          onChangeText={setNote}
        />
        <Text style={styles.label}>Trạng thái</Text>
        <TextInput
          style={styles.input}
          placeholder="pending/confirmed/completed/cancelled"
          value={status}
          onChangeText={setStatus}
          editable={isAdmin}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>Thêm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e57373',
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  backBtn: {
    marginRight: 10,
    padding: 4,
  },
  backIcon: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  form: {
    marginTop: 32,
    marginHorizontal: 24,
  },
  label: {
    fontSize: 15,
    color: '#e57373',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#f3bcbc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 18,
    backgroundColor: '#fff',
  },
  addBtn: {
    backgroundColor: '#e57373',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddNewTransaction;