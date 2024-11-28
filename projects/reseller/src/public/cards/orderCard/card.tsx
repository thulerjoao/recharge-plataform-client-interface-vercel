import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useDevice } from "context/deviceContext";
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
  const { device } = useDevice();

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
      {(device === "desktop" || device === "tablet") && (
        <Image src={image} alt="Imagem do jogo" />
      )}
      <section className="allInfo">
        <span className="orderNumber">
          {device === "mobile" && (
            <Text tag="h3" fontName="SMALL">
              Nº do Pedido
            </Text>
          )}
          <Text nowrap align="center" fontName="SMALL_MEDIUM">
            {orderNumber}
          </Text>
        </span>
        <span className="name">
          {device === "mobile" && (
            <Text tag="h3" fontName="SMALL">
              Cliente
            </Text>
          )}
          <Text nowrap align="center" fontName="SMALL_MEDIUM">
            {clientName}
          </Text>
        </span>
        {(device === "desktop" || device === "tablet") && (
          <span className="name">
            <Text nowrap align="center" fontName="SMALL_MEDIUM">
              {packageName}
            </Text>
          </span>
        )}
        <span className="status">
          {device === "mobile" && (
            <Text tag="h3" fontName="SMALL">
              Pagamento
            </Text>
          )}
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
          {device === "mobile" && (
            <Text tag="h3" fontName="SMALL">
              Recarga
            </Text>
          )}
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
      {(device === "desktop" || device === "tablet") && (
        <span className="forwardIcon">
          <ForwardArrow />
        </span>
      )}
      {device === "mobile" && (
        <span className="seeMore">
          <Text
            underline
            align="center"
            color={Theme.colors.secondaryText}
            fontName="REGULAR"
          >
            ver mais
          </Text>
        </span>
      )}
    </OrderCardContainer>
  );
};

export default OrderCard;
