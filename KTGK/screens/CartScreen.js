import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
  const { cartItems, incrementItem, decrementItem, clearCart } = useCart();

  const itemsTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const offerDiscount = -18;
  const taxRate = 0.08;
  const taxes = itemsTotal * taxRate;
  const deliveryCharges = 30;
  const totalPay = itemsTotal + offerDiscount + taxes + deliveryCharges;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => decrementItem(item.id)} style={styles.controlBtn}>
          <Text style={styles.controlText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => incrementItem(item.id)} style={styles.controlBtn}>
          <Text style={styles.controlText}>+</Text>
        </TouchableOpacity>
        <Text style={styles.price}>{(item.price * item.quantity).toLocaleString()} VND</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>

      {cartItems.length === 0 ? (
        <Text>Chưa có món nào trong giỏ hàng.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            style={styles.list}
          />

          <View style={styles.billContainer}>
            <Text style={styles.billTitle}>Hóa đơn</Text>
            <View style={styles.billRow}>
              <Text>Tổng tiền món</Text>
              <Text>{itemsTotal.toLocaleString()} VND</Text>
            </View>
            <View style={styles.billRow}>
              <Text>Giảm giá</Text>
              <Text>{offerDiscount.toLocaleString()} VND</Text>
            </View>
            <View style={styles.billRow}>
              <Text>Thuế (8%)</Text>
              <Text>{taxes.toFixed(0).toLocaleString()} VND</Text>
            </View>
            <View style={styles.billRow}>
              <Text>Phí giao hàng</Text>
              <Text>{deliveryCharges.toLocaleString()} VND</Text>
            </View>
            <View style={[styles.billRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Tổng thanh toán</Text>
              <Text style={styles.totalLabel}>{totalPay.toFixed(0).toLocaleString()} VND</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.totalAmount}>{totalPay.toFixed(0).toLocaleString()} VND</Text>
            <TouchableOpacity
              style={styles.payButton}
              onPress={() => {
                clearCart(); // Xóa giỏ hàng khi thanh toán
                navigation.navigate('Success'); // Chuyển sang màn hình Success
              }}
            >
              <Text style={styles.payButtonText}>Tiến hành thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  list: { marginBottom: 16 },
  item: { padding: 12, backgroundColor: '#f9f9f9', borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  controlBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlText: { fontSize: 18, fontWeight: 'bold' },
  quantity: { marginHorizontal: 8, fontSize: 16 },
  price: { fontSize: 16, fontWeight: '600' },
  billContainer: { backgroundColor: '#f2f2f2', borderRadius: 10, padding: 12, marginBottom: 16 },
  billTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  totalRow: { borderTopWidth: 1, borderTopColor: '#ccc', paddingTop: 8, marginTop: 8 },
  totalLabel: { fontSize: 16, fontWeight: 'bold' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
  },
  totalAmount: { color: 'red', fontSize: 18, fontWeight: 'bold' },
  payButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  payButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default CartScreen;
