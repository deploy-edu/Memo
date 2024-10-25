import styled from "@emotion/native";
import React, { FC } from "react";
import CommonText from "../components/CommonText";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SignUpScreen: FC = () => {
  return (
    <Container>
      <CommonText>SignUpScreen</CommonText>
    </Container>
  );
};

export default SignUpScreen;
