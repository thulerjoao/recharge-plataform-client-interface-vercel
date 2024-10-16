import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Header from "utils/components/header/header";

const homeScreen = () => {
  return (
    <main>
      <Header />
      <div style={{ width: "50%" }}>
        <Text fontType="BIG_SEMI_BOLD" color={Theme.colors.maindark} tag="h1">
          4miga recharge store
        </Text>
        <Text
          fontType="REGULAR_SEMI_BOLD"
          color={Theme.colors.mainHighlight}
          tag="h3"
        >
          Text working properly
        </Text>
        <Input
          padding="0px 0px 0px 30px"
          leftElement={<div>H</div>}
          height={40}
        />
        <Button
          margin="20px 0px 0px 0px"
          shadow
          height={40}
          title="Iniciar"
        ></Button>
      </div>
    </main>
  );
};

export default homeScreen;
