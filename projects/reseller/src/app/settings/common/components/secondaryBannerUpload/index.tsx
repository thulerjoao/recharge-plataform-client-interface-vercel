"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { useTheme } from "styled-components";
import { useImageUpload } from "hooks/useImageUpload";
import Image from "next/image";
import React, { useState } from "react";
import Camera from "../../icons/Camera.svg";
import SecondaryBannerDefault from "../../temp/SeconderyBanner.png";
import { SecondaryBannerUploadContainer } from "./style";

interface SecondaryBannerUploadProps {
  secondaryBannerUrl: string | null;
  onRefreshStore: () => Promise<void>;
}

const SecondaryBannerUpload: React.FC<SecondaryBannerUploadProps> = ({
  secondaryBannerUrl,
  onRefreshStore,
}) => {
  const theme = useTheme();
  const [bannerUrl, setBannerUrl] = useState<string>(secondaryBannerUrl);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  const secondaryBannerUpload = useImageUpload({
    endpoint: "/store/offer-banner",
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

  const handleDelete = async () => {
    if (!bannerUrl) return;

    setIsRemoving(true);

    const confirmDelete = window.confirm(
      "Ao deletar o banner, a sessão não será exibida na loja. Deseja continuar?",
    );
    if (!confirmDelete) {
      setIsRemoving(false);
      return;
    }

    try {
      const { deleteOfferBanner } = await import("services/offerBannerService");
      await deleteOfferBanner();
      setBannerUrl(null);
      await onRefreshStore();
    } catch (error) {
      alert("Erro ao remover o banner");
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <SecondaryBannerUploadContainer>
      <div className="sectionHeader">
        <Text fontName="LARGE_SEMI_BOLD" color={theme.text_01}>
          BANNER INFERIOR PÁGINA HOME
        </Text>
        <Text fontName="SMALL_MEDIUM" color={theme.text_03}>
          A imagem deve estar no formato .png, .jpg ou .jpeg, ter uma resolução
          mínima de 1280 x 540 e uma proporção de 21:9
        </Text>
      </div>

      <div className="bannerImagePreview">
        {secondaryBannerUpload.previewUrl || secondaryBannerUrl ? (
          <div className="bannerImageWrapper">
            <Image
              src={secondaryBannerUpload.previewUrl || secondaryBannerUrl}
              alt="banner inferior"
              fill
              className="bannerImage"
            />
          </div>
        ) : (
          <div className="emptyBanner">
            <Text
              align="center"
              fontName="REGULAR_MEDIUM"
              color={theme.text_03}
            >
              Nenhum banner será exibido
            </Text>
          </div>
        )}
      </div>
      <input
        ref={secondaryBannerUpload.fileInputRef}
        type="file"
        accept="image/png,image/jpg,image/jpeg"
        style={{ display: "none" }}
        onChange={secondaryBannerUpload.handleFileSelect}
      />

      {secondaryBannerUpload.hasChanges ? (
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
      ) : (
        <div className="saveChangesSection">
          {bannerUrl && (
            <Button
              rounded
              height={32}
              width={140}
              title="Remover"
              onClick={handleDelete}
              loading={isRemoving}
              disabled={isRemoving}
            />
          )}
          <Button
            rounded
            height={32}
            width={140}
            leftElement={<Camera />}
            title={bannerUrl ? "Atualizar" : "Adicionar"}
            onClick={secondaryBannerUpload.handleButtonClick}
            disabled={isRemoving}
          />
        </div>
      )}
    </SecondaryBannerUploadContainer>
  );
};

export default SecondaryBannerUpload;
