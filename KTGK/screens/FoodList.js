import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';


const foodData = [
  {
    id: '1',
    category: 'Chinese',
    name: 'Fried Rice',
    price: 50.000,
    image: require('../assets/images/ice-creams.png'),
  },
  {
    id: '2',
    category: 'Chinese',
    name: 'Dumplings',
    price: 60.000,
    image: require('../assets/images/pizza.png'), 
  },
  {
    id: '3',
    category: 'South Indian',
    name: 'Dosa',
    price: 40.000,
    image: require('../assets/images/desserts.png'), 
  },
];

const FoodList = ({ navigation, route }) => {
  const { category } = route.params;

  // Lọc món ăn theo danh mục
  const filteredFood = foodData.filter(food => food.category === category);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('FoodDetail', { food: item })}
    >
      <Image source={item.image} style={styles.image} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price} VND</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách món: {category}</Text>
      <FlatList
        data={filteredFood}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  name: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 14, color: '#d32f2f' },
});

export default FoodList;
