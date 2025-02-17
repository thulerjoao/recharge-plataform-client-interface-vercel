import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import React, { useState } from "react";
import ConfirmCode from "./common/confirmCode";
import ForgotPassword from "./common/forgotPassword";
import LoginComponent from "./common/login";
import NewAccount from "./common/newAccount";
import NewPassword from "./common/newPassword";
import Backward from "./icons/Backward.svg";
import Close from "./icons/Close.svg";
import TopLogo from "./icons/topLogo.svg";
import { LoginModalBackground, LoginModalContainer } from "./style";
import { LoginSteps } from "./types/types";

interface LoginModalProps {
  openInNewAccount?: boolean;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ setLoginModal, openInNewAccount }: LoginModalProps) => {
  const [step, setStep] = useState<LoginSteps>(
    openInNewAccount ? "newAccount" : "login",
  );

  const closeModal = () => {
    setLoginModal(false);
  };

  const handleBackward = () => {
    step === "forgotPassword" && setStep("login");
    step === "confirmCode" && setStep("forgotPassword");
    step === "newPassword" && setStep("confirmCode");
  };

  return (
    <LoginModalBackground onClick={() => setLoginModal(false)}>
      <LoginModalContainer onClick={(e) => e.stopPropagation()}>
        <div className="close">
          <span onClick={() => handleBackward()}>
            {step !== "login" && step !== "newAccount" && <Backward />}
          </span>
          <span onClick={() => setLoginModal(false)}>
            <Close />
          </span>
        </div>
        <TopLogo />
        {step === "login" && (
        <LoginComponent setStep={setStep} closeModal={closeModal} />
        )}
        {step === "newAccount" && <NewAccount />}
        {step === "forgotPassword" && <ForgotPassword setStep={setStep} />}
        {step === "confirmCode" && <ConfirmCode setStep={setStep} />}
        {step === "newPassword" && <NewPassword closeModal={closeModal} />}

        {(step === "login" || step === "newAccount") && (
          <span
            className="newAccountButton"
            onClick={() => setStep(step === "login" ? "newAccount" : "login")}
          >
            <Text
              margin="24px 0 0 0"
              fontName="SMALL"
              align="center"
              color={Theme.colors.mainHighlight}
            >
              {step === "login" ? "Criar uma conta" : "Já possui uma conta?"}
            </Text>
          </span>
        )}
      </LoginModalContainer>
    </LoginModalBackground>
  );
};

export default LoginModal;
