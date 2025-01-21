import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import Password from "../../icons/Password.svg";
import { NewPasswordContainer } from "./style";

interface Props {}

const NewPassword = () => {
  return (
    <NewPasswordContainer>
      <Text margin="24px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
        Crie uma nova senha
      </Text>
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="Senha"
        leftElement={<Password />}
      />
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="Confirmar senha"
        leftElement={<Password />}
      />
      <Button
        onClick={() => {}}
        margin="24px 0 0 0"
        width={310}
        height={40}
        rounded
        title="Confirmar"
      />
    </NewPasswordContainer>
  );
};

export default NewPassword;
