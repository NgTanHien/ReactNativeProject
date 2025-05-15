import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../context/CartContext'; 

const FoodDetail = ({ route, navigation }) => {
  const { food } = route.params;
  const { addToCart } = useCart(); 

  const handleAddToCart = () => {
    addToCart(food); 
    Alert.alert('Thông báo', `${food.name} đã được thêm vào giỏ hàng!`, [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Customer'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={food.image} style={styles.image} />
      <Text style={styles.name}>{food.name}</Text>
      <Text style={styles.price}>{food.price} VND</Text>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  image: { width: 200, height: 200, borderRadius: 16, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 20, color: '#d32f2f', marginBottom: 30 },
  button: {
    backgroundColor: '#d32f2f', paddingVertical: 12, paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default FoodDetail;
