import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const CustomerDetail = ({ route, navigation }) => {
  const { customer } = route.params;
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy các giao dịch của khách hàng này
    const unsubscribe = firestore()
      .collection('TRANSACTIONS')
      .where('customerId', '==', customer.email)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTransactions(data);
        setLoading(false);
      });
    return () => unsubscribe();
  }, [customer.email]);

  const renderItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <Text style={styles.serviceName}>{item.service}</Text>
      <Text style={styles.serviceInfo}>Ngày giờ: {item.date || '---'}</Text>
      <Text style={styles.serviceInfo}>Trạng thái: {item.status || '---'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 4, marginRight: 8}}>
          <Text style={{color: '#e57373', fontSize: 22}}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin khách hàng</Text>
      </View>
      <View style={styles.profileCard}>
        <Text style={styles.label}>Tên: <Text style={styles.value}>{customer.name || customer.fullName || '---'}</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.value}>{customer.email || '---'}</Text></Text>
        <Text style={styles.label}>Số điện thoại: <Text style={styles.value}>{customer.phone || '---'}</Text></Text>
      </View>
      <Text style={styles.sectionTitle}>Dịch vụ đã sử dụng</Text>
      {loading ? (
        <Text style={{textAlign: 'center', color: '#aaa'}}>Đang tải...</Text>
      ) : transactions.length === 0 ? (
        <Text style={{textAlign: 'center', color: '#aaa'}}>Chưa có dịch vụ nào</Text>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{padding: 16}}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e57373',
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  value: {
    fontWeight: 'normal',
    color: '#e57373',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#e57373',
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  serviceItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1.2,
    borderColor: '#e57373',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  serviceInfo: {
    fontSize: 14,
    color: '#666',
  },
});

export default CustomerDetail; 