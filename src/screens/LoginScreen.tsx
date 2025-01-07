import styled from "@emotion/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useCallback } from "react";
import { Alert } from "react-native";
import Input from "../components/Input";
import LoginButton from "../components/LoginButton";
import SignUpButton from "../components/SignUpButton";
import { supabase } from "../libs/supabase";
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

  const onLogin = useCallback(async () => {
    const {
      error,
      data: { session },
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }

    if (!session) {
      Alert.alert("세션 정보가 없습니다.");
      return;
    }

    useAuthStore.getState().login(session);
  }, [email, password]);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  return (
    <Container>
      <Input placeholder="아이디" value={email} onChangeText={onChangeEmail} />
      <Input
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={onChangePassword}
      />
      <LoginButton onPress={onLogin} />
      <SignUpButton onPress={onSignUp} />
    </Container>
  );
};

export default LoginScreen;
