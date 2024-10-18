import styled from "styled-components";
import { Theme } from "../../theme/theme";

interface TextProps {
  margin?: string;
  color?: string;
  threeDotsLimit?: boolean;
  fontSize: string;
  fontWeight: number;
  align?: string;
  nowrap: boolean;
  pointer: boolean;
  underline: boolean;
}

export const TextContainer = styled.p<TextProps>`
  ${({ margin }) => margin && `margin: ${margin};`};
  text-align: ${({ align }) => (!align ? "start" : align)};
  color: ${({ color }) => (color ? color : Theme.colors.mainlight)};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  ${({ threeDotsLimit }) => threeDotsLimit && `white-space: nowrap;`};
  ${({ threeDotsLimit }) => threeDotsLimit && `overflow: hidden;`};
  ${({ threeDotsLimit }) => threeDotsLimit && `text-overflow: ellipsis;`};
  width: 100%;
  height: auto;
  white-space: ${({ nowrap }) => nowrap && "nowrap"};
  cursor: ${({ pointer }) => pointer && "pointer"};
  text-decoration: ${({ underline }) => underline && "underline"};
`;
