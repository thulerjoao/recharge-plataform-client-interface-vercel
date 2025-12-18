import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { OrderType } from "types/orderType";
import {
  handleOrderStatus,
  handlePaymentStatus,
  handleRechargeStatus,
  handleStatusColor,
} from "utils/handleStatus";
import { OrderCardContainer } from "./style";

interface OrderCardProps {
  order: OrderType;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <OrderCardContainer>
      <Image
        height={64}
        width={64}
        className="desktop"
        src={order.orderItem.package.imgCardUrl}
        alt="Imagem do jogo"
      />
      <section className="allInfoSection">
        <span className="orderNumber">
          <Text className="mobile" tag="h3" fontName="SMALL">
            Nº do Pedido
          </Text>
          <Text className="infoValue" nowrap align="start" fontName="SMALL">
            #{order.orderNumber}
          </Text>
        </span>
        <span className="name">
          <Text className="mobile" tag="h3" fontName="SMALL">
            Cliente
          </Text>
          <Text className="infoValue" nowrap align="start" fontName="SMALL">
            {order.user?.name}
          </Text>
        </span>
        <div className="packageName desktop">
          <Text className="infoValue" nowrap align="start" fontName="SMALL">
            {order.orderItem.package.name}
          </Text>
        </div>
        <span className="status rechargeStatus">
          <Text className="mobile" tag="h3" fontName="SMALL">
            Recarga
          </Text>
          <Text
            className="infoValue"
            nowrap
            align="end"
            color={handleStatusColor(order.orderStatus)}
            fontName="SMALL"
          >
            {handleOrderStatus(order.orderStatus)}
          </Text>
        </span>
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
