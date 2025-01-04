import CommonText from "@/components/CommonText";
import { useMemoStore } from "@/stores/useMemoStore";
import styled from "@emotion/native";
import { Dayjs } from "dayjs";
import React, { FC } from "react";
import { useWindowDimensions } from "react-native";

type Props = {
  day: Dayjs;
  onPress: () => void;
};

const Container = styled.Pressable`
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const YearMonth = styled(CommonText)`
  font-size: 12px;
  color: #666;
`;

const DayNumber = styled(CommonText)`
  font-size: 24px;
  font-weight: bold;
  padding: 8px;
  border-radius: 10px;
`;

const DayName = styled(CommonText)`
  font-size: 12px;
  color: #666;
`;

const DaySelectorListItem: FC<Props> = ({ day, onPress }) => {
  const { width: screenWidth } = useWindowDimensions();
  const filterDay = useMemoStore((state) => state.filterDay);

  const PADDING_SIZE = 20 * 2;
  const ITEM_SIZE = (screenWidth - PADDING_SIZE) / 7;

  return (
    <Container style={{ width: ITEM_SIZE }} onPress={onPress}>
      <YearMonth>{day.format("YY.MM")}</YearMonth>
      <DayNumber
        style={{
          backgroundColor: filterDay?.isSame(day) ? "#eee" : "transparent",
        }}
      >
        {day.format("DD")}
      </DayNumber>
      <DayName>{day.format("ddd")}</DayName>
    </Container>
  );
};

export default DaySelectorListItem;
