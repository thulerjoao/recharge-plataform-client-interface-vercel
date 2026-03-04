"use client";

import { useState, useCallback } from "react";
import Confirm from "../public/components/confirm";

interface ConfirmState {
  message: string;
  isOpen: boolean;
  resolve: ((value: boolean) => void) | null;
}

export const useConfirm = () => {
  const [confirmState, setConfirmState] = useState<ConfirmState>({
    message: "",
    isOpen: false,
    resolve: null,
  });

  const confirm = useCallback((message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmState({
        message,
        isOpen: true,
        resolve,
      });
    });
  }, []);

  const handleConfirm = () => {
    if (confirmState.resolve) {
      confirmState.resolve(true);
    }
    setConfirmState({ message: "", isOpen: false, resolve: null });
  };

  const handleCancel = () => {
    if (confirmState.resolve) {
      confirmState.resolve(false);
    }
    setConfirmState({ message: "", isOpen: false, resolve: null });
  };

  const ConfirmComponent = confirmState.isOpen ? (
    <Confirm
      message={confirmState.message}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  ) : null;

  return { confirm, ConfirmComponent };
};

export const confirmToast = (message: string): Promise<boolean> => {
  console.warn(
    "confirmToast is deprecated. Use useConfirm hook instead in your component.",
  );
  return Promise.resolve(false);
};
