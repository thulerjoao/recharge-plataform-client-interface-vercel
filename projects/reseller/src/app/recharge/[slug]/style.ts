import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const ManualRechargeInnerPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
    background-color: ${Theme.colors.maindark};
    margin-top: 24px;
    width: 100%;
    max-width: 400px;

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 72px;
      width: 100%;

      img {
        height: 100%;
        width: auto;
        border-radius: 8px;
      }

      .packageInfo {
        height: 100%;
      }
    }

    .copyArea {
      width: 100%;
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
      }

      .newButton {
        margin: 16px 0;
        display: flex;
        justify-content: center;
        height: 32px;
        border: 2px solid ${Theme.colors.mainHighlight};
        border-radius: 16px;
        width: 100%;
        max-width: 326px;
        cursor: pointer;

        span {
          display: flex;
          align-items: center;
        }
      }
    }
    .confirmButton {
      width: 100%;
      max-width: 326px;
    }
    .seeMore {
      cursor: pointer;
      margin-top: 40px;
    }
  }
`;
