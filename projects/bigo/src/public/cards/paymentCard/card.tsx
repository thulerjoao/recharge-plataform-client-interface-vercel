/* eslint-disable react/jsx-key */
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useMemo } from "react";
import Boleto from "./icons/boleto.svg";
import MercadoPago from "./icons/mercadoPago.svg";
import PayPal from "./icons/payPal.svg";
import PicPay from "./icons/picpay.svg";
import Pix from "./icons/pix.svg";
import Transfer from "./icons/transfer.svg";
import { PaymentCardContainer } from "./style";
import { formatPrice } from "utils/formatPrice";

interface Props {
  selected?: boolean;
  method:
    | "pix"
    | "mercado pago"
    | "picpay"
    | "paypal"
    | "boleto"
    | "transferencia";
  price: number;
}

const PaymentCard = ({ selected, method, price }: Props) => {
  const RenderedComponent = useMemo(() => {
    switch (method.toLocaleLowerCase()) {
      case "pix":
        return [<Pix />, "pix"];
      case "mercado pago":
        return [<MercadoPago />, "mercado pago"];
      case "picpay":
        return [<PicPay />, "PicPay"];
      case "paypal":
        return [<PayPal />, "PayPal"];
      case "boleto":
        return [<Boleto />, "Boleto"];
      case "transferencia":
        return [<Transfer />, "Transferência"];
    }
  }, [method]);

  return (
    <PaymentCardContainer selected={selected}>
      <div className="iconContainer">
        <span>{RenderedComponent[0]}</span>
        <Text color={Theme.colors.maindark} fontName="REGULAR_MEDIUM">
          {RenderedComponent[1]}
        </Text>
      </div>
      <Text
        align="end"
        color={Theme.colors.maindark}
        fontName="REGULAR_SEMI_BOLD"
      >
        R$ {formatPrice(price)}
      </Text>
    </PaymentCardContainer>
  );
};

export default PaymentCard;
