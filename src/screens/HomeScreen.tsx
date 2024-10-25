import styled from "@emotion/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useCallback } from "react";
import { FlatList } from "react-native";
import MemoListItem from "../components/MemoListItem";
import { MainTabNavigatorParamList } from "../navigators/MainTabNavigator";
import { RootStackParamList } from "../navigators/RootStackNavigator";

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

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabNavigatorParamList, "Home">,
  StackScreenProps<RootStackParamList, "MainTab">
>;

const HomeScreen: FC<Props> = ({ navigation }) => {
  const onAdd = useCallback(() => {
    navigation.navigate("AddMemo");
  }, []);

  return (
    <Container>
      <FlatList
        ListHeaderComponent={
          <AddButton onPress={onAdd}>
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
