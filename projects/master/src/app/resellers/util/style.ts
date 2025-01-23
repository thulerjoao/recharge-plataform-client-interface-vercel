import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const ResellersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 824px;
    padding: 0 16px;
    margin-top: 32px;

    .addReseller {
      background-color: ${Theme.colors.mainBbackgroundSolid};
      height: 64px;
      width: 100%;
      max-width: 696px;
      padding: 0 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 8px;
      cursor: pointer;
    }

    .bottomContainer {
      border-top: 1px solid ${Theme.colors.secondaryAction};
      padding-top: 32px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 24px;
    }
  }

  @media (min-width: 540px) and (max-width: 1024px) {
  }
  @media (max-width: 539px) {
  }
`;
