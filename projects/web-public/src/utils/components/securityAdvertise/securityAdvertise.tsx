import Text from "@4miga/design-system/components/Text";
import Kart from "../../icons/Kart.svg";
import Locker from "../../icons/Locker.svg";
import { SecurityAdvertiseContainer } from "./style";

const SecurityAdvertise = () => {
  return (
    <SecurityAdvertiseContainer>
      <article>
        <Kart />
        <Text tag="h3" align="center" fontType="SMALL_MEDIUM">
          Entrega imediata
        </Text>
      </article>
      <article>
        <Locker />
        <Text tag="h3" align="center" fontType="SMALL_MEDIUM">
          Compra Segura
        </Text>
      </article>
    </SecurityAdvertiseContainer>
  );
};

export default SecurityAdvertise;
