import styled from "@emotion/native";
import React, { FC } from "react";
import { ViewStyle } from "react-native";
import CommonText from "./CommonText";

type Props = {
  style?: ViewStyle;
  onPress?: () => void;
};

const Container = styled.Pressable`
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
`;

const LoginButton: FC<Props> = ({ style, onPress }) => {
  return (
    <Container style={style} onPress={onPress}>
      <CommonText>LoginButton</CommonText>
    </Container>
  );
};

export default LoginButton;
