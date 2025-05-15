import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ServiceDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { service, onUpdate, onDelete } = route.params || {};

  // Giả lập dữ liệu creator, time, final update
  const creator = service.creator || 'Unknown';
  const time = service.time || '';
  const finalUpdate = service.finalUpdate || '';
  const [showDelete, setShowDelete] = useState(false);

  // Hàm xử lý cập nhật dịch vụ
  const handleEdit = () => {
    navigation.navigate('EditService', {
      service,
      onUpdate: (updatedService) => {
        if (onUpdate) onUpdate(updatedService);
        navigation.goBack();
      },
    });
  };

  // Hàm xử lý xóa dịch vụ
  const handleDelete = () => {
    setShowDelete(true);
  };

  const confirmDelete = () => {
    setShowDelete(false);
    if (onDelete) onDelete(service.id);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service Detail</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>
          <Text style={styles.bold}>Service name: </Text>{service.name}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Price: </Text>{parseInt(service.price).toLocaleString('vi-VN')} đ
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Creator: </Text>{creator}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Time: </Text>{time}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Final update: </Text>{finalUpdate}
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteBtnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Modal xác nhận xóa */}
      <Modal
        visible={showDelete}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDelete(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Xác nhận xóa</Text>
            <Text style={styles.modalMessage}>
              Bạn có chắc chắn muốn xóa dịch vụ này?{"\n"}Hành động này không thể hoàn tác!
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.deleteBtn} onPress={confirmDelete}>
                <Text style={styles.deleteBtnText}>XÓA</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowDelete(false)}>
                <Text style={styles.cancelBtnText}>HỦY</Text>
              </TouchableOpacity>
            </View>
          </View>
  </View>
      </Modal>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  content: {
    marginTop: 32,
    marginHorizontal: 24,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  bold: {
    fontWeight: 'bold',
    color: '#e57373',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editBtn: {
    backgroundColor: '#e57373',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  editBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  deleteBtn: {
    backgroundColor: '#e57373',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  deleteBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    width: 320,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e57373',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelBtn: {
    backgroundColor: '#f3bcbc',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  cancelBtnText: {
    color: '#e57373',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ServiceDetail; 