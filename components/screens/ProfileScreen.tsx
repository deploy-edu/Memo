import styled from "@emotion/native";
import React, { FC } from "react";
import CommonText from "../components/CommonText";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ProfileScreen: FC = () => {
  return (
    <Container>
      <CommonText>ProfileScreen</CommonText>
    </Container>
  );
};

export default ProfileScreen;
