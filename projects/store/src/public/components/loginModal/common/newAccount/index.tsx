import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import CPFicon from "../../icons/CPFicon.svg";
import Email from "../../icons/Email.svg";
import Name from "../../icons/Name.svg";
import Password from "../../icons/Password.svg";
import Phone from "../../icons/Phone.svg";
import { NewAccountContainer } from "./style";

const NewAccount = () => {
  return (
    <NewAccountContainer>
      <Text margin="24px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
        Cadastre-se para finalizar sua compra
      </Text>
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="Nome"
        leftElement={<Name />}
      />
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="E-mail"
        leftElement={<Email />}
      />
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="Telefone"
        leftElement={<Phone />}
      />
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="CPF"
        leftElement={<CPFicon />}
      />
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="Senha"
        leftElement={<Password />}
      />
      {/* <Text margin="16px 0 0 0" align="center" fontName="TINY">
        Ao clicar em Cadastre-se você concorda com nossos:
      </Text> */}
      <span style={{ cursor: "pointer" }}>
        <Text
          margin="4px 0 0 0"
          align="center"
          color={Theme.colors.secondaryText}
          fontName="TINY"
        >
          Termos de uso e Políticas de Privacidade
        </Text>
      </span>
      <Button
        margin="24px 0 0 0"
        width={310}
        height={40}
        rounded
        title="Cadastre-se"
      />
    </NewAccountContainer>
  );
};

export default NewAccount;
