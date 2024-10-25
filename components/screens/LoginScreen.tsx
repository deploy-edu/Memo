import styled from "@emotion/native";
import React, { FC } from "react";
import Input from "../components/Input";
import LoginButton from "../components/LoginButton";
import { useAuthStore } from "../stores/useAuthStore";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  gap: 20px;
`;

const LoginScreen: FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Container>
      <Input
        placeholder="아이디"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <Input
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <LoginButton
        onPress={() => {
          useAuthStore.getState().login();
        }}
      />
    </Container>
  );
};

export default LoginScreen;
