import styled from "@emotion/native";
import Icon from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from "@react-navigation/native";
import React, { FC, useCallback, useState } from "react";
import { Alert } from "react-native";
import Button from "../components/Button";
import CommonText from "../components/CommonText";
import Input from "../components/Input";
import { supabase } from "../libs/supabase";
import { useAuthStore } from "../stores/useAuthStore";

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const InnerContainer = styled.View`
  gap: 20px;
`;

const Title = styled(CommonText)`
  font-size: 24px;
  font-weight: bold;
`;

const Value = styled(CommonText)`
  font-size: 20px;
`;

const ItemContainer = styled.View`
  justify-content: space-between;
  gap: 10px;
`;

const StyledInput = styled(Input)`
  font-size: 20px;
  border-width: 1px;
`;

const IconContainer = styled.View`
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 1px solid skyblue;
`;

const ProfileScreen: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [birth, setBirth] = useState<Date | null>();
  const [username, setUsername] = useState<string>("");
  const session = useAuthStore((state) => state.session);

  const onSave = useCallback(async () => {
    try {
      if (!session?.user) throw new Error("No user on the session!");

      const { error } = await supabase.from("Profile").upsert({
        id: session.user.id,
        username,
        avatar_url: avatarUrl,
        birth,
      });

      if (error) {
        console.log(error);
        throw error;
      }

      Alert.alert("저장되었습니다.");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }, [avatarUrl, birth, session?.user, username]);

  useFocusEffect(
    useCallback(() => {
      async function init() {
        try {
          setLoading(true);
          if (!session?.user) throw new Error("No user on the session!");

          setEmail(session.user.email!);

          const { data, error, status } = await supabase
            .from("Profile")
            .select(`id, username, avatar_url, birth`)
            .eq("id", session.user.id)
            .single();

          if (error && status !== 406) {
            throw error;
          }

          if (data) {
            setUsername(data.username);
            setAvatarUrl(data.avatar_url);
            setBirth(data.birth);
          }
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert(error.message);
          }
        } finally {
          setLoading(false);
        }
      }

      init();
    }, [])
  );

  console.log("birth", birth);

  return (
    <Container>
      <InnerContainer>
        <IconContainer>
          <Icon name="user" size={50} color="skyblue" />
        </IconContainer>
        <ItemContainer>
          <Title>email</Title>
          <Value>{email}</Value>
        </ItemContainer>
        <ItemContainer>
          <Title>이름</Title>
          <StyledInput
            placeholder="이름을 입력하세요.."
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
        </ItemContainer>
        <ItemContainer>
          <Title>생년월일</Title>
          <DateTimePicker
            style={{
              borderWidth: 1,
              borderRadius: 5,
            }}
            display="spinner"
            mode="date"
            value={birth ? new Date(birth) : new Date()}
            onChange={(event, date) => {
              if (event.type === "set") {
                setBirth(date);
              }
            }}
          />
        </ItemContainer>
        <Button title="저장" onPress={onSave} />
      </InnerContainer>
    </Container>
  );
};

export default ProfileScreen;
