import styled from "styled-components";

export const SocialNetworksSectionContainer = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.background_02};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border_02};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  .section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .sectionHeader {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-bottom: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.border_01};
    }
  }

  .socialGrid,
  .contactGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 8px;
    width: 100%;

    .socialItem {
      display: flex;
      flex-direction: column;
      gap: 4px;

      input {
        background: ${({ theme }) => theme.background_04};
        border: 1px solid ${({ theme }) => theme.border_02};
        color: ${({ theme }) => theme.text_01};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &::placeholder {
          color: ${({ theme }) => theme.text_04} !important;
        }

        &.error {
          border-color: ${({ theme }) => theme.pending};
        }
      }

      .error-message {
        color: ${({ theme }) => theme.pending};
        font-size: 12px;
        margin-top: 6px;
        display: block;
        animation: fadeIn 0.2s ease;
      }

      .socialLink {
        text-decoration: none;
        cursor: pointer;
        transition: opacity 0.2s ease;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .actionButtons {
    display: flex;
    justify-content: center;
    padding-top: 16px;
    border-top: 1px solid ${({ theme }) => theme.border_01};
    margin-top: 8px;
    width: 100%;
    gap: 16px;
  }

  /* Responsive - Tablets */
  @media (max-width: 768px) {
    padding: 20px;
    gap: 24px;

    .section {
      gap: 20px;

      .sectionHeader {
        padding-bottom: 12px;
      }
    }

    .socialGrid,
    .contactGrid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  /* Responsive - Mobile Large */
  @media (max-width: 539px) {
    padding: 16px;
    gap: 20px;

    .section {
      gap: 16px;

      .sectionHeader {
        padding-bottom: 12px;
      }
    }

    .socialGrid,
    .contactGrid {
      gap: 16px;
    }
  }

  /* Responsive - Mobile Small */
  @media (max-width: 400px) {
    padding: 14px;
    gap: 16px;

    .section {
      gap: 14px;

      .sectionHeader {
        padding-bottom: 10px;
        gap: 6px;
      }
    }

    .socialGrid,
    .contactGrid {
      gap: 14px;
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
`;
