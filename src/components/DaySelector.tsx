import styled from "@emotion/native";
import dayjs, { Dayjs } from "dayjs";
import React, { FC, useCallback, useMemo, useState } from "react";
import { FlatList, ViewStyle } from "react-native";
import DaySelectorListItem from "./DaySelectorListItem";

type Props = {
  style?: ViewStyle;
  onSelect?: (day: Dayjs) => void;
};

const Container = styled.View`
  flex-direction: row;
`;

const DaySelector: FC<Props> = ({ style, onSelect }) => {
  const initialDayList = useMemo(
    () => [
      {
        day: dayjs().subtract(3, "day"),
      },
      {
        day: dayjs().subtract(2, "day"),
      },
      {
        day: dayjs().subtract(1, "day"),
      },
      {
        day: dayjs(),
      },
      {
        day: dayjs().add(1, "day"),
      },
      {
        day: dayjs().add(2, "day"),
      },
      {
        day: dayjs().add(3, "day"),
      },
    ],
    []
  );

  const [dayList, setDayList] = useState(initialDayList);

  const onStartReached = useCallback(() => {
    const newDayList = [
      {
        day: dayList[0].day.subtract(7, "day"),
      },
      {
        day: dayList[0].day.subtract(6, "day"),
      },
      {
        day: dayList[0].day.subtract(5, "day"),
      },
      {
        day: dayList[0].day.subtract(4, "day"),
      },
      {
        day: dayList[0].day.subtract(3, "day"),
      },
      {
        day: dayList[0].day.subtract(2, "day"),
      },
      {
        day: dayList[0].day.subtract(1, "day"),
      },
      ...dayList,
    ];

    setDayList(newDayList);
  }, [dayList]);

  const onEndReached = useCallback(() => {
    const newDayList = [
      ...dayList,
      {
        day: dayList[dayList.length - 1].day.add(1, "day"),
      },
      {
        day: dayList[dayList.length - 1].day.add(2, "day"),
      },
      {
        day: dayList[dayList.length - 1].day.add(3, "day"),
      },
      {
        day: dayList[dayList.length - 1].day.add(4, "day"),
      },
      {
        day: dayList[dayList.length - 1].day.add(5, "day"),
      },
      {
        day: dayList[dayList.length - 1].day.add(6, "day"),
      },
      {
        day: dayList[dayList.length - 1].day.add(7, "day"),
      },
    ];

    setDayList(newDayList);
  }, [dayList]);

  const onPress = useCallback(
    (day: dayjs.Dayjs) => () => {
      onSelect?.(day);
    },
    [onSelect]
  );

  return (
    <Container style={style}>
      <FlatList
        data={dayList}
        horizontal
        renderItem={({ item, index }) => {
          return (
            <DaySelectorListItem day={item.day} onPress={onPress(item.day)} />
          );
        }}
        keyExtractor={(item, index) => item.day.format("YYYYMMDD")}
        maintainVisibleContentPosition={{
          minIndexForVisible: 1,
          autoscrollToTopThreshold: undefined,
        }}
        showsHorizontalScrollIndicator={false}
        onStartReached={onStartReached}
        onEndReached={onEndReached}
      />
    </Container>
  );
};

export default DaySelector;
