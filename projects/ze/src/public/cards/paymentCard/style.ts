import styled from "styled-components";

interface PaymentCardProps {
  selected: boolean;
}

export const PaymentCardContainer = styled.article<PaymentCardProps>`
  width: 100%;
  height: 72px;
  margin-top: 16px;
  background-color: ${({ theme }) => theme.text_01};
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 4px solid
    ${({ selected, theme }) =>
      selected ? theme.mainColor : theme.text_01};
  box-shadow: ${({ selected, theme }) =>
    selected && `0px 0px 10px 0px ${theme.mainColor}`};
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
