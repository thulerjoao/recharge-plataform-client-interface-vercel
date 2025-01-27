"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useDevice } from "context/deviceContext";
import Image from "next/image";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useState } from "react";
import ConfirmModal from "./confirmModal";
import Bigo from "./icons/Bigo.png";
import Copy from "./icons/Copy.svg";
import { ManualRechargeInnerPage } from "./style";
import { useRouter } from "next/navigation";
type Props = {
  params: {
    slug: string;
  };
};
const Page = ({ params }: Props) => {
  const { device } = useDevice();
  const [openmodal, setOpenModal] = useState<boolean>(false);
  const route = useRouter();
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
            onClick={() => setOpenModal(true)}
            margin="24px 0 0 0"
            height={40}
            title="Confirmar Recarga"
            rounded
          />
        </span>
        <span className="seeMore">
          <Text
            onClick={() => route.push(`/recharge/${params.slug}/details`)}
            underline
            color={Theme.colors.secondaryText}
            fontName="SMALL"
          >
            ver detalhes
          </Text>
        </span>
      </main>
      {openmodal && <ConfirmModal setconfirmModal={setOpenModal} />}
    </ManualRechargeInnerPage>
  );
};

export default Page;
