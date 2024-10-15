import styled from "styled-components";

interface TextProps {
  margin?: string;
  color?: string;
  threeDotsLimit?: boolean;
  fontSize: string;
  fontWeight: number;
  align?: string;
}

export const TextContainer = styled.p<TextProps>`
  ${({ margin }) => margin && `margin: ${margin};`};
  text-align: ${({ align }) => (!align ? "start" : align)};
  ${({ color }) => color && `color: ${color};`};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  ${({ threeDotsLimit }) => threeDotsLimit && `white-space: nowrap;`};
  ${({ threeDotsLimit }) => threeDotsLimit && `overflow: hidden;`};
  ${({ threeDotsLimit }) => threeDotsLimit && `text-overflow: ellipsis;`};
  width: 100%;
  height: auto;
`;
