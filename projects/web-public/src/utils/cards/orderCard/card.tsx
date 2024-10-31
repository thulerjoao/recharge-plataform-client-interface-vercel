import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import { OrderCardContainer } from "./style";

interface OrderCardProps {
  title: string;
  image: ReactElement;
  time: string;
  price: number;
  status: "approved" | "pending" | "canceled";
}

const OrderCard = ({ title, image, time, price, status }: OrderCardProps) => {
  const route = useRouter();
  const handleStatus = () => {
    if (status === "approved") return "aprovado";
    if (status === "pending") return "pendente";
    if (status === "canceled") return "cancelado";
  };

  const handleStatusColor = () => {
    if (status === "approved") return Theme.colors.approved;
    if (status === "pending") return Theme.colors.pending;
    if (status === "canceled") return Theme.colors.refused;
  };

  return (
    <OrderCardContainer status={status}>
      {image}
      <section className="allInfo">
        <div className="rowInfos">
          <Text fontName="REGULAR">{title}</Text>
          <Text align="end" fontName="REGULAR_MEDIUM">
            {price.toFixed(2)}
          </Text>
        </div>
        <div className="rowInfos">
          <Text color={Theme.colors.secondaryText} fontName="TINY">
            {time}
          </Text>
          <Text color={handleStatusColor()} align="end" fontName="TINY">
            {handleStatus()}
          </Text>
        </div>
        <Text
          align="center"
          underline
          fontName="TINY"
          color={Theme.colors.secondaryText}
        >
          ver detalhes
        </Text>
      </section>
    </OrderCardContainer>
  );
};

export default OrderCard;
