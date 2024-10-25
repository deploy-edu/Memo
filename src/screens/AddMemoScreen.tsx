import styled from "@emotion/native";
import React, { FC, useEffect } from "react";
import { Keyboard, ViewStyle } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";

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
  const [keyboardHeight, setKeyboardHeight] = React.useState<number>(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () =>
      setKeyboardHeight(0)
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Container
      style={[
        style,
        {
          paddingBottom: keyboardHeight,
        },
      ]}
    >
      <TitleInput placeholder="제목을 입력하세요" />
      <ContentContainer>
        <ContentInput placeholder="내용을 입력하세요" multiline />
      </ContentContainer>
      <Button title="저장" />
    </Container>
  );
};

export default AddMemoScreen;
