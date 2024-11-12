import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import ForwardArrow from ".//icons/ForwardArrow.svg";
import { OrderCardContainer } from "./style";

interface OrderCardProps {
  image: StaticImageData;
  orderNumber: number;
  clientName: string;
  packageName: string;
  paymentStatus: "approved";
  rechargeStatus: "processing";
}

const OrderCard = ({
  image,
  orderNumber,
  clientName,
  packageName,
  paymentStatus,
  rechargeStatus,
}: OrderCardProps) => {
  const route = useRouter();

  const handlePaymentStatus = () => {
    if (paymentStatus === "approved") return "Aprovado";
  };

  const handlePaymentStatusColor = () => {
    if (paymentStatus === "approved") return Theme.colors.approved;
  };

  const handleRechargeStatus = () => {
    if (rechargeStatus === "processing") return "Processando";
  };

  const handleRechargeStatusColor = () => {
    if (rechargeStatus === "processing") return Theme.colors.pending;
  };

  return (
    <OrderCardContainer onClick={() => route.push(`/sales/${orderNumber}`)}>
      <Image src={image} alt="Imagem do jogo" />
      <section className="allInfo">
        <span className="orderNumber">
          <Text nowrap align="center" fontName="SMALL_MEDIUM">
            {orderNumber}
          </Text>
        </span>
        <span className="name">
          <Text nowrap align="center" fontName="SMALL_MEDIUM">
            {clientName}
          </Text>
        </span>
        <span className="name">
          <Text nowrap align="center" fontName="SMALL_MEDIUM">
            {packageName}
          </Text>
        </span>
        <span className="status">
          <Text
            nowrap
            align="center"
            color={handlePaymentStatusColor()}
            fontName="SMALL_MEDIUM"
          >
            {handlePaymentStatus()}
          </Text>
        </span>
        <span className="status">
          <Text
            nowrap
            align="center"
            color={handleRechargeStatusColor()}
            fontName="SMALL_MEDIUM"
          >
            {handleRechargeStatus()}
          </Text>
        </span>
      </section>
      <span className="forwardIcon">
        <ForwardArrow />
      </span>
    </OrderCardContainer>
  );
};

export default OrderCard;
