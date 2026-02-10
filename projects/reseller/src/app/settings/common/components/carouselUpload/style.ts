import styled from "styled-components";

export const CarouselUploadContainer = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.background_01};
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
    border-bottom: 2px solid ${({ theme }) => theme.text_04};
  }

  .carouselPreviewSection {
    width: 100%;

    .carouselPreviewReduced {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;

      .emptyCarousel {
        padding: 60px 20px;
        text-align: center;
        background: ${({ theme }) => theme.text_04}20;
        border-radius: 8px;
        width: 100%;
      }
    }
  }

  .thumbnailsSection {
    width: 100%;
    margin-top: 24px;

    .thumbnailsHeader {
      margin-bottom: 12px;
    }

    .thumbnailsGrid {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: flex-start;

      .thumbnailItem {
        position: relative;
        width: 160px;
        height: 90px;
        border-radius: 8px;
        overflow: hidden;
        border: 2px solid ${({ theme }) => theme.text_04};

        .thumbnailImageWrapper {
          min-width: 100%;
          height: 100%;
          position: relative;

          .thumbnailImage {
            object-fit: fill;
            object-position: center;
          }
        }

        .removeThumbButton {
          position: absolute;
          background: ${({ theme }) => theme.background_03};
          top: 4px;
          right: 4px;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          svg {
            path {
              fill: ${({ theme }) => theme.text_01};
            }
          }
        }
      }

      .addThumbnailItem {
        width: 160px;
        height: 90px;
        border-radius: 8px;
        border: 2px dashed ${({ theme }) => theme.text_04};
        background: ${({ theme }) => theme.text_04}15;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          border-color: ${({ theme }) => theme.mainColor};
          background: ${({ theme }) => theme.mainColor}15;
        }

        svg {
          width: 24px;
          height: 24px;
          path {
            fill: ${({ theme }) => theme.text_01};
          }
        }
      }
    }
  }

  .saveChangesSection {
    display: flex;
    gap: 12px;
    width: 100%;
    justify-content: center;
    padding-top: 16px;
    border-top: 2px solid ${({ theme }) => theme.text_04};
    margin-top: 8px;
  }

  /* Responsive - Tablets */
  @media (max-width: 768px) {
    padding: 20px;
    gap: 20px;

    .carouselPreviewSection {
      .carouselPreviewReduced {
        max-width: 100%;
      }
    }

    .thumbnailsSection {
      .thumbnailsGrid {
        justify-content: center;

        .thumbnailItem,
        .addThumbnailItem {
          width: 140px;
          height: 79px;
        }
      }
    }
  }

  /* Responsive - Mobile Large */
  @media (max-width: 539px) {
    padding: 16px;
    gap: 16px;

    .sectionHeader {
      padding-bottom: 12px;
    }

    .thumbnailsSection {
      .thumbnailsGrid {
        gap: 8px;

        .thumbnailItem,
        .addThumbnailItem {
          width: 120px;
          height: 68px;
        }

        .thumbnailItem {
          .removeThumbButton {
            width: 20px;
            height: 20px;
          }
        }

        .addThumbnailItem {
          svg {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }

  /* Responsive - Mobile Small */
  @media (max-width: 400px) {
    padding: 14px;
    gap: 14px;

    .sectionHeader {
      padding-bottom: 10px;
      gap: 6px;
    }

    .thumbnailsSection {
      .thumbnailsGrid {
        gap: 6px;

        .thumbnailItem,
        .addThumbnailItem {
          width: 100px;
          height: 56px;
        }

        .thumbnailItem {
          .removeThumbButton {
            width: 20px;
            height: 20px;
          }
        }

        .addThumbnailItem {
          svg {
            width: 18px;
            height: 18px;
          }
        }
      }
    }
  }
`;
