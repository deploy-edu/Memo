import DaySelector from "@/components/DaySelector";
import styled from "@emotion/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Dayjs } from "dayjs";
import React, { FC, useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import Header from "../components/Header";
import MemoListItem from "../components/MemoListItem";
import RootLayoutContainer from "../components/RootLayoutContainer";
import { MainTabNavigatorParamList } from "../navigators/MainTabNavigator";
import { RootStackParamList } from "../navigators/RootStackNavigator";
import { Memo, useMemoStore } from "../stores/useMemoStore";

const AddButton = styled.Pressable`
  align-items: center;
  justify-content: center;
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
      navigation.navigate("ViewMemo", {
        data: item,
      });
    },
    [navigation]
  );

  useEffect(() => {
    useMemoStore.getState().fetch();
  }, []);

  const onSelect = useCallback((day: Dayjs) => {
    const filterDay = useMemoStore.getState().filterDay;

    useMemoStore
      .getState()
      .setFilterDay(
        filterDay && filterDay.isSame(day) === true ? undefined : day
      );
    useMemoStore.getState().fetch();
  }, []);

  return (
    <RootLayoutContainer>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <>
            <Header
              title="메모"
              RightComponent={
                <AddButton
                  onPress={onAdd}
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                >
                  <Icon name="pencil" size={30} />
                </AddButton>
              }
            />
            <DaySelector onSelect={onSelect} />
          </>
        }
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
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MemoListItem
            title={item.title}
            content={item.content}
            onPress={onView(item)}
          />
        )}
      />
    </RootLayoutContainer>
  );
};

export default HomeScreen;
