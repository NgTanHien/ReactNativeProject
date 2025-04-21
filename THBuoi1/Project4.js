import React, { useState } from "react";
import { StyleSheet, View } from "react-native";  
import { Text, Button } from "react-native-paper";

export default () => {
  const [pressCount, setPressCount] = useState(0);

  return (
    <View style={styles.view}>  
      <Text>You've pressed the button: {pressCount} time(s)</Text>
      <Button
        mode="contained"
        onPress={() => setPressCount(pressCount + 1)}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Pressed {pressCount} time(s)
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});
