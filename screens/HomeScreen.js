import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

const initialData = [];

export default function HomeScreen({ navigation, route }) {
  const [data, setData] = useState(initialData);
  const [finished, setFinished] = useState([]);

  useEffect(() => {
    if (route.params?.newTask) {
      setData((prev) => [
        ...prev,
        {
          ...route.params.newTask,
          id: (prev.length + 1).toString(),
          done: false,
        },
      ]);
      navigation.setParams({ newTask: undefined });
    }
  }, [route.params?.newTask]);

  const toggleDone = (id) => {
    setData((prev) => {
      const task = prev.find((item) => item.id === id);
      if (task) {
        const updated = prev.filter((item) => item.id !== id);
        setFinished((f) => [...f, { ...task, done: true }]);
        return updated;
      }
      return prev;
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.checkBox}
        onPress={() => toggleDone(item.id)}
      >
        <Text style={styles.checkText}>{item.done ? "✔" : "X"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => navigation.navigate("Details", { item })}
      >
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Inicial</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("AddTask", {
            addTask: (task) => {
              setData((prev) => [
                ...prev,
                {
                  ...task,
                  id: (prev.length + 1).toString(),
                  done: false,
                },
              ]);
            },
          })
        }
      >
        <Text style={styles.buttonText}>Criar Tarefas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("TaskCompleted", {
            finished,
            setFinished,
            setData,
          })
        }
      >
        <Text style={styles.buttonText}>Tarefas Concluídas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setData([]);
          setFinished([]);
        }}
      >
        <Text style={styles.buttonText}>Remover Tarefas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  checkBox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  checkText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
