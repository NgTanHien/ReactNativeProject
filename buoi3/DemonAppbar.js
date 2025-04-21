import { Alert, StyleSheet, View } from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <DemoAppbar />
    </SafeAreaProvider>
  );
};

const DemoAppbar = () => {
  const goBack = () => Alert.alert("Go back");
  const search = () => Alert.alert("Search");

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Home" />
        <Appbar.Action icon={"magnify"} onPress={search} />
      </Appbar.Header>

      <Avatar.Icon icon={"home"} />
    </View>
  );
};

export default App;
