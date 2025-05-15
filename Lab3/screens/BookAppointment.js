import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const BookAppointment = ({ navigation, route }) => {
  const { service } = route.params;
  const [controller] = useMyContextController();
  const { userLogin } = controller;
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    if (!date) {
      Alert.alert('Lỗi', 'Vui lòng nhập ngày giờ hẹn');
      return;
    }
    setLoading(true);
    try {
      await firestore().collection('TRANSACTIONS').add({
        customerName: userLogin.fullName,
        customerId: userLogin.email,
        service: service.name,
        serviceId: service.id,
        phone: userLogin.phone,
        date,
        note,
        createdAt: new Date(),
        update: new Date(),
        status: 'pending',
      });
      Alert.alert('Thành công', 'Đặt lịch hẹn thành công!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', error.message || 'Không thể đặt lịch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Đặt lịch hẹn</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Tên khách hàng</Text>
        <TextInput style={styles.input} value={userLogin.fullName} editable={false} />
        <Text style={styles.label}>Dịch vụ</Text>
        <TextInput style={styles.input} value={service.name} editable={false} />
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput style={styles.input} value={userLogin.phone} editable={false} />
        <Text style={styles.label}>Ngày giờ hẹn *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập ngày giờ (VD: 20/06/2024 14:00)"
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
        <TouchableOpacity style={styles.bookBtn} onPress={handleBook} disabled={loading}>
          <Text style={styles.bookBtnText}>{loading ? 'Đang đặt...' : 'Xác nhận đặt lịch'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#e57373',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  form: {
    marginTop: 24,
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
    color: '#222',
  },
  bookBtn: {
    backgroundColor: '#e57373',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },
  bookBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookAppointment; 