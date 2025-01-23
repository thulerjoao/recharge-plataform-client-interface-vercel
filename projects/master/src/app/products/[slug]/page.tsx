"use client";

import Text from "@4miga/design-system/components/Text";
import { useDevice } from "context/deviceContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PackageCard from "public/cards/packageCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useState } from "react";
import BigoBanner from "../common/temp/BigoBanner.png";
import BigoCard1 from "../common/temp/BigoCard.png";
import BigoCard from "../common/temp/bigoCard.svg";
import { ProductsInnerPage } from "./style";

type Props = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: Props) => {
  const route = useRouter();
  const initialProduct =
    "Lorem ipsum dolor sit amet consectetur. Egestas egestas nec elementum eleifend ac. Enim enim sit morbi pulvinar velit dictum venenatis erat. Vitae mi eget donec nisl id.\n\nNulla suspendisse ut quis lorem sit vivamus adipiscing lobortis id.";
  const initialInstructions =
    "Lorem ipsum dolor sit amet consectetur. Egestas egestas nec elementum eleifend ac. Enim enim sit morbi pulvinar velit dictum venenatis erat. Vitae mi eget donec nisl id. \n\nNulla suspendisse ut quis lorem sit vivamus adipiscing lobortis id. At vitae velit lectus non felis. Id molestie venenatis mi sed amet nunc. Mattis lectus dis urna massa vitae duis. Phasellus varius mauris morbi sit leo parturient.";
  const [aboutProduct, setAboutProduct] = useState<string>(initialProduct);
  const [instructions, setInstructions] = useState<string>(initialInstructions);
  const [ischanged, setIsChanged] = useState<boolean>(false);
  const { device } = useDevice();

  useEffect(() => {
    if (
      aboutProduct !== initialProduct ||
      instructions !== initialInstructions
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [aboutProduct, instructions]);

  return (
    <ProductsInnerPage>
      {(device === "desktop" || device === "tablet") && (
        <HeaderEnviroment>
          <DefaultHeader backWard title="CONFIGURAR PRODUTOS" />
        </HeaderEnviroment>
      )}
      {device === "mobile" && (
        <DefaultHeader backWard title="CONFIGURAR PRODUTOS" />
      )}
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
          <div
            onClick={() => route.push(`/products/${params.slug}/731263932`)}
            className="cardEnviroment"
          >
            <PackageCard
              bestOffer
              title="BIGO 30"
              image={<BigoCard />}
              price={3.9}
            />
          </div>
          <div
            onClick={() => route.push(`/products/${params.slug}/731263932`)}
            className="cardEnviroment"
          >
            <PackageCard
              bestOffer
              title="BIGO 100"
              image={<BigoCard />}
              price={6.9}
            />
          </div>
          <div
            onClick={() => route.push(`/products/${params.slug}/731263932`)}
            className="cardEnviroment"
          >
            <PackageCard title="BIGO 300" image={<BigoCard />} price={9.9} />
          </div>
          <div
            onClick={() => route.push(`/products/${params.slug}/731263932`)}
            className="cardEnviroment"
          >
            <PackageCard title="BIGO 500" image={<BigoCard />} price={14.9} />
          </div>
          <div
            onClick={() => route.push(`/products/${params.slug}/731263932`)}
            className="cardEnviroment"
          >
            <PackageCard title="BIGO 1000" image={<BigoCard />} price={24.9} />
          </div>
          <div
            onClick={() => route.push(`/products/${params.slug}/731263932`)}
            className="cardEnviroment"
          >
            <PackageCard
              bestOffer
              title="BIGO 5000"
              image={<BigoCard />}
              price={89.9}
            />
          </div>
          <div
            onClick={() => route.push(`/products/${params.slug}/731263932`)}
            className="cardEnviroment"
          >
            <PackageCard title="BIGO 300" image={<BigoCard />} price={9.9} />
          </div>
          <div
            onClick={() => route.push(`/products/${params.slug}/731263932`)}
            className="cardEnviroment"
          >
            <PackageCard title="BIGO 500" image={<BigoCard />} price={14.9} />
          </div>
          <div
            onClick={() => route.push(`/products/${params.slug}/731263932`)}
            className="cardEnviroment"
          >
            <PackageCard title="BIGO 1000" image={<BigoCard />} price={24.9} />
          </div>
          <div
            onClick={() => route.push(`/products/${params.slug}/731263932`)}
            className="cardEnviroment"
          >
            <PackageCard
              bestOffer
              title="BIGO 5000"
              image={<BigoCard />}
              price={89.9}
            />
          </div>
        </section>
        <section className="bannerImages">
          <div className="centerComponent">
            <div className="leftContainer">
              <Text
                margin="0PX 0 16px 0"
                align="center"
                fontName="REGULAR_SEMI_BOLD"
              >
                IMAGEM DO BANNER DO PRODUTO
              </Text>

              <Image src={BigoBanner} alt="Imagem de banner" />
            </div>
            <div className="rightContainer">
              <Text
                margin="0PX 0 16px 0"
                align="center"
                fontName="REGULAR_SEMI_BOLD"
              >
                IMAGEM DO CARD
              </Text>

              <Image src={BigoCard1} alt="Imagem de card" />
            </div>
          </div>
        </section>
        <section className="descriptions">
          <div className="leftContainer">
            <Text fontName="REGULAR_SEMI_BOLD">SOBRE BIGO LIVE</Text>
            <textarea
              value={aboutProduct}
              onChange={(e) => setAboutProduct(e.target.value)}
              placeholder="Descrição do jogo ou plataforma..."
            />
          </div>
          <div className="rightContainer">
            <Text fontName="REGULAR_SEMI_BOLD">INSTRUÇÕES</Text>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Intruções de recarga..."
            />
          </div>
        </section>
      </main>
    </ProductsInnerPage>
  );
};

export default Page;

// example of use with \n
// <div className="tutorial-output" style={{ whiteSpace: "pre-wrap" }}>
//   {tutorialText}
// </div>
