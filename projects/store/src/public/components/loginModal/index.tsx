"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserType } from "types/userTypes";
import { disableScroll } from "utils/disableScroll";
import ConfirmCode from "./common/confirmCode";
import ConfirmCodePass from "./common/confirmCodePass";
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
  setLoginModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ setLoginModal, openInNewAccount }: LoginModalProps) => {
  const route = useRouter();
  const [step, setStep] = useState<LoginSteps>(
    openInNewAccount ? "newAccount" : "login",
  );
  const [previousStep, setPreviousStep] = useState<
    "newAccount" | "newPassword" | null
  >(null);
  const [newUser, setNewUser] = useState<UserType>(null);
  const [mouseDownTarget, setMouseDownTarget] = useState<EventTarget>(null);

  const closeModal = () => {
    setLoginModal && setLoginModal(false);
  };

  const handleBackward = () => {
    step === "forgotPassword" && setStep("login");
    step === "confirmCodePass" && setStep("forgotPassword");
    step === "newPassword" && setStep("confirmCodePass");
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDownTarget(e.target);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseDownTarget === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    disableScroll(true);
    return () => {
      disableScroll(false);
    };
  }, []);

  return (
    <LoginModalBackground
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <LoginModalContainer onMouseDown={(e) => e.stopPropagation()}>
        <div className="close">
          <span onClick={() => handleBackward()}>
            {step !== "login" && step !== "newAccount" && <Backward />}
          </span>
          <span
            onClick={() =>
              setLoginModal ? setLoginModal(false) : route.replace("/home")
            }
          >
            <Close />
          </span>
        </div>
        <TopLogo />
        {step === "login" && (
          <LoginComponent setStep={setStep} closeModal={closeModal} />
        )}
        {step === "newAccount" && (
          <NewAccount
            setNewUser={setNewUser}
            setStep={setStep}
            setPreviousStep={setPreviousStep}
          />
        )}
        {step === "forgotPassword" && <ForgotPassword setStep={setStep} />}
        {step === "confirmCode" && (
          <ConfirmCode
            user={newUser}
            previousStep={previousStep}
            closeModal={closeModal}
            setStep={setStep}
          />
        )}
        {step === "confirmCodePass" && (
          <ConfirmCodePass closeModal={closeModal} />
        )}
        {step === "newPassword" && <NewPassword closeModal={closeModal} />}

        {(step === "login" || step === "newAccount") && (
          <span
            className="newAccountButton"
            onClick={() => setStep(step === "login" ? "newAccount" : "login")}
          >
            <Text
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
