import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

interface PaymentCardProps {
  selected: boolean;
}

export const PaymentCardContainer = styled.article<PaymentCardProps>`
  width: 100%;
  height: 72px;
  margin-top: 16px;
  background-color: ${Theme.colors.mainlight};
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 4px solid
    ${({ selected }) =>
      selected ? Theme.colors.mainHighlight : Theme.colors.mainlight};
  box-shadow: ${({ selected }) =>
    selected && `0px 0px 10px 0px ${Theme.colors.mainHighlight}`};
    cursor: pointer;

  .iconContainer {
    display: flex;
    align-items: center;

    span {
      margin-right: 16px;
      display: flex;
      align-items: center;
    }

    p {
      max-width: 4rem;
    }
  }
`;
