import styled from "@emotion/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
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

type Props = StackScreenProps<RootStackParamList, "ViewMemo">;

const ViewMemoScreen: FC<Props> = ({ navigation, route }) => {
  const { data: memoData } = route.params;
  const { keyboardHeight } = useKeyboardHeight();
  const [title, setTitle] = useState<string>(memoData?.title || "");
  const [content, setContent] = useState<string>(memoData?.content || "");

  const onDelete = useCallback(async () => {
    useMemoStore.getState().delete(memoData.id);
    Alert.alert("삭제되었습니다.");
    navigation.goBack();
  }, [title, content]);

  const onAdd = useCallback(() => {
    navigation.navigate("AddMemo", {
      data: memoData,
    });
  }, []);

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
      <Button title="삭제" onPress={onDelete} />
    </RootLayoutContainer>
  );
};

export default ViewMemoScreen;
