import styled from "@emotion/native";
import Icon from "@expo/vector-icons/AntDesign";
import { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Input from "../components/Input";
import SignUpButton from "../components/SignUpButton";
import { RootStackParamList } from "../navigators/RootStackNavigator";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  gap: 20px;
`;

const IconContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 1px solid skyblue;
`;

const CloseButtton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 20px;
`;

type Props = StackScreenProps<RootStackParamList, "SignUp">;

const SignUpScreen: FC<Props> = ({ navigation }) => {
  const { top } = useSafeAreaInsets();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignUp = useCallback(() => {}, [email, password]);
  const onClose = useCallback(() => {
    navigation.goBack();
  }, []);
  return (
    <Container>
      <CloseButtton
        style={{
          top,
        }}
        onPress={onClose}
      >
        <Icon name="close" size={20} color="#000" />
      </CloseButtton>
      <IconContainer>
        <Icon name="user" size={50} color="skyblue" />
      </IconContainer>
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
      <SignUpButton onPress={onSignUp} />
    </Container>
  );
};

export default SignUpScreen;
