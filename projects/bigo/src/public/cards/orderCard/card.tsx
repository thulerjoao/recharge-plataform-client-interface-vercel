import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { OrderType } from "types/orderType";
import { formatDate } from "utils/formatDate";
import { handleOrderStatus, handleStatusColor } from "utils/handleStatus";
import { OrderCardContainer } from "./style";
import { formatPrice } from "utils/formatPrice";

interface OrderCardProps {
  order: OrderType;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const route = useRouter();
  // const [isImageValid, setIsImageValid] = useState<boolean>(false);

  // useEffect(() => {
  //   const checkImage = async () => {
  //     const valid = await checkImageUrl(order.orderItem.package.imgCardUrl);
  //     setIsImageValid(valid);
  //   };

  //   checkImage();
  // }, [order.orderItem.package.imgCardUrl]);

  const handleSeeMore = () => {
    sessionStorage.setItem("order", JSON.stringify(order));
    route.push("/order");
  };

  return (
    <OrderCardContainer onClick={() => handleSeeMore()}>
      <Image
        src={order.orderItem.package.imgCardUrl}
        alt={`Imagem do pacote ${order.orderItem.package.name}`}
        height={64}
        width={64}
        style={{ borderRadius: "8px" }}
      />
      <section className="allInfo">
        <div className="rowInfos">
          <Text nowrap fontName="SMALL">
            {order.orderItem.package.name}
          </Text>
          <Text align="end" fontName="SMALL_MEDIUM">
            R$ {formatPrice(order.price)}
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
