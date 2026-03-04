import { useState } from "react";
import LoginComponent from "./common/login";
import TopLogo from "./icons/topLogo.svg";
import { LoginModalBackground, LoginModalContainer } from "./style";
import { LoginSteps } from "./types/types";
import Text from "@4miga/design-system/components/Text";

interface LoginModalProps {
  openInNewAccount?: boolean;
}

const Login = ({ openInNewAccount }: LoginModalProps) => {
  const [step, setStep] = useState<LoginSteps>(
    openInNewAccount ? "newAccount" : "login",
  );

  return (
    <LoginModalBackground>
      <LoginModalContainer onClick={(e) => e.stopPropagation()}>
        <TopLogo />
        {/* <Text margin="24px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
          Painel de controle de recargas
        </Text> */}
        <LoginComponent setStep={setStep} />
      </LoginModalContainer>
    </LoginModalBackground>
  );
};

export default Login;
