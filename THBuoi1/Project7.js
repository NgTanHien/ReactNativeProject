import React, { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { Button, TextInput, Card, Provider, DefaultTheme } from "react-native-paper";  

export default () => {
    const [name, setName] = useState(""); 

    return (
        <Provider theme={DefaultTheme}>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.label}>What is your name ?</Text>  
                        <TextInput 
                            style={styles.input}
                            placeholder="John Doe"  
                            placeholderTextColor='rgba(0, 0, 0, 0.5)'  
                            onChangeText={(text) => setName(text)}  
                            value={name}  
                            mode="outlined"  
                        />
                        <Button
                            mode="contained" 
                            style={styles.button}
                            labelStyle={styles.buttonLabel}  
                            onPress={() => {
                                Alert.alert(`Hello, ${name}!`);  
                                setName("");  
                            }}
                        > 
                            Say Hello
                        </Button>  
                    </Card.Content>
                </Card>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },

    input: {
        marginBottom: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',  
        padding: 10,
        borderRadius: 5,
    },

    button: {
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: 'silver',  
        paddingVertical: 12,
        paddingHorizontal: 30,
    },

    buttonLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',  
    },

    card: {
        width: '100%',
        padding: 20,
        elevation: 5,
        borderRadius: 10,
    }
});
