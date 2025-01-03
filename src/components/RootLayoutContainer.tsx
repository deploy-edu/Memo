import styled from "@emotion/native";
import React, { FC, ReactNode } from "react";
import { ViewStyle } from "react-native";

type Props = {
  style?: ViewStyle | ViewStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  children?: ReactNode;
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const InnerContainer = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
`;

const RootLayoutContainer: FC<Props> = ({
  style,
  containerStyle,
  children,
}) => {
  return (
    <Container style={style}>
      <InnerContainer style={containerStyle}>{children}</InnerContainer>
    </Container>
  );
};

export default RootLayoutContainer;
