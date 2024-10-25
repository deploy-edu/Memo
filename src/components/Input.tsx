import styled from "@emotion/native";
import React, { FC } from "react";
import { TextInputProps } from "react-native";

type Props = TextInputProps;

const Container = styled.View`
  background-color: #f1f1f1;
  border-radius: 5px;
  align-self: stretch;
`;

const StyledInput = styled.TextInput`
  padding: 20px;
`;

const Input: FC<Props> = ({ style, ...props }) => {
  return (
    <Container style={style}>
      <StyledInput {...props} />
    </Container>
  );
};

export default Input;
