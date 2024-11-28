"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useDevice } from "context/deviceContext";
import Image from "next/image";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useState } from "react";
import Pix from "../icons/Pix.svg";
import Withdraw from "../icons/Withdraw.svg";
import receipt from "../temp/receipt.png";
import { SalesInnerPage } from "./style";

type Props = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: Props) => {
  const { device } = useDevice();
  const [showReceipt, setShowReceipt] = useState<boolean>(true);

  return (
    <SalesInnerPage>
      {(device === "desktop" || device === "tablet") && (
        <HeaderEnviroment>
          <DefaultHeader backWard title="SOLICITAÇÃO DE SAQUE" />
        </HeaderEnviroment>
      )}
      {device === "mobile" && (
        <DefaultHeader backWard title="SOLICITAÇÃO DE SAQUE" />
      )}
      <main>
        <section className="topContainer">
          <div className="topValue">
            <span>
              <Withdraw />
            </span>
            <div>
              <Text align="end" fontName="REGULAR_SEMI_BOLD">
                R$ 10.000,00
              </Text>
              <Text
                align="end"
                color={Theme.colors.secondaryText}
                fontName="TINY"
              >
                10/10/2024, 11:23
              </Text>
            </div>
          </div>

          <div className="orderParams">
            <Text fontName="SMALL_MEDIUM">Número da solicitação</Text>
            <Text align="end" fontName="SMALL_MEDIUM">
              4321-12345
            </Text>
          </div>
          <div className="orderParams">
            <Text fontName="SMALL_MEDIUM">Saldo para estoque na data</Text>
            <Text align="end" fontName="SMALL_MEDIUM">
              R$ 30.000,00
            </Text>
          </div>
          <div className="orderParams">
            <Text fontName="SMALL_MEDIUM">
              Valor disponível para saque na data
            </Text>
            <Text align="end" fontName="SMALL_MEDIUM">
              R$ 15.000,00
            </Text>
          </div>
          <div className="orderParams">
            <Text fontName="SMALL_MEDIUM">Valor total na carteira na data</Text>
            <Text align="end" fontName="SMALL_MEDIUM">
              R$ 50.000,00
            </Text>
          </div>
        </section>
        <section className="mediumContainer">
          <Text fontName="REGULAR_MEDIUM">Detalhes do pagamento</Text>
          <div className="paymentSpecs">
            <span>
              <Pix />
            </span>
            <div className="paymentSpecsText">
              <Text fontName="SMALL_MEDIUM">Chave Pix: 12.122.122/0001-12</Text>
              <Text color={Theme.colors.approved} fontName="TINY">
                Pagamento concluído
              </Text>
            </div>
            <div className="paymentSpecsText">
              <Text align="end" fontName="SMALL_SEMI_BOLD">
                R$ 10.000,00
              </Text>
              <Text
                align="end"
                color={Theme.colors.secondaryText}
                fontName="TINY"
              >
                11/10/2024, 11:25
              </Text>
            </div>
          </div>
        </section>
        <section className="bottomContainer">
          <Text fontName="REGULAR_MEDIUM">Comprovante de pagamento</Text>
          <span className="imageContainer">
            <Image src={receipt} alt="recibo de pagamento" />
          </span>
        </section>
      </main>
      {/* {showReceipt && (
        <div className="receiptModal">
          <span className="mainContent">
            <Image src={receipt} alt="recibo de pagamento" />
          </span>
        </div>
      )} */}
    </SalesInnerPage>
  );
};

export default Page;
