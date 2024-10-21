import Text from "@4miga/design-system/components/Text";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import { CardContainer } from "./style";

interface CardProps {
  image: ReactElement;
  name: string;
}

const Card = ({ image, name }: CardProps) => {
  const route = useRouter();

  return (
    <CardContainer onClick={() => route.replace("/product")}>
      <figure>{image}</figure>
      <Text
        tag="h2"
        align="center"
        fontType="REGULAR_MEDIUM"
        margin="16px 0 0 0"
      >
        {name}
      </Text>
    </CardContainer>
  );
};

export default Card;
