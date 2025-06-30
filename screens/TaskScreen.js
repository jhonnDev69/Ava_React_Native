import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function TaskScreen({ navigation, route }) {
  const [texto, setTexto] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Tarefas</Text>
      <View style={styles.inputsContainer}>
        <Text style={styles.title}>Insira o Título</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Insira Título..."
          value={texto}
          onChangeText={setTexto}
        />
        <Text style={styles.title}>Insira o Descrição</Text>
        <TextInput
          style={[styles.inputStyle, { height: 100 }]}
          placeholder="Insira Descrição..."
          value={desc}
          onChangeText={setDesc}
          multiline
          numberOfLines={4}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (texto.trim() && desc.trim()) {
              if (route.params?.addTask) {
                route.params.addTask({
                  title: texto,
                  description: desc,
                });
              }
              navigation.goBack();
              setTexto("");
              setDesc("");
            }
          }}
        >
          <Text style={styles.buttonText}>Adicionar Tarefa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginTop: 10 }]}
          onPress={() => navigation.goBack("Home")}
        >
          <Text style={styles.buttonText}>Voltar para Menu</Text>
        </TouchableOpacity>
      </View>
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
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  inputsContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  inputStyle: {
    width: 250,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
