"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import Image from "next/image";
import PackageCard from "public/cards/packageCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import CameraIcon from "../common/icons/CameraIcon.svg";
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
  return (
    <ProductsInnerPage>
      <HeaderEnviroment>
        <DefaultHeader backWard title="CONFIGURAR PRODUTO" />
      </HeaderEnviroment>
      <main>
        <div className="topContainer">
          <Text fontName="LARGE_MEDIUM">BIGO LIVE</Text>
          <Text align="end" underline fontName="REGULAR">
            Desativar Produto
          </Text>
        </div>
        <Text margin="24px 0 0 0" align="center" fontName="REGULAR_SEMI_BOLD">
          CONFIGURAR PACOTES
        </Text>
        <section className="cardsContainer">
          <div className="cardEnviroment">
            <PackageCard
              bestOffer
              title="BIGO 30"
              image={<BigoCard />}
              price={3.9}
            />
          </div>
          <div className="cardEnviroment">
            <PackageCard
              bestOffer
              title="BIGO 100"
              image={<BigoCard />}
              price={6.9}
            />
          </div>
          <div className="cardEnviroment">
            <PackageCard title="BIGO 300" image={<BigoCard />} price={9.9} />
          </div>
          <div className="cardEnviroment">
            <PackageCard title="BIGO 500" image={<BigoCard />} price={14.9} />
          </div>
          <div className="cardEnviroment">
            <PackageCard title="BIGO 1000" image={<BigoCard />} price={24.9} />
          </div>
          <div className="cardEnviroment">
            <PackageCard
              bestOffer
              title="BIGO 5000"
              image={<BigoCard />}
              price={89.9}
            />
          </div>
          <div className="cardEnviroment">
            <PackageCard title="BIGO 300" image={<BigoCard />} price={9.9} />
          </div>
          <div className="cardEnviroment">
            <PackageCard title="BIGO 500" image={<BigoCard />} price={14.9} />
          </div>
          <div className="cardEnviroment">
            <PackageCard title="BIGO 1000" image={<BigoCard />} price={24.9} />
          </div>
          <div className="cardEnviroment">
            <PackageCard
              bestOffer
              title="BIGO 5000"
              image={<BigoCard />}
              price={89.9}
            />
          </div>
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
            <Image src={BigoBanner} alt="Imagem de banner" />
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
            <Image src={BigoCard1} alt="Imagem de card" />
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
      </main>
    </ProductsInnerPage>
  );
};

export default Page;
