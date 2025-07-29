"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserType } from "types/userTypes";

import { useDisableScroll } from "@4miga/hooks/useDisableScroll";
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
  setLoginModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ setLoginModal, openInNewAccount }: LoginModalProps) => {
  useDisableScroll(true);
  const route = useRouter();
  const [step, setStep] = useState<LoginSteps>(
    openInNewAccount ? "newAccount" : "login",
  );
  const [previousStep, setPreviousStep] = useState<
    "newAccount" | "newPassword" | null
  >(null);
  const [newUser, setNewUser] = useState<UserType>(null);
  const [mouseDownTarget, setMouseDownTarget] = useState<EventTarget>(null);
  const [askToRecover, setAskToRecover] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  // Check localStorage when component renders
  useEffect(() => {
    const savedTime = localStorage.getItem("askRecoverTime");

    if (savedTime) {
      const savedTimestamp = parseInt(savedTime);
      const currentTime = new Date().getTime();
      const elapsedSeconds = Math.floor((currentTime - savedTimestamp) / 1000);
      const remainingSeconds = Math.max(0, 60 - elapsedSeconds);

      if (remainingSeconds > 0) {
        setAskToRecover(true);
        setTimer(remainingSeconds);
      } else {
        localStorage.removeItem("askRecoverTime");
        setAskToRecover(false);
        setTimer(0);
      }
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!askToRecover || timer <= 0) return;

    const intervalId = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          localStorage.removeItem("askRecoverTime");
          setAskToRecover(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [askToRecover, timer]);

  // Function to activate recovery
  const activateTimer = () => {
    setAskToRecover(true);
    setTimer(60);
    localStorage.setItem("askRecoverTime", new Date().getTime().toString());
  };

  const closeModal = () => {
    setLoginModal && setLoginModal(false);
  };

  const handleBackward = () => {
    step === "forgotPassword" && setStep("login");
    step === "confirmCode" && setStep("login");
    step === "newPassword" && setStep("confirmCode");
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDownTarget(e.target);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseDownTarget === e.target) {
      closeModal();
    }
  };

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
          <LoginComponent
            setPreviousStep={setPreviousStep}
            setStep={setStep}
            closeModal={closeModal}
          />
        )}
        {step === "newAccount" && (
          <NewAccount
            setNewUser={setNewUser}
            setStep={setStep}
            setPreviousStep={setPreviousStep}
          />
        )}
        {step === "forgotPassword" && (
          <ForgotPassword
            setStep={setStep}
            setPreviousStep={setPreviousStep}
            askToRecover={askToRecover}
          />
        )}
        {step === "confirmCode" && (
          <ConfirmCode
            user={newUser}
            askToRecover={askToRecover}
            previousStep={previousStep}
            closeModal={closeModal}
            setStep={setStep}
            activateTimer={activateTimer}
            timer={timer}
          />
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
