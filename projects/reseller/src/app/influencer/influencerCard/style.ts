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

  .avatarSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;

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

    .mobileStatus {
      display: none;
      padding: 1px 4px;
      width: 70px;
      border-radius: 12px;
      text-align: center;
      height: 20px;
      line-height: 18px;

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
        padding: 1px 6px;
        width: 70px;
        border-radius: 8px;
        display: inline-block;
        text-align: center;
        height: 20px;
        line-height: 18px;

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

  @media (max-width: 1200px) {
    padding: 14px;
    gap: 14px;

    .avatarSection {
      .avatar {
        width: 56px;
        height: 56px;

        svg {
          width: 36px;
          height: 36px;
        }
      }
    }

    .allInfo {
      gap: 6px;

      .rowInfos {
        gap: 12px;

        .statusBadge {
          width: 65px;
          height: 18px;
          line-height: 16px;
          padding: 1px 5px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 12px;
    gap: 12px;

    .avatarSection {
      .avatar {
        width: 48px;
        height: 48px;

        svg {
          width: 32px;
          height: 32px;
        }
      }
    }

    .allInfo {
      gap: 5px;

      .rowInfos {
        gap: 10px;

        .statusBadge {
          width: 60px;
          height: 16px;
          line-height: 14px;
          padding: 1px 4px;
        }
      }
    }
  }

  @media (max-width: 539px) {
    flex-direction: row;
    text-align: left;
    gap: 16px;
    padding: 12px;
    align-items: flex-start;

    .avatarSection {
      .avatar {
        width: 65px;
        height: 65px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
        align-items: center;

        svg {
          width: 40px;
          height: 40px;
        }
      }

      .mobileStatus {
        display: block;
      }
    }

    .allInfo {
      width: 100%;
      gap: 6px;

      .rowInfos {
        flex-direction: column;
        gap: 4px;
        text-align: left;
        align-items: flex-start;

        .desktopStatus {
          display: none;
        }
      }
    }
  }

  @media (max-width: 400px) {
    padding: 10px;
    gap: 14px;

    .avatarSection {
      .avatar {
        width: 60px;
        height: 60px;

        svg {
          width: 36px;
          height: 36px;
        }
      }

      .mobileStatus {
        width: 65px;
        height: 18px;
        line-height: 16px;
        font-size: 9px;
      }
    }

    .allInfo {
      gap: 4px;

      .rowInfos {
        gap: 3px;
      }
    }
  }

  .desktopStatus {
    @media (max-width: 539px) {
      display: none;
    }
  }
`;
