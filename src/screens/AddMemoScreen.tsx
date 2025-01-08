import styled from "@emotion/native";

import { addMemo, updateMemo } from "@/libs/supabaseMemoApi";
import { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useCallback, useState } from "react";
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

type Props = StackScreenProps<RootStackParamList, "AddMemo">;

const AddMemoScreen: FC<Props> = ({ navigation, route }) => {
  const { data: memoData } = route.params;
  const { keyboardHeight } = useKeyboardHeight();
  const [title, setTitle] = useState<string>(memoData?.title || "");
  const [content, setContent] = useState<string>(memoData?.content || "");

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
      } else {
        const memo = {
          title,
          content,
        };

        const addedMemo = await addMemo(memo);
        useMemoStore.getState().addMemo(addedMemo);
      }

      Alert.alert(memoData?.id ? "수정되었습니다." : "저장되었습니다.");
      navigation.goBack();
    } catch (e) {
      Alert.alert("저장에 실패했습니다.");
      console.log(e);
      return;
    }
  }, [title, content]);

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
      <Button title="저장" onPress={onSave} />
    </RootLayoutContainer>
  );
};

export default AddMemoScreen;
