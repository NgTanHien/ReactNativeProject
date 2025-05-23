import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyContextController } from "../store";
import firestore from '@react-native-firebase/firestore';

const AddNewService = () => {
  const navigation = useNavigation();
  const [controller] = useMyContextController();
  const { userLogin } = controller;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0');

  const handleAdd = async () => {
    if (!name || !price) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const now = new Date();
    try {
      const docRef = await firestore().collection('SERVICES').add({
        name,
        price: parseInt(price),
        creator: userLogin?.fullName || 'Unknown',
        time: now.toLocaleString(),
        finalUpdate: now.toLocaleString(),
        description: '',
      });
      const newService = {
        id: docRef.id,
        name,
        price: parseInt(price),
        creator: userLogin?.fullName || 'Unknown',
        time: now.toLocaleString(),
        finalUpdate: now.toLocaleString(),
        description: '',
      };
      navigation.navigate('Services', { newService });
    } catch (error) {
      alert('Lỗi khi thêm dịch vụ: ' + (error.message || error));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Service name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Input a service name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Price *</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <Text style={styles.unit}>đ</Text>
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
  </View>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  unit: {
    position: 'absolute',
    right: 36,
    top: 120,
    color: '#e57373',
    fontWeight: 'bold',
    fontSize: 16,
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

export default AddNewService; 