import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { OrderType } from "types/orderType";
import ForwardArrow from "../orderCard/icons/ForwardArrow.svg";
import { OrderCardTestContainer } from "./style";

interface OrderCardTestProps {
  order: OrderType;
}

const OrderCardTest = ({ order }: OrderCardTestProps) => {
  const orderNumber = order.orderNumber;
  const userName = order.user?.name;
  const packageName = order.orderItem.package.name;
  const paymentStatus = order.payment.status;
  const rechargeStatus = order.orderItem.recharge.status;
  const image = order.orderItem.package.imgCardUrl;

  const handlePaymentStatus = () => {
    if (paymentStatus === "PAYMENT_APPROVED") return "Aprovado";
  };

  const handlePaymentStatusColor = () => {
    if (paymentStatus === "PAYMENT_APPROVED") return Theme.colors.approved;
  };

  const handleRechargeStatus = () => {
    if (rechargeStatus === "RECHARGE_PENDING") return "Processando";
  };

  const handleRechargeStatusColor = () => {
    if (rechargeStatus === "RECHARGE_PENDING") return Theme.colors.pending;
  };

  return (
    <OrderCardTestContainer>
      <div className="imageWrapper">
        <Image
          height={48}
          width={48}
          className="desktop"
          src={image}
          alt="Imagem do jogo"
        />
      </div>

      <div className="contentWrapper">
        <div className="infoRow desktop">
          <div className="infoItem orderNumber">
            <Text className="infoValue" nowrap align="start" fontName="SMALL">
              #{orderNumber}
            </Text>
          </div>
          <div className="infoItem clientName">
            <Text className="infoValue" nowrap align="start" fontName="SMALL">
              {userName}
            </Text>
          </div>
          <div className="infoItem packageName">
            <Text className="infoValue" nowrap align="start" fontName="SMALL">
              {packageName}
            </Text>
          </div>
          <div className="infoItem paymentStatus">
            <Text
              className="infoValue"
              nowrap
              align="end"
              color={handlePaymentStatusColor()}
              fontName="SMALL"
            >
              {handlePaymentStatus()}
            </Text>
          </div>
          <div className="infoItem rechargeStatus">
            <Text
              className="infoValue"
              nowrap
              align="end"
              color={handleRechargeStatusColor()}
              fontName="SMALL"
            >
              {handleRechargeStatus()}
            </Text>
          </div>
        </div>

        <div className="infoList mobile">
          <div className="infoRowMobile">
            <Text className="label" tag="h3" fontName="SMALL">
              Nº do Pedido
            </Text>
            <Text className="value" nowrap align="end" fontName="SMALL">
              #{orderNumber}
            </Text>
          </div>
          <div className="infoRowMobile">
            <Text className="label" tag="h3" fontName="SMALL">
              Cliente
            </Text>
            <Text className="value" nowrap align="end" fontName="SMALL">
              {userName}
            </Text>
          </div>
          <div className="infoRowMobile">
            <Text className="label" tag="h3" fontName="SMALL">
              Pagamento
            </Text>
            <Text
              className="value"
              nowrap
              align="end"
              color={handlePaymentStatusColor()}
              fontName="SMALL"
            >
              {handlePaymentStatus()}
            </Text>
          </div>
          <div className="infoRowMobile">
            <Text className="label" tag="h3" fontName="SMALL">
              Recarga
            </Text>
            <Text
              className="value"
              nowrap
              align="end"
              color={handleRechargeStatusColor()}
              fontName="SMALL"
            >
              {handleRechargeStatus()}
            </Text>
          </div>
        </div>
      </div>

      <div className="forwardIcon desktop">
        <ForwardArrow />
      </div>

      <div className="seeMore mobile">
        <Text
          underline
          align="center"
          color={Theme.colors.secondaryText}
          fontName="REGULAR"
        >
          ver mais
        </Text>
      </div>
    </OrderCardTestContainer>
  );
};

export default OrderCardTest;
