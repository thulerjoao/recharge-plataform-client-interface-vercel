import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

interface OrderCardProps {
  status: string;
}

export const OrderCardContainer = styled.article<OrderCardProps>`
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

  .allInfo {
    height: 66px;
    width: calc(100% - 82px);

    .rowInfos {
      display: flex;
      margin-bottom: 8px;
    }
  }
`;
