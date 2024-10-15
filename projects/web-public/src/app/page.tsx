import Button from "@4miga/design-system/components/Button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";

const homeScreen = () => {
  return (
    <main>
      <Text fontType="BIG_SEMI_BOLD" color={Theme.colors.maindark} tag="h1">
        4miga recharge store
      </Text>
      <Text
        fontType="REGULAR_SEMI_BOLD"
        color={Theme.colors.mainhighlight}
        tag="h3"
      >
        Text working properly
      </Text>
      <Button shadow height={40} title="Iniciar"></Button>
    </main>
  );
};

export default homeScreen;
