import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageNotFound from "public/img/ImageNotFound.jpg";
import { useEffect, useState } from "react";
import { OrderType } from "types/orderType";
import { checkImageUrl } from "utils/checkImageUrl";
import { formatDate } from "utils/formatDate";
import { handleOrderStatus, handleStatusColor } from "utils/handleStatus";
import { OrderCardContainer } from "./style";

interface OrderCardProps {
  order: OrderType;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const route = useRouter();
  const [isImageValid, setIsImageValid] = useState<boolean>(false);

  useEffect(() => {
    const checkImage = async () => {
      const valid = await checkImageUrl(order.orderItem.package.imgCardUrl);
      setIsImageValid(valid);
    };

    checkImage();
  }, [order.orderItem.package.imgCardUrl]);

  const handleSeeMore = () => {
    sessionStorage.setItem("order", JSON.stringify(order));
    route.push("/order");
  };

  return (
    <OrderCardContainer onClick={() => handleSeeMore()}>
      <Image
        src={isImageValid ? order.orderItem.package.imgCardUrl : ImageNotFound}
        alt={`Imagem do pacote ${order.orderItem.package.name}`}
        height={64}
        width={64}
        style={{ borderRadius: "8px" }}
      />
      <div style={{ width: "40px" }}></div>
      <section className="allInfo">
        <div className="rowInfos">
          <Text nowrap fontName="SMALL">
            {order.orderItem.package.name}
          </Text>
          <Text align="end" fontName="SMALL_MEDIUM">
            R$ {order.totalAmount.toFixed(2)}
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
        <div className="seeDetails">
          <Text
            align="center"
            underline
            fontName="TINY"
            color={Theme.colors.secondaryText}
          >
            ver detalhes
          </Text>
        </div>
      </section>
    </OrderCardContainer>
  );
};

export default OrderCard;
