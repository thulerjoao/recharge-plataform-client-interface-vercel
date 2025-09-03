import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { useProducts } from "context/products/ProductsProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PackageCard from "public/cards/packageCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useState } from "react";
import { PackageType, ProductType } from "types/productTypes";
import { formatString } from "utils/formatString";
import CameraIcon from "../common/icons/CameraIcon.svg";
import Pen from "../common/icons/Pen.svg";
import { ProductsInnerPage } from "./style";

type Props = {
  slug: string;
};

const Productpage = ({ slug }: Props) => {
  const route = useRouter();
  const products = useProducts();
  const product = products.find(
    (product: ProductType) => formatString(product.name) === slug,
  );
  const initialdescription = product.description;
  const initialInstructions = product.instructions;
  const [descriptionProduct, setdescriptionProduct] =
    useState<string>(initialdescription);
  const [instructions, setInstructions] = useState<string>(initialInstructions);
  const [ischanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    if (
      descriptionProduct !== initialdescription ||
      instructions !== initialInstructions
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [
    descriptionProduct,
    initialdescription,
    initialInstructions,
    instructions,
  ]);

  const handlePackageClick = (slug: string, packag: PackageType) => {
    sessionStorage.setItem("CurrentPackage", JSON.stringify(packag));
    route.push(`/products/${slug}/${packag.id}`);
  };

  return (
    <ProductsInnerPage>
      <div className="desktop tablet">
        <HeaderEnviroment>
          <DefaultHeader backWard title="CONFIGURAR PRODUTOS" />
        </HeaderEnviroment>
      </div>
      <div className="mobile">
        <DefaultHeader backWard title="CONFIGURAR PRODUTOS" />
      </div>
      <main>
        <div className="topContainer">
          <Text fontName="LARGE_MEDIUM">BIGO LIVE</Text>
          <Text tag="h3" align="end" underline fontName="REGULAR">
            Desativar Produto
          </Text>
        </div>
        <Text margin="24px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
          CONFIGURAR PACOTES
        </Text>
        <section className="cardsContainer">
          {product.packages.map((packag: PackageType) => {
            console.log(packag);
            return (
              <div
                key={packag.id}
                onClick={() => handlePackageClick(slug, packag)}
                className="cardEnviroment"
              >
                <PackageCard
                  bestOffer={packag.isOffer}
                  title={`${product.name} ${packag.amountCredits}`}
                  imageUrl={packag.imgCardUrl}
                  price={packag.paymentMethods[0].price}
                />
              </div>
            );
          })}
        </section>
        <section className="bannerImages">
          <div className="leftContainer">
            <Text align="center" fontName="REGULAR_SEMI_BOLD">
              IMAGEM DO BANNER DO PRODUTO
            </Text>
            <Text margin="16PX 0 16px 0" align="center" fontName="TINY_MEDIUM">
              A imagem deve estar no formato .png, .jpg ou .jpeg, ter uma
              resolução mínima de 1280 x 540 e uma proporção de 21:9
            </Text>
            <Image
              src={product.imgBannerUrl}
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
            <Text align="center" fontName="REGULAR_SEMI_BOLD">
              IMAGEM DO CARD
            </Text>
            <Text margin="16PX 0 16px 0" align="center" fontName="TINY_MEDIUM">
              A imagem deve estar no formato .png, .jpg ou .jpeg, ter uma
              resolução mínima de 720 x 720 e uma proporção de 1:1
            </Text>
            <Image
              src={product.imgCardUrl}
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
            <Text fontName="REGULAR_SEMI_BOLD">SOBRE BIGO LIVE</Text>
            <textarea
              value={descriptionProduct}
              onChange={(e) => setdescriptionProduct(e.target.value)}
              placeholder="Descrição do jogo ou plataforma..."
            />
          </div>
          <div className="rightContainer">
            <span className="pen">
              <Pen />
            </span>
            <Text fontName="REGULAR_SEMI_BOLD">INSTRUÇÕES</Text>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Intruções de recarga..."
            />
          </div>
        </section>
        <Button
          rounded
          isNotSelected={!ischanged}
          disabled={!ischanged}
          margin="8px 0 72px 0"
          height={40}
          width={197}
          title="Salvar alterações"
        />
      </main>
    </ProductsInnerPage>
  );
};

export default Productpage;
