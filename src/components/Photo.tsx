import { supabase } from "@/libs/supabase";
import styled from "@emotion/native";
import React, { FC, useEffect, useState } from "react";
import { ViewStyle } from "react-native";

type Props = {
  style?: ViewStyle;
  photoKey: string;
};

const Container = styled.View`
  width: 100px;
  height: 100px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Photo: FC<Props> = ({ style, photoKey }) => {
  const [photoUrl, setPhotoUrl] = useState<string>("");

  useEffect(() => {
    const { data } = supabase.storage.from("photos").getPublicUrl(photoKey);
    console.log(data);
    if (data) {
      setPhotoUrl(data.publicUrl);
    }
  }, [photoKey]);

  if (!photoUrl) {
    return null;
  }

  return (
    <Container style={style}>
      <Image
        source={{
          uri: photoUrl,
        }}
      />
    </Container>
  );
};

export default Photo;
