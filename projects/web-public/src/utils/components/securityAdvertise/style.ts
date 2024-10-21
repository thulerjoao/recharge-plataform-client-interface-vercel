import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const SecurityAdvertiseContainer = styled.section`
  display: flex;

  article {
    height: 160px;
    width: 160px;
    border-radius: 16px;
    background-color: ${Theme.colors.mainBbackgroundSolid};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 17px 0;
    box-sizing: border-box;
    margin: 0 28px;
  }
`;
