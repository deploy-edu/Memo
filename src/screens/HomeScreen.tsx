import styled from "@emotion/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import MemoListItem from "../components/MemoListItem";
import { MainTabNavigatorParamList } from "../navigators/MainTabNavigator";
import { RootStackParamList } from "../navigators/RootStackNavigator";
import { Memo, useMemoStore } from "../stores/useMemoStore";

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
  const data = useMemoStore((state) => state.data);
  const isLoading = useMemoStore((state) => state.isLoading);
  const onAdd = useCallback(() => {
    navigation.navigate("AddMemo", {
      data: undefined,
    });
  }, []);

  const onView = useCallback(
    (item: Memo) => () => {
      navigation.navigate("AddMemo", {
        data: item,
      });
    },
    [navigation]
  );

  useEffect(() => {
    useMemoStore.getState().fetch();
  }, []);

  return (
    <Container>
      <FlatList
        ListHeaderComponent={
          <AddButton onPress={onAdd}>
            <Icon name="pencil" size={30} />
          </AddButton>
        }
        data={data}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isLoading}
        onRefresh={() => {
          useMemoStore.getState().fetch();
        }}
        onEndReached={() => {
          useMemoStore.getState().fetchMore();
        }}
        contentContainerStyle={{
          gap: 10,
        }}
        renderItem={({ item }) => (
          <MemoListItem title={item.title} onPress={onView(item)} />
        )}
      />
    </Container>
  );
};

export default HomeScreen;
