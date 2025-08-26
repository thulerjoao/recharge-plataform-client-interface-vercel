import { useState } from "react";
import { UserType } from "types/userTypes";
import LoginComponent from "./common/login";
import NewAccount from "./common/newAccount";
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
        {step === "login" && <LoginComponent setStep={setStep} />}
        {step === "newAccount" && <NewAccount />}

        {(step === "login" || step === "newAccount") && (
          <span
            className="newAccountButton"
            onClick={() => setStep(step === "login" ? "newAccount" : "login")}
          ></span>
        )}
      </LoginModalContainer>
    </LoginModalBackground>
  );
};

export default Login;
