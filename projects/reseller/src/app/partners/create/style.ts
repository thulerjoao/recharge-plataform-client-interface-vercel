import styled from "styled-components";

export const CreateInfluencerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;

  .mobile {
    display: none;
  }

  .mainContent {
    width: 100%;
    max-width: 900px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    min-height: 400px;

    .headerSection {
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 24px;
      width: 100%;
      background: ${({ theme }) => theme.background_02};
      border-radius: 12px;
      border: 1px solid ${({ theme }) => theme.border_02};

      .avatar {
        width: 64px;
        height: 64px;
        background: ${({ theme }) => theme.text_04};
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 42px;
          height: 42px;
        }
      }

      .headerInfo {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;

        .statusBadge {
          padding: 2px;
          width: 100px;
          border-radius: 16px;
          display: inline-block;
          text-align: center;
          background: ${({ theme }) => theme.text_04}20;
          border: 1px solid ${({ theme }) => theme.text_04};
        }
      }

      .onOff {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 12px;
      }
    }

    .infoSections {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;

      .infoSection {
        padding: 24px;
        background: ${({ theme }) => theme.background_02};
        border-radius: 12px;
        border: 1px solid ${({ theme }) => theme.border_02};

        .infoGrid {
          margin-top: 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;

          .infoItem {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .pixTypeSelect {
              box-sizing: border-box;
              padding: 0px 16px;
              width: 100%;
              font-size: 16px;
              height: 28px;
              border-radius: 8px;
              border: 1px solid ${({ theme }) => theme.border_02};
              color: ${({ theme }) => theme.text_01};
              background: ${({ theme }) => theme.background_04};
              cursor: pointer;

              &:focus {
                outline: none;
                border-color: ${({ theme }) => theme.mainColor};
              }

              &.error {
                border-color: ${({ theme }) => theme.pending};
                box-shadow: 0 0 0 3px ${({ theme }) => theme.pending}40;
              }

              option {
                background: ${({ theme }) => theme.background_04};
                color: ${({ theme }) => theme.text_01};
                padding: 8px;
                border: none;
              }
            }

            input {
              border: 1px solid ${({ theme }) => theme.border_02};
              background: ${({ theme }) => theme.background_04};
              color: ${({ theme }) => theme.text_01};

              &::placeholder {
                color: ${({ theme }) => theme.text_04} !important;
              }

              &.error {
                border-color: ${({ theme }) => theme.pending};
                box-shadow: 0 0 0 3px ${({ theme }) => theme.pending}40;
              }
            }

            .error-message {
              color: ${({ theme }) => theme.pending};
              font-size: 12px;
              margin-top: 6px;
              display: block;
              animation: fadeIn 0.2s ease;
            }
          }
        }
      }
    }

    .actionsSection {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding-top: 64px;
    .desktop {
      display: none;
    }
    .mobile {
      display: flex;
      width: 100%;
    }

    .mainContent {
      padding: 16px;
      gap: 24px;

      .headerSection {
        flex-direction: column;
        text-align: center;
        gap: 16px;

        .headerInfo {
          align-items: center;
        }
      }

      .infoSections {
        .infoSection {
          .infoGrid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      }

      .actionsSection {
        flex-direction: column;
        gap: 12px;
      }
    }
  }

  @media (max-width: 539px) {
    .mainContent {
      padding: 0;
      padding-bottom: 5rem;

      .headerSection {
        padding: 16px;
        gap: 12px;

        .onOff {
          width: 100%;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
      }

      .actionsSection {
        width: 100%;
        flex-direction: row;
        gap: 12px;
      }
    }
  }
`;
