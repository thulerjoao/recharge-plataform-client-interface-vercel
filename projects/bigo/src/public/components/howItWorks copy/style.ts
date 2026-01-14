import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const HowItWorksContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;

  .howItWorksContent {
    width: 100%;
    padding: 0 12px;
    display: flex;
    flex-direction: column;
    align-items: center;

    section {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-around;
      gap: 16px;
      max-width: 950px;
      margin-top: 32px;
      padding: 24px 8px;
      background-color: ${Theme.colors.mainBbackgroundSolid};
      border-radius: 12px;
      -webkit-box-shadow: 0px 0px 5px 0px rgb(15, 65, 79);
      -moz-box-shadow: 0px 0px 5px 0px rgb(15, 65, 79);
      box-shadow: 0px 0px 5px 0px rgb(15, 65, 79);
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
        object-fit: contain;
        margin-bottom: 16px;
      }
    }
  }
`;
