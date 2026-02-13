import styled from "styled-components";

export const PeriodSelectorContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: nowrap;

  .periodSelect {
    padding: 0px 16px;
    height: 40px;
    min-width: 150px;
    border-radius: 8px;
    border: 2px solid ${({ theme }) => theme.border_01};
    background: ${({ theme }) => theme.background_01};
    color: ${({ theme }) => theme.text_01};
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s ease;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23FFFFFF' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 12px;
    padding-right: 36px;

    &:hover {
      border-color: ${({ theme }) => theme.mainColor};
      background-color: ${({ theme }) => theme.background_02};
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.mainColor};
      box-shadow: 0px 0px 8px 0px ${({ theme }) => theme.mainColor}80;
      background-color: ${({ theme }) => theme.background_02};
    }

    option {
      background: ${({ theme }) => theme.background_01};
      color: ${({ theme }) => theme.text_01};
      padding: 12px;
      border: none;
    }
  }

  @media (max-width: 767px) {
    gap: 8px;
    flex-wrap: nowrap;

    .periodSelect {
      min-width: 120px;
      font-size: 13px;
      padding: 0px 12px;
      padding-right: 32px;
      height: 36px;
    }
  }
`;
