import styled from "@emotion/native";
import React, { FC, useCallback } from "react";
import SettingListItem from "../components/SettingListItem";
import { supabase } from "../libs/supabase";
import { useAuthStore } from "../stores/useAuthStore";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 10px;
  gap: 10px;
`;

const SettingScreen: FC = () => {
  const onLogout = useCallback(async () => {
    await supabase.auth.signOut();
    useAuthStore.getState().logout();
  }, []);

  return (
    <Container>
      <SettingListItem title="로그아웃" onPress={onLogout} />
    </Container>
  );
};

export default SettingScreen;
