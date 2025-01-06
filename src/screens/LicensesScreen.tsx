import Header from "@/components/Header";
import RootLayoutContainer from "@/components/RootLayoutContainer";
import SettingListItem from "@/components/SettingListItem";
import { RootStackParamList } from "@/navigators/RootStackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useCallback, useMemo } from "react";
import { FlatList } from "react-native";
import licenses from "../../licenses.json";

type Props = StackScreenProps<RootStackParamList, "Licenses">;

export type License = {
  packageName: string;
  licenses: string;
  repository: string;
  licenseUrl: string;
  parents: string;
};

const LicensesScreen: FC<Props> = ({ navigation }) => {
  const data = useMemo<License[]>(
    () =>
      Object.entries(licenses).map(([key, row]) => {
        return {
          packageName: key,
          licenses: row.licenses,
          repository: row.repository,
          licenseUrl: row.licenseUrl,
          parents: row.parents,
        };
      }),
    []
  );

  const onPress = useCallback(
    (item: License) => () => {
      navigation.navigate("LicenseView", {
        data: item,
      });
    },
    []
  );

  return (
    <RootLayoutContainer
      containerStyle={{
        gap: 10,
      }}
    >
      <Header title="라이센스" />
      <FlatList
        data={data}
        contentContainerStyle={{
          gap: 10,
        }}
        renderItem={({ item }) => {
          return (
            <SettingListItem
              title={`[${item.licenses}] ${item.packageName}`}
              onPress={onPress(item)}
            />
          );
        }}
        keyExtractor={(item) => item.packageName}
      />
    </RootLayoutContainer>
  );
};

export default LicensesScreen;
