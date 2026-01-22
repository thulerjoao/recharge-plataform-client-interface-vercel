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
    -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    border: 1px solid ${Theme.colors.secondaryAction}80;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }
  @media (max-width: 767px) {
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px;

    article {
      margin: 0 12px;
    }
  }
`;
