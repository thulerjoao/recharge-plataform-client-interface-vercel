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
  pushTo: string;
}

const OrderCard = ({
  pushTo,
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
    <OrderCardContainer onClick={() => route.push(pushTo)}>
      <Image className="desktop" src={image} alt="Imagem do jogo" />
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
            {clientName}
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
