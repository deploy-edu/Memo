import styled from "@emotion/native";
import React, { FC } from "react";
import { ViewStyle } from "react-native";
import CommonText from "./CommonText";

type Props = {
  style?: ViewStyle;
  title?: string;
  onPress?: () => void;
};

const Container = styled.Pressable`
  padding: 20px;
  background-color: #333;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

const Title = styled(CommonText)`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

const Button: FC<Props> = ({ style, title, onPress }) => {
  return (
    <Container style={style} onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Button;
