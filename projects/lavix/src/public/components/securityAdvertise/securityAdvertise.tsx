import Text from "@4miga/design-system/components/Text";
import Clock from "./icons/clock.svg";
import Locker from "./icons/locker.svg";
import { SecurityAdvertiseContainer } from "./style";
import { useTheme } from "styled-components";

const SecurityAdvertise = () => {
  const theme = useTheme();

  return (
    <SecurityAdvertiseContainer>
      <article>
        <Locker />
        <Text
          color={theme.text_01}
          tag="h3"
          align="center"
          fontName="SMALL_MEDIUM"
        >
          Compra Segura
        </Text>
      </article>
      <article>
        <Clock />
        <Text
          color={theme.text_01}
          tag="h3"
          align="center"
          fontName="SMALL_MEDIUM"
        >
          Entrega rápida
        </Text>
      </article>
    </SecurityAdvertiseContainer>
  );
};

export default SecurityAdvertise;
