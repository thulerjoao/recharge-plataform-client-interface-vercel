import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useDevice } from "context/deviceContext";
import Image, { StaticImageData } from "next/image";
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
  const route = useRouter();
  const { device } = useDevice();

  const handleRechargeStatus = () => {
    if (rechargeStatus === "processing") {
      return "Pendente";
    } else {
      return "Confirmado";
    }
  };

  const handleRechargeStatusColor = () => {
    if (rechargeStatus === "processing") {
      return Theme.colors.pending;
    } else {
      return Theme.colors.approved;
    }
  };

  return (
    <OrderManualCardContainer onClick={() => route.push(pushTo)}>
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
          <Text nowrap align="center" fontName="SMALL">
            {orderNumber}
          </Text>
        </span>
        <span className="name">
          {device === "mobile" && (
            <Text tag="h3" fontName="SMALL">
              Data
            </Text>
          )}
          <Text nowrap align="center" fontName="SMALL">
            {orderDate}
          </Text>
        </span>
        {device === "desktop" && (
          <span className="name">
            <Text nowrap align="center" fontName="SMALL_MEDIUM">
              {packageName}
            </Text>
          </span>
        )}
        <span className="status">
          {device === "mobile" && (
            <Text tag="h3" fontName="SMALL">
              Plataforma
            </Text>
          )}
          <Text nowrap align="center" fontName="SMALL">
            {plataform}
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
            fontName="SMALL"
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
    </OrderManualCardContainer>
  );
};

export default OrderManualCard;
