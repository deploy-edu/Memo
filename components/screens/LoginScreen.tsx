import styled from "@emotion/native";
import React, { FC } from "react";
import CommonText from "../components/CommonText";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoginScreen: FC = () => {
  return (
    <Container>
      <CommonText>LoginScreen</CommonText>
    </Container>
  );
};

export default LoginScreen;
