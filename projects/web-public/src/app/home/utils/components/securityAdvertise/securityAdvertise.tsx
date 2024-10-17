import Text from "@4miga/design-system/components/Text";
import { SecurityAdvertiseContainer } from "./style";
import { Theme } from "@4miga/design-system/theme/theme";
import Kart from "../../icons/Kart.svg";
import Locker from "../../icons/Locker.svg";

const SecurityAdvertise = () => {
  return (
    <SecurityAdvertiseContainer>
      <article>
        <Kart />
        <Text
          tag="h3"
          align="center"
          color={Theme.colors.mainlight}
          fontType="SMALL_MEDIUM"
        >
          Entrega imediata
        </Text>
      </article>
      <article>
        <Locker />
        <Text
          tag="h3"
          align="center"
          color={Theme.colors.mainlight}
          fontType="SMALL_MEDIUM"
        >
          Compra Segura
        </Text>
      </article>
    </SecurityAdvertiseContainer>
  );
};

export default SecurityAdvertise;
