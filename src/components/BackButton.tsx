import styled from "@emotion/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { FC } from "react";
import { ViewStyle } from "react-native";

type Props = {
  style?: ViewStyle;
  onPress?: () => void;
};

const Container = styled.Pressable`
  align-items: center;
  justify-content: center;
`;

const BackButton: FC<Props> = ({ style, onPress }) => {
  return (
    <Container
      onPress={onPress}
      style={style}
      hitSlop={{
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      }}
    >
      <MaterialIcons name="arrow-back-ios" size={24} color="black" />
    </Container>
  );
};

export default BackButton;
