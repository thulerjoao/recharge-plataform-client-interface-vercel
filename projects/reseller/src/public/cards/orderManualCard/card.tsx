import Text from "@4miga/design-system/components/Text";
import Image, { StaticImageData } from "next/image";
import { useTheme } from "styled-components";
import { useRouter } from "next/navigation";
import ForwardArrow from ".//icons/ForwardArrow.svg";
import { OrderManualCardContainer } from "./style";

interface OrderManualCardProps {
  image: StaticImageData;
  orderNumber: number;
  orderDate: string;
  packageName: string;
  plataform: string;
  rechargeStatus: "approved" | "processing";
  pushTo: string;
}

const OrderManualCard = ({
  pushTo,
  image,
  orderNumber,
  orderDate,
  packageName,
  plataform,
  rechargeStatus,
}: OrderManualCardProps) => {
  const theme = useTheme();
  const route = useRouter();

  const handleRechargeStatus = () => {
    if (rechargeStatus === "processing") {
      return "Pendente";
    } else {
      return "Confirmado";
    }
  };

  const handleRechargeStatusColor = () => {
    if (rechargeStatus === "processing") {
      return theme.pending;
    } else {
      return theme.approved;
    }
  };

  return (
    <OrderManualCardContainer onClick={() => route.push(pushTo)}>
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
            Data
          </Text>
          <Text nowrap align="center" fontName="SMALL">
            {orderDate}
          </Text>
        </span>
        <div className="name desktop">
          <Text nowrap align="center" fontName="SMALL_MEDIUM">
            {packageName}
          </Text>
        </div>
        <span className="status">
          <Text className="mobile" tag="h3" fontName="SMALL">
            Plataforma
          </Text>
          <Text nowrap align="center" fontName="SMALL">
            {plataform}
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
        <Text underline align="center" color={theme.text_03} fontName="REGULAR">
          ver mais
        </Text>
      </span>
    </OrderManualCardContainer>
  );
};

export default OrderManualCard;
