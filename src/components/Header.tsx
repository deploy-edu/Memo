import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import React, { FC, ReactNode, useCallback } from "react";
import { ViewStyle } from "react-native";
import BackButton from "./BackButton";
import CommonText from "./CommonText";

type Props = {
  style?: ViewStyle;
  title: string;
  backable?: boolean;
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

const Header: FC<Props> = ({
  style,
  title,
  backable = false,
  LeftComponent,
  RightComponent,
}) => {
  const navigation = useNavigation();
  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <Container style={style}>
      <LeftComponentContainer>
        {LeftComponent
          ? LeftComponent
          : backable && <BackButton onPress={onBack} />}
      </LeftComponentContainer>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <RightComponentContainer>{RightComponent}</RightComponentContainer>
    </Container>
  );
};

export default Header;
