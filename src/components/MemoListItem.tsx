import styled from "@emotion/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { FC } from "react";
import { ViewStyle } from "react-native";
import CommonText from "./CommonText";

type Props = {
  style?: ViewStyle;
  title?: string;
  content?: string;
  onPress?: () => void;
};

const Container = styled.Pressable`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px;
  border-width: 1px;
  border-radius: 10px;
  border-color: #ddd;
  background-color: #eee;
`;

const Title = styled(CommonText)`
  font-size: 18px;
`;

const Content = styled(CommonText)`
  font-size: 15px;
  color: #666;
  line-height: 20px;
`;

const TitleContainer = styled.View`
  flex: 1;
  gap: 10px;
  text-overflow: ellipsis;
`;

const MemoListItem: FC<Props> = ({ style, title, content, onPress }) => {
  return (
    <Container style={style} onPress={onPress}>
      <TitleContainer>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </TitleContainer>
      <Icon name="chevron-right" size={20} />
    </Container>
  );
};

export default MemoListItem;
