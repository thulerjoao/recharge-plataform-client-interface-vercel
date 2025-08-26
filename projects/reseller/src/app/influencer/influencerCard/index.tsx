"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { InfluencerCardContainer } from "./style";
import Icon from "../icons/icon.svg";

interface Influencer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  paymentMethod?: string;
  paymentData?: string;
  isActive: boolean;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface InfluencerCardProps {
  influencer: Influencer;
  onClick: () => void;
  formatDate: (date: Date) => string;
}

const InfluencerCard = ({
  influencer,
  onClick,
  formatDate,
}: InfluencerCardProps) => {
  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  return (
    <InfluencerCardContainer onClick={onClick}>
      <div className="avatar">
        <Icon />
      </div>
      <section className="allInfo">
        <div className="rowInfos">
          <Text nowrap fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
            {influencer.name}
          </Text>
          <div
            className={`statusBadge ${influencer.isActive ? "active" : "inactive"}`}
          >
            <Text
              fontName="TINY"
              align="center"
              color={
                influencer.isActive
                  ? Theme.colors.approved
                  : Theme.colors.refused
              }
            >
              {influencer.isActive ? "ATIVO" : "INATIVO"}
            </Text>
          </div>
        </div>
        <div className="rowInfos">
          <Text color={Theme.colors.secondaryText} fontName="TINY">
            {influencer.email || "Sem email"}
          </Text>
          <Text color={Theme.colors.secondaryText} fontName="TINY">
            {influencer.phone ? formatPhone(influencer.phone) : "Sem telefone"}
          </Text>
        </div>
        <div className="rowInfos">
          <Text color={Theme.colors.secondaryText} fontName="TINY">
            Cadastrado em: {formatDate(influencer.createdAt)}
          </Text>
          <Text color={Theme.colors.secondaryText} fontName="TINY">
            {influencer.paymentMethod || "Sem método de pagamento"}
          </Text>
        </div>
      </section>
    </InfluencerCardContainer>
  );
};

export default InfluencerCard;
