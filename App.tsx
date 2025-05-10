import React from "react";
import firestore from "@react-native-firebase/firestore";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { Appbar, Button, TextInput, useTheme } from "react-native-paper";
import Todo from "./TodosApp/todo";
import { SafeAreaProvider } from "react-native-safe-area-context";

type TodoItem = {
  id: string;
  title: string;
  complete: boolean;
};

function App() {
  const [todo, setTodo] = React.useState<string>("");
  const ref = firestore().collection("todos");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [todos, setTodos] = React.useState<TodoItem[]>([]);
  const theme = useTheme();

  async function addTodo() {
    if (todo.trim().length === 0) return;
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo("");
  }

  React.useEffect(() => {
    const unsubscribe = ref.onSnapshot((querySnapshot) => {
      const list: TodoItem[] = [];
      querySnapshot.forEach((doc) => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });
      setTodos(list);
      if (loading) {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: 16 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Appbar.Header elevated>
          <Appbar.Content title="TODOs List" />
        </Appbar.Header>

        <FlatList
          contentContainerStyle={styles.todoList}
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Todo {...item} />}
        />

        <View style={styles.inputContainer}>
          <TextInput
            label="New Todo"
            value={todo}
            mode="outlined"
            onChangeText={(text) => setTodo(text)}
            style={styles.textInput}
          />
          <Button mode="contained" onPress={addTodo}>
            Add TODO
          </Button>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  todoList: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 80,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  textInput: {
    marginBottom: 10,
  },
});

export default App;
