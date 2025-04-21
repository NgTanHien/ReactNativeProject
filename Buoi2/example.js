import React from "react";
import { SafeAreaView, View, FlatList, Text, StyleSheet } from "react-native";

const DATA = [
  {
    id: "1",
    userName: "Name",
  },
  {
    id: "2",
    userName: "Profile",
  },
];

const App = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.userName}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
  },
});

export default App;
