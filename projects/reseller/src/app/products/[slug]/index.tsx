"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";

import { connectionAPIPatch } from "@4miga/services/connectionAPI/connection";
import { apiUrl } from "@4miga/services/connectionAPI/url";
import { useAuth } from "context/auth";
import { useProducts } from "context/products";
import { useImageUpload } from "hooks/useImageUpload";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PackageCard from "public/cards/packageCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useState } from "react";
import { PackageType, ProductType } from "types/productTypes";
import CameraIcon from "../common/icons/CameraIcon.svg";
import Pen from "../common/icons/Pen.svg";
import AddIcon from "./AddIcon.svg";
import { ProductsInnerPage } from "./style";
import LoadingPage from "app/loading";

type Props = {
  slug: string;
};

const Productpage = ({ slug }: Props) => {
  const route = useRouter();
  const { products, productPackages, fetchProducts, setProductPackages } =
    useProducts();
  const { store } = useAuth();

  const [description, setDescription] = useState<string>();
  const [instructions, setInstructions] = useState<string>();
  const [imgBannerUrl, setImgBannerUrl] = useState<string>();
  const [imgCardUrl, setImgCardUrl] = useState<string>();
  const [ischanged, setIsChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const initialDescription =
    productPackages?.storeCustomization?.description ||
    productPackages?.description;
  const initialInstructions =
    productPackages?.storeCustomization?.instructions ||
    productPackages?.instructions;

  useEffect(() => {
    setProductPackages(
      products.find((product: ProductType) => product.id === slug),
    );
    setLoading(false);
  }, [products, slug]);

  const bannerUpload = useImageUpload({
    endpoint: `/product/${slug}/images/banner`,
    onSuccess: (url) => {
      setImgBannerUrl(url);
      fetchProducts(store.id);
    },
    onError: (error) => {
      console.error("Banner upload error:", error);
      alert("Erro ao carregar a imagem do banner. Tente novamente.");
    },
  });

  const cardUpload = useImageUpload({
    endpoint: `/product/${slug}/images/card`,
    onSuccess: (url) => {
      setImgCardUrl(url);
      fetchProducts(store.id);
    },
    onError: (error) => {
      console.error("Card upload error:", error);
      alert("Erro ao carregar a imagem do pacote. Tente novamente.");
    },
  });

  // Update ischanged when card has changes
  useEffect(() => {
    if (
      cardUpload.hasChanges ||
      bannerUpload.hasChanges ||
      description !== initialDescription ||
      instructions !== initialInstructions
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [
    cardUpload.hasChanges,
    bannerUpload.hasChanges,
    description,
    instructions,
  ]);

  // Function to save changes
  const handleSaveChanges = async () => {
    if (!ischanged) return;
    setLoading(true);
    try {
      // Upload images if files are selected
      if (bannerUpload.hasChanges) {
        await bannerUpload.handleSave();
      }

      if (cardUpload.hasChanges) {
        await cardUpload.handleSave();
      }

      if (
        description !== initialDescription ||
        instructions !== initialInstructions
      ) {
        await connectionAPIPatch(
          `products/customize/${slug}`,
          {
            description,
            instructions,
          },
          apiUrl,
        )
          .then(() => {
            fetchProducts(store.id);
            alert("Alterações salvas com sucesso");
          })
          .catch((error) => {
            alert("Erro ao salvar as alterações. Tente novamente.");
            handleCancel();
          });
      }

      setIsChanged(false);
    } catch (error) {
      alert("Erro ao salvar as alterações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleProductPackages = () => {
    if (productPackages.storeCustomization === null) {
      setDescription(productPackages.description);
      setInstructions(productPackages.instructions);
      setImgBannerUrl(productPackages.imgBannerUrl);
      setImgCardUrl(productPackages.imgCardUrl);
    } else {
      setDescription(
        productPackages.storeCustomization?.description !== null &&
          productPackages.storeCustomization.description,
      );
      setInstructions(
        productPackages.storeCustomization?.instructions !== null &&
          productPackages.storeCustomization.instructions,
      );
      setImgBannerUrl(
        productPackages.storeCustomization?.imgBannerUrl !== null &&
          productPackages.storeCustomization.imgBannerUrl,
      );
      setImgCardUrl(
        productPackages.storeCustomization?.imgCardUrl !== null &&
          productPackages.storeCustomization.imgCardUrl,
      );
    }
  };

  useEffect(() => {
    if (!productPackages) {
      return;
    }
    handleProductPackages();
  }, [productPackages]);

  const handlePackageClick = (packag: PackageType) => {
    route.push(`/products/${slug}/${packag.id}`);
  };

  const handleCancel = () => {
    cardUpload.clearSelection();
    bannerUpload.clearSelection();
    handleProductPackages();
    setIsChanged(false);
  };

  const handleAddPackage = () => {
    route.push(`/products/${slug}/novo_pacote`);
  };

  if (!productPackages) {
    return <LoadingPage />;
  }

  return (
    <ProductsInnerPage>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="CONFIGURAR PRODUTOS" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          CONFIGURAR PRODUTOS
        </Text>
      </div>

      <div className="mainContentComponent">
        <div className="headerSection">
          <div className="titleSection">
            <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
              {productPackages?.name || "BIGO LIVE"}
            </Text>
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.secondaryText}>
              Configure pacotes e informações do produto
            </Text>
          </div>
          {/* <Text
            tag="h3"
            align="end"
            underline
            fontName="REGULAR"
            color={Theme.colors.refused}
          >
            Desativar Produto
          </Text> */}
        </div>

        <div className="packagesSection">
          <Text
            align="center"
            fontName="REGULAR_SEMI_BOLD"
            color={Theme.colors.mainlight}
          >
            CONFIGURAR PACOTES
          </Text>
          <section className="cardsContainer">
            <div className="cardEnviroment" onClick={() => handleAddPackage()}>
              <div className="addPackageCard">
                <AddIcon />
                <Text
                  align="center"
                  fontName="REGULAR_SEMI_BOLD"
                  color={Theme.colors.mainlight}
                >
                  Adicionar Pacote
                </Text>
              </div>
            </div>
            {productPackages?.packages?.map((packag: PackageType) => {
              return (
                console.log(packag),
                (
                  <div
                    key={packag.id}
                    onClick={() => handlePackageClick(packag)}
                    className="cardEnviroment"
                  >
                    <PackageCard
                      bestOffer={packag.isOffer}
                      title={`${packag.name}`}
                      imageUrl={packag.imgCardUrl}
                      price={packag.paymentMethods[0].price}
                    />
                  </div>
                )
              );
            })}
          </section>
        </div>

        <section className="productEditor">
          <div className="bannerImages">
            <div className="leftContainer">
              <Text
                align="center"
                fontName="REGULAR_SEMI_BOLD"
                color={Theme.colors.mainlight}
              >
                IMAGEM DO BANNER DO PRODUTO
              </Text>
              <Text
                margin="16PX 0 16px 0"
                align="center"
                fontName="TINY_MEDIUM"
                color={Theme.colors.secondaryText}
              >
                A imagem deve estar no formato .png, .jpg ou .jpeg, ter uma
                resolução mínima de 1280 x 540 e uma proporção de 21:9
              </Text>
              <Image
                src={bannerUpload.previewUrl || imgBannerUrl}
                alt="Imagem de banner"
                width={1280}
                height={540}
              />
              <Button
                leftElement={<CameraIcon />}
                rounded
                margin="24px 0 0 0"
                height={32}
                width={181}
                title="Atualizar imagem"
                onClick={bannerUpload.handleButtonClick}
              />
              <input
                ref={bannerUpload.fileInputRef}
                type="file"
                accept="image/png,image/jpg,image/jpeg"
                style={{ display: "none" }}
                onChange={bannerUpload.handleFileSelect}
              />
            </div>

            <div className="rightContainer">
              <Text
                align="center"
                fontName="REGULAR_SEMI_BOLD"
                color={Theme.colors.mainlight}
              >
                IMAGEM DO CARD
              </Text>
              <Text
                margin="16PX 0 16px 0"
                align="center"
                fontName="TINY_MEDIUM"
                color={Theme.colors.secondaryText}
              >
                A imagem deve estar no formato .png, .jpg ou .jpeg, ter uma
                resolução mínima de 720 x 720 e uma proporção de 1:1
              </Text>
              <div className="cardImageBox">
                <Image
                  src={cardUpload.previewUrl || imgCardUrl}
                  alt="Imagem de card"
                  width={720}
                  height={720}
                />
              </div>
              <Button
                leftElement={<CameraIcon />}
                rounded
                margin="24px 0 0 0"
                height={32}
                width={181}
                title="Atualizar imagem"
                onClick={cardUpload.handleButtonClick}
              />
              <input
                ref={cardUpload.fileInputRef}
                type="file"
                accept="image/png,image/jpg,image/jpeg"
                style={{ display: "none" }}
                onChange={cardUpload.handleFileSelect}
              />
            </div>
          </div>
          <div className="descriptions">
            <div className="leftContainer">
              <span className="pen">
                <Pen />
              </span>
              <Text fontName="REGULAR_SEMI_BOLD" color={Theme.colors.mainlight}>
                SOBRE {productPackages?.name || "BIGO LIVE"}
              </Text>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do jogo ou plataforma..."
              />
            </div>
            <div className="rightContainer">
              <span className="pen">
                <Pen />
              </span>
              <Text fontName="REGULAR_SEMI_BOLD" color={Theme.colors.mainlight}>
                INSTRUÇÕES
              </Text>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Intruções de recarga..."
              />
            </div>
          </div>
        </section>
        <div className="saveButtonContainer">
          <Button
            rounded
            isNotSelected={!ischanged}
            disabled={
              !ischanged || bannerUpload.isUploading || cardUpload.isUploading
            }
            height={40}
            width={197}
            title={
              bannerUpload.isUploading || cardUpload.isUploading
                ? "Salvando..."
                : "Salvar"
            }
            onClick={handleSaveChanges}
          />
          <Button
            rounded
            disabled={loading}
            isNotSelected={!ischanged}
            title="Cancelar"
            onClick={() => handleCancel()}
            height={40}
            width={197}
          />
        </div>
      </div>
    </ProductsInnerPage>
  );
};

export default Productpage;
