"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { createContext, ReactNode, useContext, useState } from "react";
import styled from "styled-components";

const ConfirmModalBackground = styled.div`
  z-index: 9998;
  position: fixed;
  background-color: ${Theme.colors.modalBackground};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmModalContainer = styled.div`
  width: 100%;
  max-width: 480px;
  background-color: ${Theme.colors.maindark};
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 32px 24px 24px 24px;
  -webkit-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
  -moz-box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
  box-shadow: 0px 0px 5px 2px rgba(7, 29, 35, 1);
  gap: 24px;

  .message {
    color: ${Theme.colors.mainlight};
    text-align: center;
    white-space: pre-line;
  }

  .buttons {
    display: flex;
    gap: 16px;
    justify-content: flex-end;
  }

  .button {
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  .cancel-button {
    background-color: ${Theme.colors.mainTransparent};
    color: ${Theme.colors.mainlight};
  }

  .confirm-button {
    background-color: ${Theme.colors.mainHighlight};
    color: ${Theme.colors.maindark};
  }
`;

interface ConfirmContextType {
  confirm: (message: string) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within ConfirmProvider");
  }
  return context;
};

interface ConfirmProviderProps {
  children: ReactNode;
}

export const ConfirmProvider = ({ children }: ConfirmProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [resolvePromise, setResolvePromise] = useState<
    ((value: boolean) => void) | null
  >(null);

  const confirm = (msg: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setMessage(msg);
      setIsOpen(true);
      setResolvePromise(() => resolve);
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (resolvePromise) {
      resolvePromise(true);
      setResolvePromise(null);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolvePromise) {
      resolvePromise(false);
      setResolvePromise(null);
    }
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {isOpen && (
        <ConfirmModalBackground onClick={handleCancel}>
          <ConfirmModalContainer onClick={(e) => e.stopPropagation()}>
            <Text tag="p" className="message" fontName="REGULAR">
              {message}
            </Text>
            <div className="buttons">
              <button className="button cancel-button" onClick={handleCancel}>
                Cancelar
              </button>
              <button className="button confirm-button" onClick={handleConfirm}>
                Confirmar
              </button>
            </div>
          </ConfirmModalContainer>
        </ConfirmModalBackground>
      )}
    </ConfirmContext.Provider>
  );
};
