import styled from "@emotion/native";
import { FC, ReactNode } from "react";
import { TextStyle } from "react-native";

const StyledText = styled.Text`
  font-size: 20px;
  font-family: "San Francisco";
`;

type Props = {
  children: ReactNode;
  style?: TextStyle;
};

const CommonText: FC<Props> = ({ children, style }) => {
  return <StyledText style={style}>{children}</StyledText>;
};

export default CommonText;
