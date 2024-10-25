import styled from "@emotion/native";
import React, { FC } from "react";
import { ViewStyle } from "react-native";
import CommonText from "../components/CommonText";

type Props = {
  style?: ViewStyle;
};

const Container = styled.View`;
    
`;

const AddMemoScren: FC<Props> = ({ style }) => {
  return (
    <Container style={style}>
      <CommonText>AddMemoScren</CommonText>
    </Container>
  );
};

export default AddMemoScren;
