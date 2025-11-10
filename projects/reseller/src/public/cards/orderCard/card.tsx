import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { OrderType } from "types/orderType";
import ForwardArrow from ".//icons/ForwardArrow.svg";
import { OrderCardContainer } from "./style";

interface OrderCardProps {
  order: OrderType;
}

const OrderCard = ({ order }: OrderCardProps) => {
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
    <OrderCardContainer>
      <Image
        height={64}
        width={64}
        className="desktop"
        src={image}
        alt="Imagem do jogo"
      />
      <section className="allInfo">
        <span className="orderNumber">
          <Text className="mobile" tag="h3" fontName="SMALL">
            Nº do Pedido
          </Text>
          <Text nowrap align="center" fontName="SMALL">
            {orderNumber}
          </Text>
        </span>
        <span className="name">
          <Text className="mobile" tag="h3" fontName="SMALL">
            Cliente
          </Text>
          <Text nowrap align="center" fontName="SMALL">
            {userName}
          </Text>
        </span>
        <div className="name desktop">
          <Text nowrap align="center" fontName="SMALL">
            {packageName}
          </Text>
        </div>
        <span className="status">
          <Text className="mobile" tag="h3" fontName="SMALL">
            Pagamento
          </Text>
          <Text
            nowrap
            align="center"
            color={handlePaymentStatusColor()}
            fontName="SMALL"
          >
            {handlePaymentStatus()}
          </Text>
        </span>
        <span className="status">
          <Text className="mobile" tag="h3" fontName="SMALL">
            Recarga
          </Text>
          <Text
            nowrap
            align="center"
            color={handleRechargeStatusColor()}
            fontName="SMALL"
          >
            {handleRechargeStatus()}
          </Text>
        </span>
      </section>
      <span className="forwardIcon desktop">
        <ForwardArrow />
      </span>
      <span className="seeMore mobile">
        <Text
          underline
          align="center"
          color={Theme.colors.secondaryText}
          fontName="REGULAR"
        >
          ver mais
        </Text>
      </span>
    </OrderCardContainer>
  );
};

export default OrderCard;
