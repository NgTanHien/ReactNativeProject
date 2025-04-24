import React, { useState } from 'react';
import { StyleSheet, View, Vibration } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';

const Calculator = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const buttonsLeft = [
    ['C', 'DEL', ''], // thêm ô trống để căn đều
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [0, '.']
  ];

  const buttonsRight = ['/', '*', '-', '+', '='];

  const calculator = () => {
    try {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
    } catch (error) {
      setCurrentNumber('Error');
    }
  };

  const handleInput = (buttonPress) => {
    Vibration.vibrate(35);
    switch (buttonPress) {
      case '+':
      case '-':
      case '*':
      case '/':
        setCurrentNumber(currentNumber + buttonPress);
        break;
      case 'DEL':
        setCurrentNumber(currentNumber.slice(0, -1));
        break;
      case 'C':
        setCurrentNumber('');
        setLastNumber('');
        break;
      case '=':
        setLastNumber(currentNumber + '=');
        calculator();
        break;
      default:
        setCurrentNumber(currentNumber + buttonPress);
        break;
    }
  };

  const bgMain = darkMode ? '#414853' : '#ededed';
  const bgResult = darkMode ? '#282f3b' : '#f5f5f5';
  const bgButtonLeft = darkMode ? '#303946' : '#ffffff';
  const textColor = darkMode ? '#fff' : '#000';
  const subTextColor = darkMode ? '#B5B7BB' : '#7c7c7c';

  return (
    <View style={[styles.container, { backgroundColor: bgMain }]}>
      <View style={[styles.resultContainer, { backgroundColor: bgResult }]}>
        <IconButton
          icon={darkMode ? 'weather-sunny' : 'moon-waxing-crescent'}
          size={30}
          onPress={() => setDarkMode(!darkMode)}
          iconColor={textColor}
        />
        <Text style={[styles.lastText, { color: subTextColor }]}>{lastNumber}</Text>
        <Text style={[styles.currentText, { color: textColor }]}>{currentNumber}</Text>
      </View>

      <View style={styles.buttonsWrapper}>
        <View style={[styles.leftPanel, { backgroundColor: bgButtonLeft }]}>
          {buttonsLeft.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((btn, i) =>
                btn === '' ? (
                  <View key={i} style={{ flex: 0, margin: 2 }} />
                ) : (
                  <Button
                    key={btn}
                    mode="contained"
                    style={styles.button}
                    onPress={() => handleInput(btn)}
                    labelStyle={styles.buttonLabel}
                    buttonColor={btn === 'C' || btn === 'DEL' ? '#FF6A6A' : '#B0B0B0'}
                  >
                    {btn}
                  </Button>
                )
              )}
            </View>
          ))}
        </View>

        <View style={styles.rightPanel}>
          {buttonsRight.map((btn, index) => (
            <View key={index} style={styles.rightRow}>
              <Button
                mode="contained"
                onPress={() => handleInput(btn)}
                style={styles.button}
                labelStyle={[styles.buttonLabel, { color: '#fff' }]}
                buttonColor={btn === '=' ? '#6DBE45' : '#00B9D6'}
              >
                {btn}
              </Button>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    padding: 20,
  },
  buttonsWrapper: {
    flex: 2,
    flexDirection: 'row',
  },
  leftPanel: {
    flex: 3,
    padding: 5,
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#00B9D6',
    padding: 5,
    justifyContent: 'space-around',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
  },
  rightRow: {
    flex: 1,
    marginVertical: 5,
  },
  button: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: 95,
  },
  buttonLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lastText: {
    fontSize: 18,
  },
  currentText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default Calculator;
