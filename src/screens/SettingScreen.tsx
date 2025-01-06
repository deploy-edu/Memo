import { MainTabNavigatorParamList } from "@/navigators/MainTabNavigator";
import { RootStackParamList } from "@/navigators/RootStackNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useCallback } from "react";
import Header from "../components/Header";
import RootLayoutContainer from "../components/RootLayoutContainer";
import SettingListItem from "../components/SettingListItem";
import { supabase } from "../libs/supabase";
import { useAuthStore } from "../stores/useAuthStore";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabNavigatorParamList, "Setting">,
  StackScreenProps<RootStackParamList>
>;

const SettingScreen: FC<Props> = ({ navigation }) => {
  const onLogout = useCallback(async () => {
    await supabase.auth.signOut();
    useAuthStore.getState().logout();
  }, []);

  const onOpenLicense = useCallback(() => {
    navigation.navigate("Licenses");
  }, []);

  const onOpenAppVersion = useCallback(() => {
    navigation.navigate("AppVersion");
  }, []);

  return (
    <RootLayoutContainer containerStyle={{ gap: 10 }}>
      <Header title="설정" />
      <SettingListItem title="로그아웃" onPress={onLogout} />
      <SettingListItem title="앱버전" onPress={onOpenAppVersion} />
      <SettingListItem title="오픈소스 라이센스" onPress={onOpenLicense} />
    </RootLayoutContainer>
  );
};

export default SettingScreen;
