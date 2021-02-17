import React, { useState, useRef } from "react";
import { Ionicons, Fontisto } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todosCpy, setTodosCpy] = useState([]);
  const [value, setValue] = useState("");

  const [activeBtnAll, toggleActiveBtnAll] = useState(true);
  const [activeBtnActive, toggleActiveBtnActive] = useState(false);
  const [activeBtnDone, toggleActiveBtnDone] = useState(false);

  

  const handleAddTodo = () => {
    if (value.length > 0) {
      setTodos([...todos, { text: value, id: todos.length, checked: false }]);
      //,
      setTodosCpy([
        ...todosCpy,
        { text: value, id: todos.length, checked: false },
      ]);
      setValue("");
      //input.current.blur();
    }
  };

  const handleChecked = (id) => {
    setTodos(
      todosCpy.map((todo) => {
        if (todo.id === id) todo.checked = !todo.checked;
        return todo;
      })
    );
  };

  const allTodos = () => {
    console.log("allItems");

    if (activeBtnAll) toggleActiveBtnAll(false);
    else {
      toggleActiveBtnAll(true);
      toggleActiveBtnActive(false);
      toggleActiveBtnDone(false);
    }

    const allToDoItems = todosCpy.filter((item) => {
      if (item.checked === true || item.checked === false)
        //console.log(item);
        return item;
    });
    setTodos(allToDoItems);
    //console.log(todos);
  };

  const activeTodos = () => {
    console.log("activeItems");

    if (activeBtnActive) toggleActiveBtnActive(false);
    else {
      toggleActiveBtnActive(true);
      toggleActiveBtnAll(false);
      toggleActiveBtnDone(false);
    }

    //setTodos(todosCpy)
    const activeItems = todosCpy.filter((item) => {
      return item.checked === false;
      //console.log(item);
      //return item
    });
    setTodos(activeItems);
    //console.log(todos);
  };

  const doneTodos = () => {
    console.log("doneItems");

    if (activeBtnDone) toggleActiveBtnDone(false);
    else {
      toggleActiveBtnDone(true);
      toggleActiveBtnAll(false);
      toggleActiveBtnActive(false);
    }

    const doneItems = todosCpy.filter((item) => {
      return item.checked === true;
      //console.log(item);
      //return item
    });
    setTodos(doneItems);
    //console.log(todos);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={{ alignItems: "center" }}>
        <Text style={styles.headerText}>Baby Shark</Text>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: 20,
          }}
        >
          TODO
        </Text>
      </View>

      {/* TextInput&add btn */}
      <View style={styles.rowWrapper}>
        <TextInput
          value={value}
          onChangeText={(value) => setValue(value)}
          placeholder="Add a To Do"
          style={styles.textInput}
        />
        {/* onPress={onAddButtonPress} */}
        <TouchableOpacity style={styles.addBtn} onPress={() => handleAddTodo()}>
          <Ionicons name="md-add-sharp" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Filteration-Buttons */}
      <View style={styles.rowWrapper}>
        <TouchableOpacity
          onPress={() => allTodos()}
          style={activeBtnAll ? styles.activeButton : styles.inactiveButton}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => activeTodos()}
          style={activeBtnActive ? styles.activeButton : styles.inactiveButton}
        >
          <Text>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => doneTodos()}
          style={activeBtnDone ? styles.activeButton : styles.inactiveButton}
        >
          <Text>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Checklist */}
      <ScrollView style={{ width: "100%" }}>
        {todos.map((task) => (
          <View key={task.id} style={styles.checklistWrapper}>
            <Fontisto
              name={task.checked ? "checkbox-active" : "checkbox-passive"}
              color={task.checked ? "pink" : "white"}
              size={28}
              onPress={() => handleChecked(task.id)}
            />

            <View>
              <Text style={task.checked ? styles.doneItem : styles.todoItem}>
                {task.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#290135",
    paddingTop: 30,
  },
  headerText: {
    color: "pink",
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  rowWrapper: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
  },
  addBtn: {
    backgroundColor: "pink",
    padding: 15,
    borderRadius: 50,
    marginLeft: 10,
  },
  textInput: {
    borderColor: "black",
    backgroundColor: "#D3D3D3",
    width: 300,
    height: 50,
    fontSize: 15,
    borderRadius: 25,
    paddingLeft: 20,
  },
  activeButton: {
    backgroundColor: "pink",
    padding: 15,
    borderRadius: 40,
    width: 120,
    margin: 3,
    alignItems: "center",
  },
  inactiveButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 40,
    width: 120,
    margin: 3,
    alignItems: "center",
  },
  checklistWrapper: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 40,
  },
  todoItem: {
    color: "white",
    paddingLeft: 10,
    fontSize: 25,
  },
  doneItem: {
    color: "pink",
    paddingLeft: 10,
    textDecorationLine: "line-through",
    fontSize: 25,
  },
});
