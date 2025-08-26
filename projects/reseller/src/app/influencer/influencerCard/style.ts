import styled from "styled-components";
import { Theme } from "@4miga/design-system/theme/theme";

export const InfluencerCardContainer = styled.div`
  width: 100%;
  background: ${Theme.colors.maindark};
  border-radius: 12px;
  padding: 16px;
  -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
  -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
  box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;

  &:hover {
    background: ${Theme.colors.maindark}99;
  }

  .avatar {
    width: 64px;
    height: 64px;
    background: ${Theme.colors.secondaryTextAction};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 42px;
      height: 42px;
    }
  }

  .allInfo {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .rowInfos {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;

      .statusBadge {
        padding: 2px;
        width: 100px;
        border-radius: 16px;
        display: inline-block;
        text-align: center;

        &.active {
          background: ${Theme.colors.approved}20;
          border: 1px solid ${Theme.colors.approved};
        }

        &.inactive {
          background: ${Theme.colors.refused}20;
          border: 1px solid ${Theme.colors.refused};
        }
      }
    }

    .seeDetails {
      margin-top: 4px;
    }
  }

  @media (max-width: 539px) {
    flex-direction: column;
    text-align: center;
    gap: 12px;

    .allInfo {
      width: 100%;

      .rowInfos {
        flex-direction: column;
        gap: 4px;
        text-align: center;
      }
    }
  }
`;
