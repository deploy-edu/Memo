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
  background-color: #fff;
  border-radius: 5px;
  border-width: 1px;
  border-color: gray;
  flex-direction: row;
  justify-content: space-between;
`;

const SettingListItem: FC<Props> = ({ style, title, onPress }) => {
  return (
    <Container style={style} onPress={onPress}>
      <CommonText>{title}</CommonText>
      <Icon name="chevron-forward" size={20} color="gray" />
    </Container>
  );
};

export default SettingListItem;
