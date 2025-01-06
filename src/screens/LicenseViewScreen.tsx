import Header from "@/components/Header";
import RootLayoutContainer from "@/components/RootLayoutContainer";
import { RootStackParamList } from "@/navigators/RootStackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import React, { FC } from "react";
import WebView from "react-native-webview";

type Props = StackScreenProps<RootStackParamList, "LicenseView">;

const LicenseViewScreen: FC<Props> = ({ route }) => {
  const {
    data: { packageName, licenses, repository, licenseUrl, parents },
  } = route.params;

  return (
    <RootLayoutContainer
      containerStyle={{
        gap: 10,
      }}
    >
      <Header title="라이센스" />
      <WebView source={{ uri: licenseUrl }} />
    </RootLayoutContainer>
  );
};

export default LicenseViewScreen;
