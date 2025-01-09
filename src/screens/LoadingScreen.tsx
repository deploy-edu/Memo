import CommonText from "@/components/CommonText";
import styled from "@emotion/native";
import React, { FC } from "react";
import { ViewStyle } from "react-native";

type Props = {
  style?: ViewStyle;
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const LoadingScreen: FC<Props> = ({ style }) => {
  return (
    <Container style={style}>
      <CommonText>Loading...</CommonText>
    </Container>
  );
};

export default LoadingScreen;
