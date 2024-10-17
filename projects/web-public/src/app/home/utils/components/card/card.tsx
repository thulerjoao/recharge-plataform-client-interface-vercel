import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { ReactElement } from "react";
import { CardContainer } from "./style";

interface CardProps {
  image: ReactElement;
  name: string;
}

const Card = ({ image, name }: CardProps) => {
  return (
    <CardContainer>
      <figure>{image}</figure>
      <Text
        tag="h2"
        align="center"
        color={Theme.colors.mainlight}
        fontType="REGULAR_MEDIUM"
        margin="16px 0 0 0"
      >
        {name}
      </Text>
    </CardContainer>
  );
};

export default Card;
