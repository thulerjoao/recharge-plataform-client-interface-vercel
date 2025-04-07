import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageNotFound from "public/img/ImageNotFound.jpg";
import { useEffect, useState } from "react";
import { OrderType } from "types/orderType";
import { checkImageUrl } from "utils/checkImageUrl";
import { formatDate } from "utils/formatDate";
import {
  handlePaymentStatusShort,
  handleStatusColor,
} from "utils/handleStatus";
import { OrderCardContainer } from "./style";

interface OrderCardProps {
  item: OrderType;
}

const OrderCard = ({ item }: OrderCardProps) => {
  const route = useRouter();
  const [isImageValid, setIsImageValid] = useState<boolean>(false);

  useEffect(() => {
    const checkImage = async () => {
      const valid = await checkImageUrl(item.orderItem.package.imgCardUrl);
      setIsImageValid(valid);
    };

    checkImage();
  }, [item.orderItem.package.imgCardUrl]);

  return (
    <OrderCardContainer status={status}>
      <Image
        src={isImageValid ? ImageNotFound : ImageNotFound}
        alt={`Imagem do pacote ${item.orderItem.package.name}`}
        height={64}
        width={64}
        style={{ borderRadius: "8px" }}
      />
      <div style={{ width: "40px" }}></div>
      <section className="allInfo">
        <div className="rowInfos">
          <Text nowrap fontName="SMALL">
            {item.orderItem.package.name}
          </Text>
          <Text align="end" fontName="SMALL_MEDIUM">
            R$ {item.totalAmount.toFixed(2)}
          </Text>
        </div>
        <div className="rowInfos">
          <Text color={Theme.colors.secondaryText} fontName="TINY">
            {formatDate(item.createdAt)}
          </Text>
          <Text
            color={handleStatusColor(item.payment.status)}
            align="end"
            fontName="TINY"
          >
            {handlePaymentStatusShort(item.payment.status)}
          </Text>
        </div>
        <div className="seeDetails" onClick={() => route.push("/order")}>
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
