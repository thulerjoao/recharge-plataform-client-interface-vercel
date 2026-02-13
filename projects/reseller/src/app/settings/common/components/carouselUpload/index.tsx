"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { useTheme } from "styled-components";
import { useMultipleImageUpload } from "hooks/useMultipleImageUpload";
import Image from "next/image";
import Carousel from "public/components/carousel/carousel";
import React, { useEffect, useState } from "react";
import Camera from "../../icons/Camera.svg";
import Close from "../../icons/Close.svg";
import { CarouselUploadContainer } from "./style";

interface CarouselUploadProps {
  bannersUrl?: string[];
  onRefreshStore: () => Promise<void>;
}

const CarouselUpload: React.FC<CarouselUploadProps> = ({
  bannersUrl,
  onRefreshStore,
}) => {
  const theme = useTheme();
  const [removedIndices, setRemovedIndices] = useState<number[]>([]);
  const carouselImages = bannersUrl || [];

  const carouselUpload = useMultipleImageUpload({
    endpoint: `/store/banners/batch`,
    maxImages: 5,
    existingImagesCount: carouselImages.filter(
      (_, index) => !removedIndices.includes(index),
    ).length,
    onSuccess: async (urls) => {
      await onRefreshStore();
    },
    onError: (error) => {
      alert(error.message || "Erro ao fazer upload das imagens do carrossel.");
    },
  });

  useEffect(() => {
    setRemovedIndices([]);
  }, [bannersUrl]);

  const handleRemoveCarouselImage = (displayIndex: number) => {
    const visibleWithIndices = carouselImages
      .map((img, originalIndex) => ({ img, originalIndex }))
      .filter(({ originalIndex }) => !removedIndices.includes(originalIndex));

    const totalVisibleSavedBanners = visibleWithIndices.length;
    const isPreviewImage = displayIndex >= totalVisibleSavedBanners;

    if (isPreviewImage) {
      const previewIndex = displayIndex - totalVisibleSavedBanners;
      carouselUpload.removeImage(previewIndex);
    } else {
      const originalIndex = visibleWithIndices[displayIndex].originalIndex;
      setRemovedIndices((prev) => [...prev, originalIndex]);
    }
  };

  const handleSaveCarouselChanges = async () => {
    const hasNewImages = carouselUpload.hasChanges;
    const hasRemovals = removedIndices.length > 0;
    const hasChanges = hasNewImages || hasRemovals;

    if (!hasChanges) {
      return;
    }

    const remainingImages = carouselImages.filter(
      (_, index) => !removedIndices.includes(index),
    ).length;
    const newImagesCount = carouselUpload.selectedFiles.length;

    if (remainingImages + newImagesCount === 0) {
      alert("Você deve ter pelo menos uma imagem no carrossel");
      return;
    }

    try {
      if (hasRemovals) {
        const validIndices = removedIndices.filter(
          (index) => index >= 0 && index < carouselImages.length,
        );

        if (validIndices.length === 0) {
          alert("Imagem não encontrada");
          return;
        }
        const { deleteBannersBatch } = await import("services/bannerService");
        await deleteBannersBatch(validIndices);
      }

      if (hasNewImages) {
        await carouselUpload.handleSave();
      } else {
        await onRefreshStore();
      }
    } catch (error: any) {
      alert(`Erro ao salvar alterações`);
    }
  };

  const visibleSavedImagesWithIndices = carouselImages
    .map((img, originalIndex) => ({ img, originalIndex }))
    .filter(({ originalIndex }) => !removedIndices.includes(originalIndex));

  const visibleSavedImages = visibleSavedImagesWithIndices.map(
    ({ img }) => img,
  );

  const displayCarouselImages =
    carouselUpload.previewUrls.length > 0
      ? [...visibleSavedImages, ...carouselUpload.previewUrls]
      : visibleSavedImages;

  const handleCancel = () => {
    setRemovedIndices([]);
    carouselUpload.clearSelection();
  };

  return (
    <CarouselUploadContainer>
      <div className="sectionHeader">
        <Text fontName="LARGE_SEMI_BOLD" color={theme.text_01}>
          BANNER SUPERIOR PÁGINA HOME
        </Text>
        <Text fontName="SMALL_MEDIUM" color={theme.text_03}>
          A imagem deve estar no formato .png, .jpg ou .jpeg, ter uma resolução
          mínima de 1280 x 540 e uma proporção de 21:9
        </Text>
      </div>

      <div className="carouselPreviewSection">
        <div className="carouselPreviewReduced">
          {displayCarouselImages.length > 0 ? (
            <Carousel imagesList={displayCarouselImages} />
          ) : (
            <div className="emptyCarousel">
              <Text
                align="center"
                fontName="REGULAR_MEDIUM"
                color={theme.text_03}
              >
                Nenhuma imagem adicionada
              </Text>
            </div>
          )}
        </div>
      </div>

      <div className="thumbnailsSection">
        <div className="thumbnailsHeader">
          <Text fontName="SMALL_MEDIUM" color={theme.text_03}>
            Imagens selecionadas ({displayCarouselImages.length}/5):
          </Text>
        </div>

        <div className="thumbnailsGrid">
          {displayCarouselImages.map((image, index) => (
            <div key={index} className="thumbnailItem">
              <div className="thumbnailImageWrapper">
                <Image
                  src={image}
                  alt={`Banner ${index + 1}`}
                  fill
                  sizes="160px"
                  className="thumbnailImage"
                />
              </div>
              <button
                className="removeThumbButton"
                onClick={() => handleRemoveCarouselImage(index)}
                type="button"
              >
                <Close />
              </button>
            </div>
          ))}

          {displayCarouselImages.length < 5 && (
            <div
              className="addThumbnailItem"
              onClick={carouselUpload.handleButtonClick}
            >
              <Camera />
              <Text align="center" fontName="TINY_MEDIUM" color={theme.text_01}>
                Adicionar
              </Text>
            </div>
          )}
        </div>
      </div>

      <input
        ref={carouselUpload.fileInputRef}
        type="file"
        accept="image/png,image/jpg,image/jpeg"
        multiple
        style={{ display: "none" }}
        onChange={carouselUpload.handleFileSelect}
      />

      {(carouselUpload.hasChanges || removedIndices.length > 0) && (
        <div className="saveChangesSection">
          <Button
            rounded
            height={32}
            width={140}
            title="Cancelar"
            onClick={handleCancel}
            // loading={carouselUpload.isUploading}
            disabled={carouselUpload.isUploading}
            isNotSelected
            // style={{ color: theme.text_01 }}
          />
          <Button
            rounded
            height={32}
            width={140}
            title="Salvar"
            onClick={handleSaveCarouselChanges}
            loading={carouselUpload.isUploading}
            disabled={carouselUpload.isUploading}
          />
        </div>
      )}
    </CarouselUploadContainer>
  );
};

export default CarouselUpload;
