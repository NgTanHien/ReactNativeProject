import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

const TransactionDetail = ({ navigation, route }) => {
  const { transaction } = route.params;
  const [detail, setDetail] = useState(transaction);

  // Format Firestore timestamp
  const formatDate = (timestamp) => {
    return timestamp?.toDate ? timestamp.toDate().toLocaleString() : '---';
  };

  // Render reusable label/value pair
  const renderDetailRow = (label, value) => (
    <Text style={styles.label}>
      <Text style={styles.labelBold}>{label}: </Text>
      {value || '---'}
    </Text>
  );

  useEffect(() => {
    if (!transaction?.id) return;

    const unsubscribe = firestore()
      .collection("TRANSACTIONS")
      .doc(transaction.id)
      .onSnapshot(doc => {
        if (doc.exists) {
          setDetail({ id: doc.id, ...doc.data() });
        } else {
          setTimeout(() => {
            Alert.alert("Warning", "This transaction no longer exists.");
            navigation.goBack();
          }, 0);
        }
      });

    return () => unsubscribe();
  }, [transaction?.id]);

  const handleDelete = () => {
    Alert.alert("Warning", "Are you sure you want to delete this transaction?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await firestore().collection("TRANSACTIONS").doc(detail.id).delete();
            setTimeout(() => {
              navigation.goBack();
            }, 200);
          } catch (error) {
            Alert.alert("Error", error.message);
          }
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          {renderDetailRow("Khách hàng", detail.customerName)}
          {renderDetailRow("Dịch vụ", detail.service)}
          {renderDetailRow("Số điện thoại", detail.phone)}
          {renderDetailRow("Ngày giờ hẹn", detail.date)}
          {renderDetailRow("Ghi chú", detail.note)}
          {renderDetailRow("Trạng thái", detail.status)}
          {renderDetailRow("Ngày tạo", formatDate(detail.createdAt))}
          {renderDetailRow("Cập nhật", formatDate(detail.update))}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => navigation.navigate("EditTransaction", { transaction: detail })}
            >
              <Text style={styles.editBtnText}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={handleDelete}
            >
              <Text style={styles.deleteBtnText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
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
