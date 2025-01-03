import RootStackNavigator from "@/navigators/RootStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";

export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
