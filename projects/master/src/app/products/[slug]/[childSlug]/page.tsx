"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import OnOff from "@4miga/design-system/components/onOff";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useDevice } from "context/deviceContext";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useState } from "react";
import CameraIcon from "../../common/icons/CameraIcon.svg";
import Pen from "../../common/icons/Pen.svg";
import BigoCard from "../../common/temp/bigoCard.svg";
import ConfirmModal from "./common/confirmModal";
import Ame from "./common/icons/Ame.svg";
import Boleto from "./common/icons/Boleto.svg";
import MercadoPago from "./common/icons/MercadoPago.svg";
import PayPal from "./common/icons/PayPal.svg";
import PicPay from "./common/icons/PicPay.svg";
import Pix from "./common/icons/Pix.svg";
import Transfer from "./common/icons/Transfer.svg";
import PriceCard from "./common/priceCard";
import PriceCardMobile from "./common/priceCardMobile";
import { ConfigPackagePage } from "./style";

type Props = {
  params: {
    slug: string;
    childSlug: string;
  };
};

const Page = ({ params }: Props) => {
  const [confirmModal, setconfirmModal] = useState<boolean>(false);
  const { device } = useDevice();

  return (
    <ConfigPackagePage>
      {confirmModal && <ConfirmModal setconfirmModal={setconfirmModal} />}
      {(device === "desktop" || device === "tablet") && (
        <HeaderEnviroment>
          <DefaultHeader backWard title="CONFIGURAR PACOTE" />
        </HeaderEnviroment>
      )}
      {device === "mobile" && (
        <DefaultHeader backWard title="CONFIGURAR PACOTE" />
      )}
      <main>
        <div className="topContainer">
          <Text fontName="LARGE_MEDIUM">BIGO LIVE</Text>
          <Text tag="h3" align="end" underline fontName="REGULAR">
            Desativar Pacote
          </Text>
        </div>
        <section className="packageSettings">
          <div className="leftContainer">
            <span className="pen">
              <Pen />
            </span>
            <Text fontName="REGULAR_SEMI_BOLD">NOME DO PACOTE</Text>
            <Input margin="16px 0 0 0" height={53} />
            <div className="bottomLeftContainer">
              <Text nowrap fontName="REGULAR_SEMI_BOLD">
                QUANTIDADE DE CRÉDITOS:
              </Text>
              <Text
                align="end"
                color={Theme.colors.mainHighlight}
                fontName="REGULAR_SEMI_BOLD"
              >
                30
              </Text>
            </div>
            <div className="bottomLeftContainer">
              <Text nowrap fontName="REGULAR_SEMI_BOLD">
                DEFINIR COMO OFERTA:
              </Text>
              <OnOff onOff={true} />
            </div>
          </div>
          <div className="rightContainer">
            <Text align="center" fontName="REGULAR_SEMI_BOLD">
              IMAGEM DO PACOTE
            </Text>
            <Text margin="16px 0 0 0" align="center" fontName="TINY_MEDIUM">
              A imagem deve estar no formato .png, .jpg ou .jpeg, ter uma
              resolução mínima de 480 x 480 e uma proporção de 1:1
            </Text>
            <span className="packageImage">
              <BigoCard />
            </span>
            <Button
              leftElement={<CameraIcon />}
              rounded
              margin="16px 0 0 0"
              height={32}
              width={181}
              title="Atualizar imagem"
            />
          </div>
        </section>
        <section className="packageValues">
          <div className="topText">
            <Text nowrap={device !== "mobile"} fontName="REGULAR_SEMI_BOLD">
              CONFIGURAÇÕES DE PREÇO
            </Text>
            <div>
              <Text
                nowrap={device !== "mobile"}
                color={Theme.colors.secondaryTextAction}
                fontName="REGULAR_SEMI_BOLD"
              >
                CUSTO BASE
              </Text>
              <Text nowrap fontName="REGULAR_SEMI_BOLD">
                R$ 1,90
              </Text>
            </div>
          </div>
          {device === "desktop" && (
            <div className="scales">
              <span className="tax">
                <Text align="center" nowrap fontName="REGULAR_MEDIUM">
                  TAXAS
                </Text>
              </span>
              <span className="totalCost">
                <Text align="center" nowrap fontName="REGULAR_MEDIUM">
                  CUSTO TOTAL
                </Text>
              </span>
              <span className="profitMargin">
                <Text align="center" nowrap fontName="REGULAR_MEDIUM">
                  MARGEM DE LUCRO
                </Text>
              </span>
              <span className="profitValue">
                <Text align="center" nowrap fontName="REGULAR_MEDIUM">
                  VALOR DO LUCRO
                </Text>
              </span>
              <span className="saleValue">
                <Text align="center" nowrap fontName="REGULAR_MEDIUM">
                  VALOR DE VENDA
                </Text>
              </span>
            </div>
          )}
          <div className="cardsList">
            {device === "desktop" && (
              <>
                <PriceCard
                  image={<Pix />}
                  tax="1%"
                  totalCost={1.92}
                  profitMargin={50}
                  profitValue={1.9}
                  title="PIX"
                  sellValue={3.9}
                />
                <PriceCard
                  image={<MercadoPago />}
                  tax="1%"
                  totalCost={1.92}
                  profitMargin={50}
                  profitValue={1.9}
                  title="Mercado Pago"
                  sellValue={3.9}
                />
                <PriceCard
                  image={<PayPal />}
                  tax="1%"
                  totalCost={1.92}
                  profitMargin={50}
                  profitValue={1.9}
                  title="PayPal"
                  sellValue={3.9}
                />
                <PriceCard
                  image={<PicPay />}
                  tax="1,5%"
                  totalCost={1.92}
                  profitMargin={50}
                  profitValue={1.9}
                  title="PicPay"
                  sellValue={3.9}
                />
                <PriceCard
                  image={<Ame />}
                  tax="0,99%"
                  totalCost={1.92}
                  profitMargin={50}
                  profitValue={1.9}
                  title="Ame"
                  sellValue={3.9}
                />
                <PriceCard
                  image={<Boleto />}
                  tax="3,99% + R$ 1,90"
                  totalCost={1.92}
                  profitMargin={50}
                  profitValue={1.9}
                  title="Boleto"
                  sellValue={3.9}
                />
                <PriceCard
                  image={<Transfer />}
                  tax="1,99%"
                  totalCost={1.92}
                  profitMargin={50}
                  profitValue={1.9}
                  title="TRANSFERÊNCIA"
                  sellValue={3.9}
                />
              </>
            )}
            {(device === "mobile" || device === "tablet") && (
              <>
                <PriceCardMobile
                  image={<Pix />}
                  tax="1%"
                  totalCost={1.92}
                  profitMargin={50}
                  profitValue={1.9}
                  title="PIX"
                  sellValue={3.9}
                />
                <PriceCardMobile
                  image={<MercadoPago />}
                  tax="1%"
                  totalCost={1.92}
                  profitMargin={50}
                  profitValue={1.9}
                  title="Mercado Pago"
                  sellValue={3.9}
                />
                <PriceCardMobile
                  image={<PayPal />}
                  tax="1%"
                  totalCost={1.92}
                  profitMargin={50}
                  profitValue={1.9}
                  title="PayPal"
                  sellValue={3.9}
                />
                <PriceCardMobile
                  image={<PicPay />}
                  tax="1,5%"
                  totalCost={1.92}
                  profitMargin={50}
                  profitValue={1.9}
                  title="PicPay"
                  sellValue={3.9}
                />
                <PriceCardMobile
                  image={<Ame />}
                  tax="0,99%"
                  totalCost={1.92}
                  profitMargin={50}
                  profitValue={1.9}
                  title="Ame"
                  sellValue={3.9}
                />
                <PriceCardMobile
                  image={<Boleto />}
                  tax="3,99% + R$ 1,90"
                  totalCost={1.92}
                  profitMargin={50}
                  profitValue={1.9}
                  title="Boleto"
                  sellValue={3.9}
                />
                <PriceCardMobile
                  image={<Transfer />}
                  tax="1,99%"
                  totalCost={1.92}
                  profitMargin={50}
                  profitValue={1.9}
                  title="TRANSFERÊNCIA"
                  sellValue={3.9}
                />
              </>
            )}
          </div>
        </section>
        <Button
          onClick={() => setconfirmModal(true)}
          margin="24px 0 0 0"
          rounded
          width={197}
          height={40}
          title="Salvar alterações"
        />
        <section className="bottomContainer">
          <Text
            margin="24px 0 24px 0"
            align="center"
            fontName="REGULAR_SEMI_BOLD"
          >
            PRAZOS PARA SAQUE
          </Text>
          <div className="paymentMethods">
            <span className="pix">
              <div className="paymentIcon">
                <span>
                  <Pix />
                </span>
                <Text
                  margin="0 0 0 10px"
                  color={Theme.colors.secondaryTextAction}
                  fontName="REGULAR_MEDIUM"
                >
                  PIX
                </Text>
              </div>
              <Text
                margin="10px 0 0 0"
                align="center"
                fontName="REGULAR_SEMI_BOLD"
              >
                1 DIA
              </Text>
            </span>
            <span className="pix">
              <div className="paymentIcon">
                <span>
                  <MercadoPago />
                </span>
                <Text
                  margin="0 0 0 10px"
                  nowrap
                  color={Theme.colors.secondaryTextAction}
                  fontName="REGULAR_MEDIUM"
                >
                  MERCADO PAGO
                </Text>
              </div>
              <Text
                margin="10px 0 0 0"
                align="center"
                fontName="REGULAR_SEMI_BOLD"
              >
                30 DIAS
              </Text>
            </span>
            <span className="pix">
              <div className="paymentIcon">
                <span>
                  <PayPal />
                </span>
                <Text
                  margin="0 0 0 10px"
                  color={Theme.colors.secondaryTextAction}
                  fontName="REGULAR_MEDIUM"
                >
                  PAYPAL
                </Text>
              </div>
              <Text
                margin="10px 0 0 0"
                align="center"
                fontName="REGULAR_SEMI_BOLD"
              >
                2 DIAS
              </Text>
            </span>
            <span className="pix">
              <div className="paymentIcon">
                <span>
                  <PicPay />
                </span>
                <Text
                  margin="0 0 0 10px"
                  color={Theme.colors.secondaryTextAction}
                  fontName="REGULAR_MEDIUM"
                >
                  PICPAY
                </Text>
              </div>
              <Text
                margin="10px 0 0 0"
                align="center"
                fontName="REGULAR_SEMI_BOLD"
              >
                1 DIA
              </Text>
            </span>
            <span className="pix">
              <div className="paymentIcon">
                <span>
                  <Ame />
                </span>
                <Text
                  margin="0 0 0 10px"
                  color={Theme.colors.secondaryTextAction}
                  fontName="REGULAR_MEDIUM"
                >
                  AME
                </Text>
              </div>
              <Text
                margin="10px 0 0 0"
                align="center"
                fontName="REGULAR_SEMI_BOLD"
              >
                1 DIA
              </Text>
            </span>
            <span className="pix">
              <div className="paymentIcon">
                <span>
                  <Boleto />
                </span>
                <Text
                  margin="0 0 0 10px"
                  color={Theme.colors.secondaryTextAction}
                  fontName="REGULAR_MEDIUM"
                >
                  BOLETO
                </Text>
              </div>
              <Text
                margin="10px 0 0 0"
                align="center"
                fontName="REGULAR_SEMI_BOLD"
              >
                1 DIA
              </Text>
            </span>
            <span className="pix">
              <div className="paymentIcon">
                <span>
                  <Transfer />
                </span>
                <Text
                  margin="0 0 0 10px"
                  color={Theme.colors.secondaryTextAction}
                  fontName="REGULAR_MEDIUM"
                >
                  TRANSFERÊNCIA
                </Text>
              </div>
              <Text
                margin="10px 0 0 0"
                align="center"
                fontName="REGULAR_SEMI_BOLD"
              >
                1 DIA
              </Text>
            </span>
          </div>
        </section>
      </main>
    </ConfigPackagePage>
  );
};

export default Page;
