import { Theme } from "@4miga/design-system/theme/theme";
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
  background-color: ${Theme.colors.maindark};
  -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
  border: 1px solid ${Theme.colors.secondaryAction}80;
  box-sizing: border-box;
  cursor: pointer;

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
