import styled from "@emotion/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { FC } from "react";
import CommonText from "../components/CommonText";
import Input from "../components/Input";
import LoginButton from "../components/LoginButton";
import { RootStackParamList } from "../navigators/RootStackNavigator";
import { useAuthStore } from "../stores/useAuthStore";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  gap: 20px;
`;

const SignUpButton = styled.TouchableOpacity`
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  align-items: center;
  border: 1px solid skyblue;
`;

const SignUpButtonText = styled(CommonText)`
  color: skyblue;
  font-size: 16px;
  font-weight: bold;
`;

type Props = StackScreenProps<RootStackParamList, "Login">;

const LoginScreen: FC<Props> = ({ navigation }) => {
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
      <SignUpButton>
        <SignUpButtonText>회원가입</SignUpButtonText>
      </SignUpButton>
    </Container>
  );
};

export default LoginScreen;
