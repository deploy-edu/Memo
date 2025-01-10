import styled from "@emotion/native";

import Photo from "@/components/Photo";
import { supabase } from "@/libs/supabase";
import {
  addMemo,
  addPhotos,
  fetchPhotos,
  updateMemo,
} from "@/libs/supabaseMemoApi";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StackScreenProps } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import RootLayoutContainer from "../components/RootLayoutContainer";
import useKeyboardHeight from "../hooks/useKeyboardHeight";
import { RootStackParamList } from "../navigators/RootStackNavigator";
import { useMemoStore } from "../stores/useMemoStore";

const ContentContainer = styled.View`
  flex: 1;
  background-color: #f1f1f1;
`;

const TitleInput = styled(Input)`
  font-size: 20px;
  font-weight: bold;
`;

const ContentInput = styled(Input)`
  font-size: 20px;
`;

const PhotoContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const AddPhotoButton = styled.Pressable`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: #f1f1f1;
  align-items: center;
  justify-content: center;
`;

type Props = StackScreenProps<RootStackParamList, "AddMemo">;

const AddMemoScreen: FC<Props> = ({ navigation, route }) => {
  const { data: memoData } = route.params;
  const { keyboardHeight } = useKeyboardHeight();
  const [title, setTitle] = useState<string>(memoData?.title || "");
  const [content, setContent] = useState<string>(memoData?.content || "");
  const [photoKeys, setPhotoKeys] = useState<string[]>([]);

  const onSave = useCallback(async () => {
    try {
      if (memoData?.id) {
        const memo = {
          id: memoData.id,
          title,
          content,
        };
        const updatedMemo = await updateMemo(memo);
        useMemoStore.getState().updateMemo(updatedMemo);
        for (const photoKey of photoKeys) {
          await addPhotos(updatedMemo.id, photoKey);
        }
      } else {
        const memo = {
          title,
          content,
        };

        const addedMemo = await addMemo(memo);
        useMemoStore.getState().addMemo(addedMemo);
        for (const photoKey of photoKeys) {
          await addPhotos(addedMemo.id, photoKey);
        }
      }

      Alert.alert(memoData?.id ? "수정되었습니다." : "저장되었습니다.");
      navigation.goBack();
    } catch (e) {
      Alert.alert("저장에 실패했습니다.");
      console.log(e);
      return;
    }
  }, [title, content, photoKeys]);

  const onAddPhoto = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to only images
        allowsMultipleSelection: false, // Can only select one image
        allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
        quality: 1,
        exif: false, // We don't want nor need that data.
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
        return;
      }

      const image = result.assets[0];
      console.log("Got image", image);

      if (!image.uri) {
        throw new Error("No image uri!"); // Realistically, this should never happen, but just in case...
      }

      const arraybuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
      );

      const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("photos")
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }
      console.log(data);
      setPhotoKeys((prev) => [...prev, data.path]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    async function init() {
      if (!memoData?.id) {
        return;
      }
      const photos = await fetchPhotos(memoData.id);
      setPhotoKeys(photos);
    }
    init();
  }, [memoData?.id]);

  return (
    <RootLayoutContainer
      containerStyle={{
        gap: 10,
        paddingBottom: keyboardHeight,
      }}
    >
      <Header backable title="메모 수정" />
      <TitleInput
        placeholder="제목을 입력하세요"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
        }}
      />
      <ContentContainer>
        <ContentInput
          placeholder="내용을 입력하세요"
          multiline
          value={content}
          onChangeText={(text) => {
            setContent(text);
          }}
        />
      </ContentContainer>
      <PhotoContainer>
        <AddPhotoButton onPress={onAddPhoto}>
          <Icon name="plus" size={30} />
        </AddPhotoButton>
        {photoKeys.map((photoKey) => (
          <Photo key={photoKey} photoKey={photoKey} />
        ))}
      </PhotoContainer>
      <Button title="저장" onPress={onSave} />
    </RootLayoutContainer>
  );
};

export default AddMemoScreen;
