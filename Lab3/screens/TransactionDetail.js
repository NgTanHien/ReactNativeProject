import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, SafeAreaView } from "react-native";
import { Text, Button } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

const TransactionDetail = ({ navigation, route }) => {
  const { transaction } = route.params;
  const [detail, setDetail] = useState(transaction);

  useEffect(() => {
    if (!transaction?.id) return;
  
    const unsubscribe = firestore()
      .collection("TRANSACTIONS") // Gọi đúng như hàm
      .doc(transaction.id) // Gọi đúng như hàm
      .onSnapshot(doc => {
        if (doc.exists) {
          setDetail({ id: doc.id, ...doc.data() });
        } else {
          // Đảm bảo Alert được gọi sau khi UI đã cập nhật
          setTimeout(() => {
            Alert.alert("Warning", "This transaction no longer exists.");
            navigation.goBack();
          }, 0);
        }
      });
  
    return () => unsubscribe();
  }, [transaction?.id]);
  
  

  const handleDelete = () => {
    Alert.alert("Warning", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
            try {
              await firestore().collection("TRANSACTIONS").doc(detail.id).delete();
              setTimeout(() => {
                navigation.goBack();
              }, 200); // chờ 200ms để tránh crash Alert
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          }
          
      },
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.card}>
        <Text style={styles.label}><Text style={styles.labelBold}>Khách hàng: </Text>{detail.customerName}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Dịch vụ: </Text>{detail.service}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Số điện thoại: </Text>{detail.phone || '---'}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Ngày giờ hẹn: </Text>{detail.date || '---'}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Ghi chú: </Text>{detail.note || '---'}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Trạng thái: </Text>{detail.status || '---'}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Ngày tạo: </Text>{detail.createdAt?.toDate ? detail.createdAt.toDate().toLocaleString() : '---'}</Text>
        <Text style={styles.label}><Text style={styles.labelBold}>Cập nhật: </Text>{detail.update?.toDate ? detail.update.toDate().toLocaleString() : '---'}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate("EditTransaction", { transaction: detail })}>
            <Text style={styles.editBtnText}>Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteBtnText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    margin: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 14,
  },
  labelBold: {
    fontWeight: 'bold',
    color: '#e57373',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
  },
  editBtn: {
    backgroundColor: '#e57373',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  editBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteBtn: {
    backgroundColor: '#f3bcbc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  deleteBtnText: {
    color: '#e57373',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TransactionDetail;