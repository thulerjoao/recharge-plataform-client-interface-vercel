import styled from "styled-components";

export const CustomerCardContainer = styled.div<{ $isExcluded?: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 20px;
  background: ${({ $isExcluded, theme }) =>
    $isExcluded ? `${theme.refused}20` : theme.background_01};
  border-radius: 12px;
  -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  border: 1px solid
    ${({ $isExcluded, theme }) =>
      `${theme[$isExcluded ? "refused" : "border_01"]}80`};

  .deleteIconButton {
    position: absolute;
    bottom: 5%;
    right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    color: ${({ theme }) => theme.refused};
  }

  .cardLine {
    display: block;
    word-break: break-word;
  }

  .cardName {
    font-size: 16px;
  }

  .cardEmail {
    font-size: 14px;
  }

  .cardContactWrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0 12px;
    opacity: 0.95;

    .cardLine {
      font-size: 13px;
    }
  }

  @media (max-width: 768px) {
    padding: 14px 16px;

    .cardName {
      font-size: 15px;
    }

    .cardEmail {
      font-size: 13px;
    }
  }

  @media (max-width: 539px) {
    .cardContactWrapper {
      flex-direction: column;
      gap: 6px;

      .cardLine {
        font-size: 12px;
      }

      .cardCpf::before {
        content: none;
      }
    }
  }
`;
