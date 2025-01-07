import styled from "@emotion/native";
import React, { FC } from "react";
import { ViewStyle } from "react-native";
import Button from "./Button";

type Props = {
  style?: ViewStyle;
  onPress?: () => void;
};

const StyledButton = styled(Button)`
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  align-items: center;
  border: 1px solid skyblue;
  background-color: white;
`;

const SignUpButton: FC<Props> = ({ style, onPress }) => {
  return (
    <StyledButton
      style={style}
      titleStyle={{
        fontSize: 16,
        fontWeight: "bold",
        color: "skyblue",
      }}
      onPress={onPress}
      title="회원가입"
    />
  );
};

export default SignUpButton;
