import styled from "@emotion/native";
import React, { FC, ReactNode } from "react";
import { ViewStyle } from "react-native";
import CommonText from "./CommonText";

type Props = {
  style?: ViewStyle;
  title: string;
  LeftComponent?: ReactNode;
  RightComponent?: ReactNode;
};

const Container = styled.View`
  flex-direction: row;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 60px;
`;

const LeftComponentContainer = styled.View`
  position: absolute;
  left: 0;
  top: 0px;
  bottom: 0px;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const RightComponentContainer = styled.View`
  position: absolute;
  right: 0px;
  top: 0px;
  bottom: 0px;
  align-items: center;
  justify-content: center;
`;

const Title = styled(CommonText)`
  font-size: 20px;
  font-weight: bold;
`;

const Header: FC<Props> = ({ style, title, LeftComponent, RightComponent }) => {
  return (
    <Container style={style}>
      <LeftComponentContainer>{LeftComponent}</LeftComponentContainer>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <RightComponentContainer>{RightComponent}</RightComponentContainer>
    </Container>
  );
};

export default Header;
