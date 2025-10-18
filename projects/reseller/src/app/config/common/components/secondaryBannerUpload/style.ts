import { Theme } from "@4miga/design-system/theme/theme";
import styled from "styled-components";

export const SecondaryBannerUploadContainer = styled.div`
  padding: 24px;
  background: ${Theme.colors.maindark};
  border-radius: 12px;
  box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
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
    border-bottom: 2px solid ${Theme.colors.secondaryTextAction};
  }

  .bannerImagePreview {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;

    .bannerImageWrapper {
      width: 100%;
      position: relative;
      aspect-ratio: 21 / 9;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      .bannerImage {
        object-fit: fill;
        object-position: center;
      }
    }

    .emptyBanner {
      width: 100%;
      padding: 100px 20px;
      text-align: center;
      background: ${Theme.colors.secondaryTextAction}20;
      border-radius: 8px;
      border: 2px dashed ${Theme.colors.secondaryTextAction};
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
    border-top: 2px solid ${Theme.colors.secondaryTextAction};
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    padding: 20px;
    gap: 20px;

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
