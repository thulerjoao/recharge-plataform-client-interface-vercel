import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import React, { useEffect, useState } from "react";
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
  handleLogin: () => void;
  reseller?: boolean;
  openInNewAccount?: boolean;
  loginModal?: boolean;
  setLoginModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({
  handleLogin,
  reseller,
  loginModal,
  setLoginModal,
  openInNewAccount,
}: LoginModalProps) => {
  const [check, setIsCheck] = useState<boolean>(true);
  const [step, setStep] = useState<LoginSteps>(
    openInNewAccount ? "newAccount" : "login",
  );

  // useEffect(() => {
  //   if (loginModal) {
  //     document.documentElement.style.overflowY = "hidden";
  //     document.body.style.overflowY = "scroll";
  //   } else {
  //     document.documentElement.style.overflowY = "scroll";
  //   }

  //   return () => {
  //     document.documentElement.style.overflowY = "scroll";
  //     document.body.style.overflowY = "hidden";
  //   };
  // }, [loginModal]);

  const closeModal = () => {
    setLoginModal(false);
  };

  const handleBackward = () => {
    step === "forgotPassword" && setStep("login");
    step === "confirmCode" && setStep("forgotPassword");
    step === "newPassword" && setStep("confirmCode");
  };

  return (
    <LoginModalBackground onClick={() => !reseller && setLoginModal(false)}>
      <LoginModalContainer onClick={(e) => e.stopPropagation()}>
        <div className="close">
          <span onClick={() => handleBackward()}>
            {step !== "login" && step !== "newAccount" && <Backward />}
          </span>
          <span onClick={() => !reseller && setLoginModal(false)}>
            {!reseller && <Close />}
          </span>
        </div>
        <TopLogo />
        {step === "login" && (
          <LoginComponent
            setStep={setStep}
            handleLogin={handleLogin}
            closeModal={!reseller && closeModal}
            check={check}
            setIsCheck={setIsCheck}
          />
        )}
        {step === "newAccount" && <NewAccount />}
        {step === "forgotPassword" && <ForgotPassword setStep={setStep} />}
        {step === "confirmCode" && <ConfirmCode setStep={setStep} />}
        {step === "newPassword" && (
          <NewPassword handleLogin={handleLogin} closeModal={closeModal} />
        )}

        {(step === "login" || step === "newAccount") && (
          <span
            className="newAccountButton"
            onClick={() => setStep(step === "login" ? "newAccount" : "login")}
          >
            {!reseller && (
              <Text
                margin="24px 0 0 0"
                fontName="SMALL"
                align="center"
                color={Theme.colors.mainHighlight}
              >
                {step === "login" ? "Criar uma conta" : "Já possui uma conta?"}
              </Text>
            )}
          </span>
        )}
      </LoginModalContainer>
    </LoginModalBackground>
  );
};

export default LoginModal;
