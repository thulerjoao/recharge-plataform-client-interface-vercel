import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const ResellerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;

  .mainTitle {
    margin-top: 48px;
  }

  .cardsContainer {
    width: 100%;
    max-width: 605px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 24px;
    margin-bottom: 56px;

    .cardEnviroment {
      height: auto;
      flex: 0 1 calc(33.33% - 16px);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-bottom: 24px;
    }
  }

  .fixRecharge {
    height: 18px;
    position: relative;
    width: 100%;
    margin-bottom: 120px;
    margin-top: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .fixText {
      position: relative;
      cursor: pointer;

      .ball {
        position: absolute;
        background-color: ${Theme.colors.refused};
        border-radius: 9px;
        min-width: 18px;
        height: 18px;
        padding: 0 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        right: -8px;
        top: -18px;
      }
    }
  }

  @media (min-width: 540px) and (max-width: 1024px) {
  }
  @media (max-width: 539px) {
    .mainTitle {
      margin-top: 24px;
    }

    .cardsContainer {
      padding: 0;
      box-sizing: border-box;

      .cardEnviroment {
        flex: 0 1 calc(50% - 10px);
      }
    }
  }
`;
