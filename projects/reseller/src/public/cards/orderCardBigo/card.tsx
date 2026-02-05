import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { OrderType } from "types/orderType";
import { formatDate } from "utils/formatDate";
import { formatPrice } from "utils/formatPrice";
import { handleOrderStatus, handleStatusColor } from "utils/handleStatus";
import { OrderCardContainer } from "./style";

interface OrderCardProps {
  order: OrderType;
}

const OrderCardBigo = ({ order }: OrderCardProps) => {
  const route = useRouter();
  const handleSeeMore = () => {
    sessionStorage.setItem("order", JSON.stringify(order));
    route.push(`/orders/${order.id}`);
  };

  return (
    <OrderCardContainer onClick={() => handleSeeMore()}>
      <Image
        src={order.orderItem.package.imgCardUrl}
        alt={`Imagem do pacote ${order.orderItem.package.name}`}
        height={64}
        width={64}
        style={{ borderRadius: "8px" }}
        quality={75}
      />
      <section className="allInfo">
        <div className="rowInfos">
          <Text nowrap fontName="SMALL">
            {order.orderItem.package.name}
          </Text>
          <Text align="end" fontName="SMALL_MEDIUM">
            R$ {formatPrice(Number(order.price))}
          </Text>
        </div>
        <div className="rowInfos">
          <Text color={Theme.colors.secondaryText} fontName="TINY">
            {formatDate(order.createdAt)}
          </Text>
          <Text
            color={handleStatusColor(order.orderStatus)}
            align="end"
            fontName="TINY"
          >
            {handleOrderStatus(order.orderStatus)}
          </Text>
        </div>
      </section>
    </OrderCardContainer>
  );
};

export default OrderCardBigo;
