import styled from "@emotion/native";
import React, { FC } from "react";
import { ViewStyle } from "react-native";
import Button from "./Button";

type Props = {
  style?: ViewStyle;
  onPress?: () => void;
};

const StyledButton = styled(Button)`
  padding: 20px;
  background-color: #333;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

const LoginButton: FC<Props> = ({ style, onPress }) => {
  return (
    <StyledButton
      style={style}
      titleStyle={{
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
      }}
      onPress={onPress}
      title="로그인"
    />
  );
};

export default LoginButton;
