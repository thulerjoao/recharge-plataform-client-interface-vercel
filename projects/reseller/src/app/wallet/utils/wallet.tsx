import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import PaymentCard from "../common/components/paymentCard";
import ValueCard from "../common/components/ValueCard";
import Ame from "../common/icons/Ame.svg";
import Boleto from "../common/icons/Boleto.svg";
import Forward from "../common/icons/forward.svg";
import MercadoPago from "../common/icons/MercadoPago.svg";
import PayPal from "../common/icons/PayPal.svg";
import PicPay from "../common/icons/PicPay.svg";
import Pix from "../common/icons/Pix.svg";
import Transfer from "../common/icons/Transfer.svg";
import { WalletContainer } from "./style";

const Wallet = () => {
  const route = useRouter();

  return (
    <WalletContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="CARTEIRA" />
        </HeaderEnviroment>
      </div>
      <div className="mobile">
        <DefaultHeader backWard title="CARTEIRA" />
      </div>
      <main>
        <section className="topContainer">
          <div
            className="topOption"
            onClick={() => route.push("/wallet/withdraw-request")}
          >
            <Text fontName="REGULAR_MEDIUM">Solicitações de saque</Text>
            <span>
              <Forward />
            </span>
          </div>
          <div
            className="topOption"
            onClick={() => route.push("/wallet/new-request")}
          >
            <Text fontName="REGULAR_MEDIUM">Novo saque</Text>
            <span>
              <Forward />
            </span>
          </div>
        </section>
        <section className="bottomContainer">
          <div className="leftTopContainer">
            <div className="inner">
              <Text
                margin="0 0 24px 0"
                align="center"
                fontName="REGULAR_SEMI_BOLD"
              >
                VALORES
              </Text>
              <ValueCard title="SALDO PARA ESTOQUE" value={40000} />
              <ValueCard title="VALOR DISPONÍVEL PARA SAQUE" value={12000} />
              <ValueCard title="VALOR TOTAL VENDIDO" value={21000} />
              <ValueCard title="TOTAL NA CARTEIRA" value={73000} />
              <ValueCard title="VALOR MÍNIMO PARA SAQUE" value={5000} />
            </div>
            <div className="pixKey">
              <Input
                value={"10.204.300/0001-10"}
                height={48}
                title="Chave PIX"
              />
              <Button
                margin="24px 0 0 0"
                rounded
                width={199}
                height={40}
                title="Alterar chave PIX"
              />
            </div>
          </div>
          <div className="rightBottomContainer">
            <Text
              margin="0 0 24px 0"
              align="center"
              fontName="REGULAR_SEMI_BOLD"
            >
              FORMAS DE PAGAMENTO DISPONÍVEIS
            </Text>
            <PaymentCard title="PIX" icon={<Pix />} isOn />
            <PaymentCard title="MERCADO PAGO" icon={<MercadoPago />} isOn />
            <PaymentCard title="PAYPAL" icon={<PayPal />} isOn={false} />
            <PaymentCard title="PICPAY" icon={<PicPay />} isOn={false} />
            <PaymentCard title="AME" icon={<Ame />} isOn />
            <PaymentCard title="BOLETO" icon={<Boleto />} isOn />
            <PaymentCard title="TRANSFERÊNCIA" icon={<Transfer />} isOn />
            <Button
              margin="16px 0 0 0"
              rounded
              width={197}
              height={40}
              title="Salvar alterações"
            />
          </div>
        </section>
      </main>
    </WalletContainer>
  );
};

export default Wallet;
