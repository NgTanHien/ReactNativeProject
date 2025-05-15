import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';
import { useNavigation } from '@react-navigation/native';

const Customers = () => {
  const [controller] = useMyContextController();
  const { userLogin } = controller;
  const isAdmin = userLogin?.role === 'admin';
  const navigation = useNavigation();

  // ADMIN: Danh sách khách hàng
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      const unsubscribe = firestore().collection('CUSTOMERS').onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCustomers(data);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [isAdmin]);

  const filtered = customers.filter(c => c.name?.toLowerCase().includes(search.toLowerCase()));

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => isAdmin && navigation.navigate('CustomerDetail', { customer: item })}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.info}>SĐT: {item.phone || '---'}</Text>
      <Text style={styles.info}>Email: {item.email || '---'}</Text>
    </TouchableOpacity>
  );

  // KHÁCH HÀNG: Thông tin cá nhân
  if (!isAdmin) {
    return null;
  }

  // ADMIN: Danh sách khách hàng
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{userLogin?.fullName || userLogin?.name || 'Tài khoản'}</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => { /* TODO: Thêm chức năng thêm mới */ }}>
          <Icon name="plus-circle" size={28} color="#e57373" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchRow}>
        <Icon name="magnify" size={22} color="#bbb" style={{marginRight: 6}} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm khách hàng..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {loading ? (
        <Text style={{textAlign: 'center', marginTop: 32, color: '#aaa'}}>Đang tải...</Text>
      ) : filtered.length === 0 ? (
        <Text style={{textAlign: 'center', marginTop: 32, color: '#aaa'}}>Chưa có khách hàng nào</Text>
      ) : (
        <FlatList
          data={filtered}
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
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e57373',
    letterSpacing: 1,
  },
  addBtn: { padding: 4 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 8,
    color: '#222',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1.2,
    borderColor: '#e57373',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 24,
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
});

export default Customers; 