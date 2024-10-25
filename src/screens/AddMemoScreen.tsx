import styled from "@emotion/native";
import React, { FC } from "react";
import { ViewStyle } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import useKeyboardHeight from "../hooks/useKeyboardHeight";

type Props = {
  style?: ViewStyle;
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  gap: 10px;
`;

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

const AddMemoScreen: FC<Props> = ({ style }) => {
  const { keyboardHeight } = useKeyboardHeight();
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");

  return (
    <Container
      style={[
        style,
        {
          paddingBottom: keyboardHeight,
        },
      ]}
    >
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
      <Button title="저장" />
    </Container>
  );
};

export default AddMemoScreen;
