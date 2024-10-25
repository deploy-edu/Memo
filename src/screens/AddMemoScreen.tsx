import styled from "@emotion/native";
import React, { FC } from "react";
import { ViewStyle } from "react-native";
import CommonText from "../components/CommonText";

type Props = {
  style?: ViewStyle;
};

const Container = styled.View`;
    
`;

const AddMemoScreen: FC<Props> = ({ style }) => {
  return (
    <Container style={style}>
      <CommonText>AddMemoScreen</CommonText>
    </Container>
  );
};

export default AddMemoScreen;
