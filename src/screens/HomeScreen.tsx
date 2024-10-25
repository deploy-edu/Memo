import styled from "@emotion/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { FC } from "react";
import { FlatList } from "react-native";
import MemoListItem from "../components/MemoListItem";

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

const AddButton = styled.Pressable`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-bottom: 20px;
`;

const HomeScreen: FC = () => {
  return (
    <Container>
      <FlatList
        ListHeaderComponent={
          <AddButton>
            <Icon name="pencil" size={30} />
          </AddButton>
        }
        data={[
          { key: "1", title: "메모1" },
          { key: "2", title: "메모2" },
        ]}
        contentContainerStyle={{
          gap: 10,
        }}
        renderItem={({ item }) => <MemoListItem title={item.title} />}
      />
    </Container>
  );
};

export default HomeScreen;
