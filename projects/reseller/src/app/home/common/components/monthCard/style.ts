import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const MonthCardContainer = styled.section`
  display: flex;
  width: 100%;
  height: 88px;
  background-color: ${Theme.colors.maindark};
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  padding: 0 13px;
  margin-bottom: 24px;

  img {
    height: 64px;
    width: 64px;
    border-radius: 8px;
    margin-right: 24px;
  }

  section {
    display: flex;
    width: 100%;
    height: 64px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;
