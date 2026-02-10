import styled from "styled-components";

export const SocialNetworksSectionContainer = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.background_01};
  border-radius: 12px;
  box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
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
      border-bottom: 2px solid ${({ theme }) => theme.text_04};
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
    border-top: 2px solid ${({ theme }) => theme.text_04};
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
