import Photo from "@/components/Photo";
import { deleteMemo, deletePhotos, fetchPhotos } from "@/libs/supabaseMemoApi";
import styled from "@emotion/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useCallback, useState } from "react";
import { Alert } from "react-native";
import Button from "../components/Button";
import CommonText from "../components/CommonText";
import Header from "../components/Header";
import RootLayoutContainer from "../components/RootLayoutContainer";
import useKeyboardHeight from "../hooks/useKeyboardHeight";
import { RootStackParamList } from "../navigators/RootStackNavigator";
import { useMemoStore } from "../stores/useMemoStore";

const ContentContainer = styled.View`
  flex: 1;
  padding: 20px;
  border-radius: 10px;
`;

const TitleContainer = styled.View`
  padding: 20px;
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled(CommonText)`
  font-size: 20px;
  font-weight: bold;
`;

const Content = styled(CommonText)`
  font-size: 20px;
`;

const EditButton = styled.Pressable`
  align-items: center;
  justify-content: center;
`;

const PhotoContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

type Props = StackScreenProps<RootStackParamList, "ViewMemo">;

const ViewMemoScreen: FC<Props> = ({ navigation, route }) => {
  const { data: memoData } = route.params;
  const { keyboardHeight } = useKeyboardHeight();
  const [title, setTitle] = useState<string>(memoData?.title || "");
  const [content, setContent] = useState<string>(memoData?.content || "");
  const [photoKeys, setphotoKeys] = useState<string[]>([]);

  const onDelete = useCallback(async () => {
    try {
      await deletePhotos(memoData.id);
      const memo = await deleteMemo(memoData.id);
      useMemoStore.getState().deleteMemo(memoData.id);
      Alert.alert("삭제되었습니다.");
      navigation.goBack();
    } catch (e) {
      Alert.alert("삭제에 실패했습니다.");
      console.log(e);
      return;
    }
  }, [title, content]);

  const onAdd = useCallback(() => {
    navigation.navigate("AddMemo", {
      data: memoData,
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function init() {
        try {
          const photos = await fetchPhotos(memoData.id);
          console.log("photos", photos);
          setphotoKeys(photos);
        } catch (e) {
          console.log(e);
        }
      }
      init();
    }, [memoData.id])
  );

  return (
    <RootLayoutContainer
      style={[
        {
          paddingBottom: keyboardHeight,
        },
      ]}
      containerStyle={{
        gap: 10,
      }}
    >
      <Header
        title="메모"
        backable
        RightComponent={
          <EditButton onPress={onAdd}>
            <Icon name="note-edit-outline" size={30} />
          </EditButton>
        }
      />
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <ContentContainer>
        <Content>{content}</Content>
      </ContentContainer>
      {photoKeys.length > 0 && (
        <PhotoContainer>
          {photoKeys.map((photoKey) => (
            <Photo key={photoKey} photoKey={photoKey} />
          ))}
        </PhotoContainer>
      )}
      <Button title="삭제" onPress={onDelete} />
    </RootLayoutContainer>
  );
};

export default ViewMemoScreen;
