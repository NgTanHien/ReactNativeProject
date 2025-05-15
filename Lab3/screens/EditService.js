import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import firestore from "@react-native-firebase/firestore";

const EditService = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { service } = route.params;
  const [name, setName] = useState(service?.name || '');
  const [price, setPrice] = useState(service?.price?.toString() || '0');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!name || !price) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }
  
    setLoading(true);
    try {
      const updatedService = {
        name,
        price: parseInt(price),
        update: firestore.FieldValue.serverTimestamp(),
      };
      console.log('service.id:', service.id);
      console.log('updatedService:', updatedService);
  
      await firestore().collection("SERVICES").doc(service.id).update(updatedService);
  
      // Nếu có callback onUpdate, gọi về để cập nhật danh sách
      if (route.params?.onUpdate) {
        route.params.onUpdate({ ...service, ...updatedService });
      }
  
      navigation.goBack();
    } catch (error) {
      Alert.alert("Lỗi", error.message || "Không thể cập nhật dịch vụ");
      console.error(error);
    } finally {
      setLoading(false);
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
        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate} disabled={loading}>
          <Text style={styles.updateBtnText}>Update</Text>
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
  updateBtn: {
    backgroundColor: '#e57373',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },
  updateBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditService;