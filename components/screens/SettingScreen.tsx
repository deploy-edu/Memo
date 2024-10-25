import styled from "@emotion/native";
import React, { FC } from "react";
import SettingListItem from "../components/SettingListItem";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 10px;
  gap: 10px;
`;

const SettingScreen: FC = () => {
  return (
    <Container>
      <SettingListItem title="로그아웃" />
    </Container>
  );
};

export default SettingScreen;
