"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { CustomerCardContainer } from "./style";

export interface CustomerCardDisplayData {
  name: string;
  email: string;
  phone: string;
  documentValue: string;
}

interface CustomerCardProps {
  displayData: CustomerCardDisplayData;
  isExcluded?: boolean;
}

const CustomerCard = ({ displayData, isExcluded }: CustomerCardProps) => {
  const { name, email, phone, documentValue } = displayData;

  return (
    <CustomerCardContainer $isExcluded={isExcluded}>
      <Text
        fontName="REGULAR_SEMI_BOLD"
        color={Theme.colors.mainlight}
        className="cardLine cardName"
      >
        {name}
      </Text>
      <Text
        fontName="REGULAR_MEDIUM"
        color={Theme.colors.secondaryText}
        className="cardLine cardEmail"
      >
        {email}
      </Text>
      <div className="cardContactWrapper">
        <Text
          fontName="REGULAR_MEDIUM"
          color={Theme.colors.secondaryText}
          className="cardLine cardPhone"
        >
          Telefone: {phone}
        </Text>
        <Text
          fontName="REGULAR_MEDIUM"
          color={Theme.colors.secondaryText}
          className="cardLine cardCpf"
        >
          CPF: {documentValue}
        </Text>
      </div>
    </CustomerCardContainer>
  );
};

export default CustomerCard;
