import styled from "styled-components";

export const OrderCardContainer = styled.article`
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background_02};
  border: 1px solid ${({ theme }) => theme.border_02};
  box-sizing: border-box;
  cursor: pointer;

  img {
    height: 58px;
    width: 58px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.border_02};
  }

  .allInfo {
    height: 66px;
    width: calc(100% - 82px);
    display: flex;
    flex-direction: column;
    align-items: center;

    .rowInfos {
      display: flex;
      margin-bottom: 8px;
      width: 100%;
    }
  }
`;
