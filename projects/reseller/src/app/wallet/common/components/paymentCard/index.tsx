import OnOff from "@4miga/design-system/components/onOff";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { ReactElement, useState } from "react";
import { PaymentCardContainer } from "./style";

interface CardProps {
  icon: ReactElement;
  title: string;
  isOn: boolean;
}

const PaymentCard = ({ icon, title, isOn }: CardProps) => {
  const [on, setOn] = useState<boolean>(isOn);

  return (
    <PaymentCardContainer>
      <div>
        {<span>{icon}</span>}
        <Text
          nowrap
          color={Theme.colors.secondaryTextAction}
          fontName="REGULAR_MEDIUM"
        >
          {title}
        </Text>
      </div>
      <OnOff onOff={on} setOnOff={setOn} />
    </PaymentCardContainer>
  );
};

export default PaymentCard;
