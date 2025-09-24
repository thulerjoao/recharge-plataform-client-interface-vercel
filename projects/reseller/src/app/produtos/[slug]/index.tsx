/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "context/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PackageCard from "public/cards/packageCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useState } from "react";
import { PackageType, ProductType } from "types/productTypes";
import { apiUrl } from "utils/apiUrl";
import CameraIcon from "../common/icons/CameraIcon.svg";
import Pen from "../common/icons/Pen.svg";
import { ProductsInnerPage } from "./style";
import { usePackages } from "context/packages";

type Props = {
  slug: string;
};

const Productpage = ({ slug }: Props) => {
  const route = useRouter();
  const { store } = useAuth();
  const { productPackages, setProductPackages } = usePackages();

  // const [product, setProducts] = useState<ProductType>();
  const [description, setDescription] = useState<string>();
  const [instructions, setInstructions] = useState<string>();
  const [imgBannerUrl, setImgBannerUrl] = useState<string>();
  const [imgCardUrl, setImgCardUrl] = useState<string>();

  const [ischanged, setIsChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handlePackageClick = (slug: string, packag: PackageType) => {
    route.push(`/produtos/${slug}/${packag.id}`);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      connectionAPIGet(`/product/${slug}?storeId=${store.id}`, apiUrl)
        .then((res) => {
          setProductPackages(res as ProductType);
        })
        .catch((err) => {
          console.log("err", err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    if (!productPackages) {
      return;
    }
    setDescription(
      productPackages.storeCustomization !== null
        ? productPackages.storeCustomization.description
        : productPackages.description,
    );
    setInstructions(
      productPackages.storeCustomization !== null
        ? productPackages.storeCustomization.instructions
        : productPackages.instructions,
    );
    setImgBannerUrl(
      productPackages.storeCustomization !== null
        ? productPackages.storeCustomization.imgBannerUrl
        : productPackages.imgBannerUrl,
    );
    setImgCardUrl(
      productPackages.storeCustomization !== null
        ? productPackages.storeCustomization.imgCardUrl
        : productPackages.imgCardUrl,
    );
  }, [productPackages]);

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
          <Text
            tag="h3"
            align="end"
            underline
            fontName="REGULAR"
            color={Theme.colors.refused}
          >
            Desativar Produto
          </Text>
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
            {productPackages?.packages?.map((packag: PackageType) => {
              return (
                <div
                  key={packag.id}
                  onClick={() => handlePackageClick(slug, packag)}
                  className="cardEnviroment"
                >
                  <PackageCard
                    bestOffer={packag.isOffer}
                    title={`${productPackages?.name} ${packag.amountCredits}`}
                    imageUrl={packag.imgCardUrl}
                    price={packag.paymentMethods[0].price}
                  />
                </div>
              );
            })}
          </section>
        </div>

        <section className="bannerImages">
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
              src={imgBannerUrl}
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
            <Image
              src={imgCardUrl}
              alt="Imagem de card"
              width={720}
              height={720}
            />
            <Button
              leftElement={<CameraIcon />}
              rounded
              margin="24px 0 0 0"
              height={32}
              width={181}
              title="Atualizar imagem"
            />
          </div>
        </section>

        <section className="descriptions">
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
        </section>

        <div className="saveButtonContainer">
          <Button
            rounded
            isNotSelected={!ischanged}
            disabled={!ischanged}
            height={40}
            width={197}
            title="Salvar alterações"
          />
        </div>
      </div>
    </ProductsInnerPage>
  );
};

export default Productpage;
