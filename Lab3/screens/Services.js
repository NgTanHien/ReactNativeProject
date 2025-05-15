import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const Services = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState([]);
  const isFocused = useIsFocused();
  const route = useRoute();
  const [controller] = useMyContextController();
  const { userLogin } = controller;
  const isCustomer = userLogin?.role === 'customer';

  useEffect(() => {
    const unsubscribe = firestore().collection('SERVICES').onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(data);
    });
    return () => unsubscribe();
  }, [isFocused]);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Hàm cập nhật dịch vụ trong danh sách
  const handleUpdateService = (updatedService) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
  };
  // Hàm xóa dịch vụ khỏi danh sách
  const handleDeleteService = async (id) => {
    try {
      await firestore().collection('SERVICES').doc(id).delete();
      // Không cần setServices, useEffect sẽ tự cập nhật lại danh sách
    } catch (error) {
      alert('Lỗi khi xóa dịch vụ: ' + (error.message || error));
    }
  };

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => {
        if (isCustomer) {
          navigation.navigate('BookAppointment', { service: item });
        } else if (navigation && navigation.navigate) {
          navigation.navigate('ServiceDetail', {
            service: item,
            onUpdate: handleUpdateService,
            onDelete: handleDeleteService,
          });
        }
      }}
    >
      <Text style={styles.serviceName} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
      <Text style={styles.servicePrice}>{parseInt(item.price).toLocaleString('vi-VN')} đ</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{userLogin?.fullName || userLogin?.name || 'Tài khoản'}</Text>
        <TouchableOpacity style={styles.profileBtn}>
          <Icon name="account-circle" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logolab3.png')} style={styles.logo} />
      </View>
      <View style={styles.titleRow}>
        <Text style={styles.listTitle}>Danh sách dịch vụ</Text>
        {!isCustomer && (
          <TouchableOpacity style={styles.addBtn} onPress={() => navigation && navigation.navigate ? navigation.navigate('AddNewService') : null}>
            <Icon name="plus-circle" size={28} color="#e57373" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={22} color="#bbb" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm dịch vụ..."
          placeholderTextColor="#bbb"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {filteredServices.length === 0 ? (
        <View style={{alignItems: 'center', marginTop: 32}}>
          <Text style={{color: '#aaa', fontSize: 16}}>Chưa có dịch vụ nào</Text>
    </View>
      ) : (
        <FlatList
          data={filteredServices}
          renderItem={renderServiceItem}
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e57373',
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  profileBtn: {
    padding: 4,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 4,
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 4,
  },
  listTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#e57373',
  },
  addBtn: {
    padding: 4,
  },
  searchContainer: {
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
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 8,
    color: '#222',
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1.2,
    borderColor: '#e57373',
  },
  serviceName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  servicePrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e57373',
    marginLeft: 8,
  },
});

export default Services;