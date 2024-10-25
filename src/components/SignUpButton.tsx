import styled from "@emotion/native";
import React, { FC } from "react";
import { ViewStyle } from "react-native";
import CommonText from "./CommonText";

type Props = {
  style?: ViewStyle;
  onPress: () => void;
};

const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  align-items: center;
  border: 1px solid skyblue;
`;

const Title = styled(CommonText)`
  color: skyblue;
  font-size: 16px;
  font-weight: bold;
`;

const SignUpButton: FC<Props> = ({ onPress }) => {
  return (
    <Container onPress={onPress}>
      <Title>회원가입</Title>
    </Container>
  );
};

export default SignUpButton;
