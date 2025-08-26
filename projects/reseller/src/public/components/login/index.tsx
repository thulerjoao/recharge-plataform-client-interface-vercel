import { useState } from "react";
import LoginComponent from "./common/login";
import TopLogo from "./icons/topLogo.svg";
import { LoginModalBackground, LoginModalContainer } from "./style";
import { LoginSteps } from "./types/types";

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
        <LoginComponent setStep={setStep} />
      </LoginModalContainer>
    </LoginModalBackground>
  );
};

export default Login;
