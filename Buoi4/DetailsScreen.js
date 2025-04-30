import React from "react";
import { StyleSheet, View, Text } from "react-native";  
import { Button } from "react-native-paper";

const DetailsScreen = () => {
    return(
        <View style = {styles.container}>
            <Text>Details Screen</Text>
        </View>
    )
}
export default DetailsScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    },
})