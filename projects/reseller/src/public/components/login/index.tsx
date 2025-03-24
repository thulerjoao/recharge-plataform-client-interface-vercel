import { useState } from "react";
import { UserType } from "types/userTypes";
import ConfirmCode from "./common/confirmCode";
import ConfirmCodePass from "./common/confirmCodePass";
import ForgotPassword from "./common/forgotPassword";
import LoginComponent from "./common/login";
import NewAccount from "./common/newAccount";
import NewPassword from "./common/newPassword";
import Backward from "./icons/Backward.svg";
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
  const [previousStep, setPreviousStep] = useState<
    "newAccount" | "newPassword" | null
  >(null);
  const [newPassRes, setNewPassRes] = useState<{ email: string; code: number }>(
    null,
  );
  const [newUser, setNewUser] = useState<UserType>(null);
  const handleBackward = () => {
    step === "forgotPassword" && setStep("login");
    step === "confirmCode" && setStep("forgotPassword");
    step === "newPassword" && setStep("confirmCode");
  };

  return (
    <LoginModalBackground>
      <LoginModalContainer onClick={(e) => e.stopPropagation()}>
        <div className="close">
          <span onClick={() => handleBackward()}>
            {step !== "login" && step !== "newAccount" && <Backward />}
          </span>
        </div>
        <TopLogo />
        {step === "login" && <LoginComponent setStep={setStep} />}
        {step === "newAccount" && <NewAccount />}
        {step === "forgotPassword" && <ForgotPassword setStep={setStep} />}
        {step === "confirmCode" && (
          <ConfirmCode
            user={newUser}
            previousStep={previousStep}
            setStep={setStep}
          />
        )}
        {step === "confirmCodePass" && <ConfirmCodePass />}
        {step === "newPassword" && <NewPassword newPassRes={newPassRes} />}

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
