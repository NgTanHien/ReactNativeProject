import React from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const categories = [
  { name: 'Chinese', image: require('../assets/images/chinese.png') },
  { name: 'South Indian', image: require('../assets/images/south-indian.png') },
  { name: 'Beverages', image: require('../assets/images/beverages.png') },
  { name: 'North India', image: require('../assets/images/north-indian.png') },
];

const HomeScreen = ({ navigation }) => {
  const handleCategoryPress = (category) => {
    navigation.navigate('FoodList', { category });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with title, cart and logout icons */}
      

      {/* Grid of categories */}
      <View style={styles.grid}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleCategoryPress(item.name)}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.label}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  icons: {
    flexDirection: 'row',
  },
  iconSpacing: {
    marginRight: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    marginVertical: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});

export default HomeScreen;
