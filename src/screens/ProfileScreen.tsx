import styled from "@emotion/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { FC, useState } from "react";
import CommonText from "../components/CommonText";
import Input from "../components/Input";
import { useAuthStore } from "../stores/useAuthStore";

const Container = styled.View`
  flex: 1;
  padding: 20px;
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

const ProfileScreen: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [birth, setBirth] = useState<Date | null>();
  const [username, setUsername] = useState<string>("");
  const session = useAuthStore((state) => state.session);

  return (
    <Container>
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
          value={birth || new Date()}
          onChange={(event, date) => {
            if (event.type === "set") {
              setBirth(date);
            }
          }}
        />
      </ItemContainer>
    </Container>
  );
};

export default ProfileScreen;
