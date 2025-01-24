"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useDevice } from "context/deviceContext";
import Image from "next/image";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import Copy from "./icons/Copy.svg";
import Bigo from "./icons/Bigo.png";
import { ManualRechargeInnerPage } from "./style";
type Props = {
  params: {
    slug: string;
  };
};
const Page = ({ params }: Props) => {
  const { device } = useDevice();

  return (
    <ManualRechargeInnerPage>
      {(device === "desktop" || device === "tablet") && (
        <HeaderEnviroment>
          <DefaultHeader backWard title="RECARGA" />
        </HeaderEnviroment>
      )}
      {device === "mobile" && <DefaultHeader backWard title="RECARGA" />}
      <Text margin="24px 0 0 0" align="center" fontName="LARGE_MEDIUM">
        BIGO LIVE
      </Text>
      <main>
        <section className="top">
          <Image src={Bigo} alt="imagem do pacote" />
          <div className="packageInfo">
            <Text align="end" fontName="REGULAR_MEDIUM">
              Bigo 3.000 diamantes
            </Text>
            <Text
              margin="8px 0 0 0"
              color={Theme.colors.secondaryText}
              align="end"
              fontName="TINY"
            >
              Bigo 3.000 diamantes
            </Text>
          </div>
        </section>
        <section className="copyArea">
          <div className="title">
            <Text fontName="SMALL_MEDIUM">ID do usuário</Text>
            <Text align="end" fontName="SMALL_SEMI_BOLD">
              {params.slug}
            </Text>
          </div>
          <div className="newButton">
            <span>
              <Copy />
              <Text margin="0 0 0 8px" fontName="SMALL_SEMI_BOLD">
                Quantidade de Diamantes
              </Text>
            </span>
          </div>
        </section>
        <section className="copyArea">
          <div className="title">
            <Text fontName="SMALL_MEDIUM">ID do usuário</Text>
            <Text align="end" fontName="SMALL_SEMI_BOLD">
              3.000
            </Text>
          </div>
          <div className="newButton">
            <span>
              <Copy />
              <Text margin="0 0 0 8px" fontName="SMALL_SEMI_BOLD">
                Copiar Qt. de Diamantes
              </Text>
            </span>
          </div>
        </section>
        <span className="confirmButton">
          <Button
            margin="24px 0 0 0"
            height={40}
            title="Confirmar Recarga"
            rounded
          />
        </span>
        <span className="seeMore">
          <Text underline color={Theme.colors.secondaryText} fontName="SMALL">
            ver detalhes
          </Text>
        </span>
      </main>
    </ManualRechargeInnerPage>
  );
};

export default Page;
