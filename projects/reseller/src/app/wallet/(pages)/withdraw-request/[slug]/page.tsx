"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useState } from "react";
import Close from "../icons/Close.svg";
import Pix from "../icons/Pix.svg";
import Withdraw from "../icons/Withdraw.svg";
import receipt from "../temp/receipt.png";
import { ReceiptModal, SalesInnerPage } from "./style";

type Props = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: Props) => {
  // const { device } = useDevice();
  const [showReceipt, setShowReceipt] = useState<boolean>(false);

  return (
    <SalesInnerPage>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="SOLICITAÇÃO DE SAQUE" />
        </HeaderEnviroment>
      </div>
      <div className="mobile">
        <DefaultHeader backWard title="SOLICITAÇÃO DE SAQUE" />
      </div>
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
          <span onClick={() => setShowReceipt(true)} className="imageContainer">
            <Image src={receipt} alt="recibo de pagamento" />
          </span>
        </section>
      </main>
      {showReceipt && (
        <ReceiptModal onClick={() => setShowReceipt(false)}>
          <div>
            <Image
              onClick={(e) => e.stopPropagation()}
              src={receipt}
              alt="recibo de pagamento"
            />
            <span className="close">
              <Close />
            </span>
          </div>
        </ReceiptModal>
      )}
    </SalesInnerPage>
  );
};

export default Page;
