import { createStackNavigator } from "@react-navigation/stack";
import MainTabNavigator from "./MainTabNavigator";

type RootStackParamList = {
  MainTab: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTab" component={MainTabNavigator} />
    </Stack.Navigator>
  );
}
