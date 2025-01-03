import styled from "@emotion/native";
import Icon from "@expo/vector-icons/Ionicons";
import React, { FC } from "react";
import { ViewStyle } from "react-native";
import CommonText from "./CommonText";

type Props = {
  style?: ViewStyle;
  title?: string;
  onPress?: () => void;
};

const Container = styled.Pressable`
  padding: 20px;
  background-color: #eee;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled(CommonText)`
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;

const SettingListItem: FC<Props> = ({ style, title, onPress }) => {
  return (
    <Container style={style} onPress={onPress}>
      <Title>{title}</Title>
      <Icon name="chevron-forward" size={20} color="#333" />
    </Container>
  );
};

export default SettingListItem;
