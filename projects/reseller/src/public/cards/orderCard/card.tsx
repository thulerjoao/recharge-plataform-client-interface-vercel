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
    console.log(rechargeStatus);
    if (rechargeStatus === "RECHARGE_PENDING") return "Processando";
    if (rechargeStatus === "RECHARGE_APPROVED") return "Concluída";
    if (rechargeStatus === "RECHARGE_REJECTED") return "Cancelada";
  };

  const handleRechargeStatusColor = () => {
    if (rechargeStatus === "RECHARGE_PENDING") return Theme.colors.pending;
    if (rechargeStatus === "RECHARGE_APPROVED") return Theme.colors.approved;
    if (rechargeStatus === "RECHARGE_REJECTED") return Theme.colors.refused;
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
      <section className="allInfoSection">
        <span className="orderNumber">
          <Text className="mobile" tag="h3" fontName="SMALL">
            Nº do Pedido
          </Text>
          <Text className="infoValue" nowrap align="start" fontName="SMALL">
            #{orderNumber}
          </Text>
        </span>
        <span className="name">
          <Text className="mobile" tag="h3" fontName="SMALL">
            Cliente
          </Text>
          <Text className="infoValue" nowrap align="start" fontName="SMALL">
            {userName}
          </Text>
        </span>
        <div className="packageName desktop">
          <Text className="infoValue" nowrap align="start" fontName="SMALL">
            {packageName}
          </Text>
        </div>
        <span className="status paymentStatus">
          <Text className="mobile" tag="h3" fontName="SMALL">
            Pagamento
          </Text>
          <Text
            className="infoValue"
            nowrap
            align="end"
            color={handlePaymentStatusColor()}
            fontName="SMALL"
          >
            {handlePaymentStatus()}
          </Text>
        </span>
        <span className="status rechargeStatus">
          <Text className="mobile" tag="h3" fontName="SMALL">
            Recarga
          </Text>
          <Text
            className="infoValue"
            nowrap
            align="end"
            color={handleRechargeStatusColor()}
            fontName="SMALL"
          >
            {handleRechargeStatus()}
          </Text>
        </span>
      </section>
      <section className="forwardIcon desktop">
        <ForwardArrow />
      </section>
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
