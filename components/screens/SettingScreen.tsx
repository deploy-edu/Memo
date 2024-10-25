import styled from "@emotion/native";
import React, { FC } from "react";
import CommonText from "../components/CommonText";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SettingScreen: FC = () => {
  return (
    <Container>
      <CommonText>SettingScreen</CommonText>
    </Container>
  );
};

export default SettingScreen;
