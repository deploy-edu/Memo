import DaySelector from "@/components/DaySelector";
import { fetchMemos } from "@/libs/supabaseMemoApi";
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

  const onSelect = useCallback(async (day: Dayjs) => {
    const oldFilterDay = useMemoStore.getState().filterDay;
    const newFilterDay =
      oldFilterDay && oldFilterDay.isSame(day) === true ? undefined : day;
    useMemoStore.getState().setFilterDay(newFilterDay);

    const memos = await fetchMemos(newFilterDay);
    const lastId = memos.length ? memos[memos.length - 1].id : undefined;
    useMemoStore.getState().setMemos(memos, lastId);
  }, []);

  const onRefresh = useCallback(async () => {
    const memos = await fetchMemos();
    const lastId = memos.length ? memos[memos.length - 1].id : undefined;
    useMemoStore.getState().setMemos(memos, lastId);
  }, []);

  const onEndReached = useCallback(async () => {
    const filterDay = useMemoStore.getState().filterDay;
    const lastId = useMemoStore.getState().lastId;
    const oldMemos = useMemoStore.getState().data;

    const memos = await fetchMemos(filterDay, lastId);
    const newMemos = oldMemos.concat(memos);
    const newLastId = memos.length ? memos[memos.length - 1].id : lastId;

    useMemoStore.getState().setMemos(newMemos, newLastId);
  }, []);

  useEffect(() => {
    async function init() {
      const memos = await fetchMemos();
      const lastId = memos.length ? memos[memos.length - 1].id : undefined;
      useMemoStore.getState().setMemos(memos, lastId);
    }

    init();
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
        onRefresh={onRefresh}
        onEndReached={onEndReached}
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
