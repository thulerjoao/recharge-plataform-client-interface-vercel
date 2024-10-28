import Text from "@4miga/design-system/components/Text";
import { LoginComponentContainer } from "./style";
import Input from "@4miga/design-system/components/input";
import { Theme } from "@4miga/design-system/theme/theme";
import React from "react";
import Email from "../../icons/Email.svg";
import Password from "../../icons/Password.svg";

interface Props {
  check: boolean;
  setIsCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginComponent = ({ check, setIsCheck }: Props) => {
  return (
    <LoginComponentContainer>
      <Text margin="24px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
        Entre para acessar sua ocnta
      </Text>
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
        placeholder="Senha"
        leftElement={<Password />}
      />
      <div className="keepConnected">
        <div className="check" onClick={() => setIsCheck(!check)}>
          <span className="checkIcon">
            <span className={check && "fill"} />
          </span>
          <Text margin="0 0 0 4px" nowrap fontName="TINY">
            Continuar conectado
          </Text>
        </div>
        <span className="forgotPassword">
          <Text
            nowrap
            align="end"
            color={Theme.colors.mainHighlight}
            fontName="TINY"
          >
            Esqueceu sua senha?
          </Text>
        </span>
      </div>
    </LoginComponentContainer>
  );
};

export default LoginComponent;
