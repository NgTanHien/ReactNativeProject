// Button.tsx
import React from 'react';
import { TouchableOpacity, Text, View, Alert } from 'react-native';


const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: '#ff673c',
        alignSelf: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 6,
        ...props.buttonStyle,
      }}
    >
      <Text style={{ color: '#fff' }}>{props.text}</Text>
    </TouchableOpacity>
  );
};


export default () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button text="Say hello" onPress={() => Alert.alert('Hello!')} />
      <Button
        text="Say goodbye"
        onPress={() => Alert.alert('Goodbye!')}
        buttonStyle={{ backgroundColor: '#4dc2c2' }}
      />
    </View>
  );
};
