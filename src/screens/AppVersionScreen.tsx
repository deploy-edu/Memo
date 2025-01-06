import CommonText from "@/components/CommonText.ios";
import Header from "@/components/Header";
import RootLayoutContainer from "@/components/RootLayoutContainer";
import { RootStackParamList } from "@/navigators/RootStackNavigator";
import styled from "@emotion/native";
import { StackScreenProps } from "@react-navigation/stack";
import * as Application from "expo-application";
import React, { FC } from "react";

type Props = StackScreenProps<RootStackParamList, "AppVersion">;

const AppVersion = styled(CommonText)`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
`;

const AppVersionScreen: FC<Props> = () => {
  return (
    <RootLayoutContainer
      containerStyle={{
        gap: 10,
      }}
    >
      <Header title="앱 버전" />
      <AppVersion>{Application.nativeApplicationVersion}</AppVersion>
    </RootLayoutContainer>
  );
};

export default AppVersionScreen;
