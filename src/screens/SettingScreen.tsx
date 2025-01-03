import React, { FC, useCallback } from "react";
import Header from "../components/Header";
import RootLayoutContainer from "../components/RootLayoutContainer";
import SettingListItem from "../components/SettingListItem";
import { supabase } from "../libs/supabase";
import { useAuthStore } from "../stores/useAuthStore";

const SettingScreen: FC = () => {
  const onLogout = useCallback(async () => {
    await supabase.auth.signOut();
    useAuthStore.getState().logout();
  }, []);

  return (
    <RootLayoutContainer containerStyle={{ gap: 10 }}>
      <Header title="설정" />
      <SettingListItem title="로그아웃" onPress={onLogout} />
      <SettingListItem title="앱버전" onPress={onLogout} />
      <SettingListItem title="오픈소스 라이센스" onPress={onLogout} />
    </RootLayoutContainer>
  );
};

export default SettingScreen;
