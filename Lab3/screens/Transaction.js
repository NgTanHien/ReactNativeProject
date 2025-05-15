import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const Transaction = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [controller] = useMyContextController();
  const { userLogin } = controller;
  const isAdmin = userLogin?.role === 'admin';

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let query = firestore().collection('TRANSACTIONS');
        const snapshot = await query.get();
        let data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Lọc dữ liệu ở phía client nếu không phải admin
        if (!isAdmin && userLogin?.email) {
          data = data.filter(item => item.customerId === userLogin.email);
        }

        setTransactions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [isAdmin, userLogin?.email]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FFA000';
      case 'confirmed':
        return '#2196F3';
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
        return '#f44336';
      default:
        return '#666';
    }
  };

  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.transactionItem}
      onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
    >
      <View style={styles.transactionInfo}>
        <Text style={styles.serviceName}>{item.customerName}</Text>
        <Text style={styles.serviceDesc}>Service: {item.service}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{userLogin?.fullName || userLogin?.name || 'Tài khoản'}</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddNewTransaction')}>
          <Icon name="add-circle" size={28} color="#e57373" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={{alignItems: 'center', marginTop: 32}}>
          <Text style={{color: '#aaa', fontSize: 16}}>Đang tải...</Text>
        </View>
      ) : transactions.length === 0 ? (
        <View style={{alignItems: 'center', marginTop: 32}}>
          <Text style={{color: '#aaa', fontSize: 16}}>Chưa có cuộc hẹn nào</Text>
  </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransactionItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
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
  listContainer: {
    padding: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  transactionInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addBtn: {
    padding: 4,
  },
});

export default Transaction; 