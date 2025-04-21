import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const App = () => {
  return (
    <View style={{
        width: 100,
        height: 100,
        backgroundColor:'aqua',
        alignItems:'center',
        justifyContent:'center',
    }}>
      <Text style={{color:"#fff"}}>Hello World</Text>
    </View>
  );
};


export default App;
