import styled from "styled-components";

export const SecondaryBannerUploadContainer = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.background_02};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border_02};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  .sectionHeader {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.border_01};
  }

  .bannerImagePreview {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;

    .bannerImageWrapper {
      width: 90%;
      position: relative;
      aspect-ratio: 21 / 9;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid ${({ theme }) => theme.border_02};

      .bannerImage {
        object-fit: fill;
        object-position: center;
      }
    }

    .emptyBanner {
      width: 100%;
      padding: 100px 20px;
      text-align: center;
      background: ${({ theme }) => theme.background_04};
      border-radius: 8px;
      border: 1px dashed ${({ theme }) => theme.border_02};
      aspect-ratio: 21 / 9;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .imageActionButtons {
    max-width: 180px;
    width: 100%;
  }

  .saveChangesSection {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 16px;
    padding-top: 16px;
    border-top: 1px solid ${({ theme }) => theme.border_01};
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    padding: 20px;
    gap: 20px;

    .bannerImagePreview {
      .bannerImageWrapper {
        width: 100%;
      }
    }

    .imageActionButtons {
      flex-direction: row;
      gap: 12px;
      max-width: 100%;

      button {
        flex: 1;
      }
    }
  }

  @media (max-width: 539px) {
    padding: 16px;
    gap: 16px;

    .sectionHeader {
      padding-bottom: 12px;
    }

    .imageActionButtons {
      flex-direction: column;
      gap: 12px;

      button {
        width: 100%;
      }
    }
  }

  @media (max-width: 400px) {
    padding: 14px;
    gap: 14px;

    .sectionHeader {
      padding-bottom: 10px;
      gap: 6px;
    }

    .imageActionButtons {
      gap: 10px;
    }
  }
`;
