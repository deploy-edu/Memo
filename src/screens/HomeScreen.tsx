import styled from "@emotion/native";
import React, { FC } from "react";
import CommonText from "../components/CommonText";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const HomeScreen: FC = () => {
  return (
    <Container>
      <CommonText>HomeScreen</CommonText>
    </Container>
  );
};

export default HomeScreen;
