import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const SalesByPackageContainer = styled.section`
  width: 100%;
  margin-top: 48px;
  padding-top: 32px;
  padding-bottom: 64px;
  border-top: 1px solid ${Theme.colors.secondaryAction}40;

  .packageList {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .packageItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    background-color: ${Theme.colors.maindark};
    border-radius: 8px;
    padding: 16px 20px;
    border: 1px solid ${Theme.colors.secondaryAction}80;
    -webkit-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    -moz-box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);
    box-shadow: 0px 0px 5px 1px rgba(7, 29, 35, 1);

    .packageName {
      flex: 1;
      min-width: 0;
    }

    .packageMetrics {
      display: flex;
      align-items: center;
      gap: 24px;
      flex-shrink: 0;
      width: 32%;
    }
  }

  @media (max-width: 767px) {
    margin-top: 32px;
    padding-top: 24px;

    .packageItem {
      flex-direction: column;
      align-items: flex-start;
      padding: 12px 16px;

      .packageMetrics {
        width: 100%;
        justify-content: space-between;
        border-top: 1px solid ${Theme.colors.secondaryAction}80;
        padding-top: 12px;

        p {
          text-align: center !important;
        }
      }
    }
  }
`;
