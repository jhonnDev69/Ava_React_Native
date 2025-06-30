import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import TaskScreen from "./screens/TaskScreen";
import DetailsCard from "./screens/DetailsCard";
import TaskFinished from "./screens/TaskFinished";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Tela Principal",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "#fff",
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="AddTask"
          component={TaskScreen}
          options={{
            title: "Tela de Tarefas",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "#fff",
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsCard}
          options={{
            title: "Detalhes",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "#fff",
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="TaskCompleted"
          component={TaskFinished}
          options={{
            title: "Tarefas Concluídas",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "#fff",
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
