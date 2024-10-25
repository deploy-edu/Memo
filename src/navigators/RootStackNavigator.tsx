import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { AppState } from "react-native";
import { supabase } from "../libs/supabase";
import AddMemoScreen from "../screens/AddMemoScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { useAuthStore } from "../stores/useAuthStore";
import MainTabNavigator from "./MainTabNavigator";

export type RootStackParamList = {
  MainTab: undefined;
  Login: undefined;
  SignUp: undefined;
  AddMemo: undefined;
};

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        useAuthStore.getState().logout();
        return;
      }

      useAuthStore.getState().login(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        useAuthStore.getState().logout();
        return;
      }

      useAuthStore.getState().login(session);
    });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoggedIn ? (
        <Stack.Screen
          name="MainTab"
          component={MainTabNavigator}
          options={{
            headerTitle: "홈",
          }}
        />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="AddMemo"
        component={AddMemoScreen}
        options={{
          headerShown: true,
          headerTitle: "메모 추가",
        }}
      />
    </Stack.Navigator>
  );
}
