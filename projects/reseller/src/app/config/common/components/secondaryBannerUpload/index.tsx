"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useImageUpload } from "hooks/useImageUpload";
import Image from "next/image";
import React, { useState } from "react";
import Camera from "../../icons/Camera.svg";
// import SecondaryBannerDefault from "../../temp/SeconderyBanner.png";
import { SecondaryBannerUploadContainer } from "./style";

interface SecondaryBannerUploadProps {
  secondaryBannerUrl?: string;
  onRefreshStore: () => Promise<void>;
}

const SecondaryBannerUpload: React.FC<SecondaryBannerUploadProps> = ({
  secondaryBannerUrl,
  onRefreshStore,
}) => {
  const [bannerUrl, setBannerUrl] = useState<string>(secondaryBannerUrl);

  const secondaryBannerUpload = useImageUpload({
    endpoint: "/store/banners/secondary",
    onSuccess: async (url) => {
      setBannerUrl(url);
      await onRefreshStore();
    },
    onError: () => {
      alert("Erro ao fazer upload do banner");
    },
  });

  const handleSave = async () => {
    if (secondaryBannerUpload.hasChanges) {
      await secondaryBannerUpload.handleSave();
    }
  };

  const handleCancel = () => {
    secondaryBannerUpload.clearSelection();
  };

  return (
    <SecondaryBannerUploadContainer>
      <div className="sectionHeader">
        <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
          BANNER INFERIOR PÁGINA HOME
        </Text>
        <Text fontName="SMALL_MEDIUM" color={Theme.colors.secondaryText}>
          A imagem deve estar no formato .png, .jpg ou .jpeg, ter uma resolução
          mínima de 1280 x 540 e uma proporção de 21:9
        </Text>
      </div>

      <div className="bannerImagePreview">
        {secondaryBannerUpload.previewUrl || bannerUrl ? (
          <Image
            src={secondaryBannerUpload.previewUrl || bannerUrl}
            alt="banner inferior"
            width={1280}
            height={540}
          />
        ) : (
          <div className="emptyBanner">
            <Text
              align="center"
              fontName="REGULAR_MEDIUM"
              color={Theme.colors.secondaryText}
            >
              Nenhuma banner será exibido
            </Text>
          </div>
        )}
      </div>

      <div className="imageActionButtons">
        <Button
          height={32}
          rounded
          leftElement={<Camera />}
          title="Atualizar imagem"
          onClick={secondaryBannerUpload.handleButtonClick}
        />
      </div>

      <input
        ref={secondaryBannerUpload.fileInputRef}
        type="file"
        accept="image/png,image/jpg,image/jpeg"
        style={{ display: "none" }}
        onChange={secondaryBannerUpload.handleFileSelect}
      />

      {secondaryBannerUpload.hasChanges && (
        <div className="saveChangesSection">
          <Button
            rounded
            height={32}
            width={140}
            title="Cancelar"
            onClick={handleCancel}
            disabled={secondaryBannerUpload.isUploading}
            isNotSelected
          />
          <Button
            rounded
            height={32}
            width={140}
            title="Salvar"
            onClick={handleSave}
            loading={secondaryBannerUpload.isUploading}
            disabled={secondaryBannerUpload.isUploading}
          />
        </div>
      )}
    </SecondaryBannerUploadContainer>
  );
};

export default SecondaryBannerUpload;
