import styled from "@emotion/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useCallback } from "react";
import Input from "../components/Input";
import LoginButton from "../components/LoginButton";
import SignUpButton from "../components/SignUpButton";
import { RootStackParamList } from "../navigators/RootStackNavigator";
import { useAuthStore } from "../stores/useAuthStore";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  gap: 20px;
`;

type Props = StackScreenProps<RootStackParamList, "Login">;

const LoginScreen: FC<Props> = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignUp = useCallback(() => {
    navigation.navigate("SignUp");
  }, []);

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
      <SignUpButton onPress={onSignUp} />
    </Container>
  );
};

export default LoginScreen;
