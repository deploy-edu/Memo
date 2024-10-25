import styled from "@emotion/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { FC } from "react";
import { ViewStyle } from "react-native";
import CommonText from "./CommonText";

type Props = {
  style?: ViewStyle;
  title?: string;
  onPress?: () => void;
};

const Container = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-width: 1px;
  border-radius: 5px;
`;

const Title = styled(CommonText)`
  font-size: 15px;
`;

const MemoListItem: FC<Props> = ({ style, title, onPress }) => {
  return (
    <Container style={style} onPress={onPress}>
      <Title>{title}</Title>
      <Icon name="chevron-right" size={20} />
    </Container>
  );
};

export default MemoListItem;
