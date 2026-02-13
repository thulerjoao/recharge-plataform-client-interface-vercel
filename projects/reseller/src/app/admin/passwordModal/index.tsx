"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { useTheme } from "styled-components";
import React from "react";
import { ModalContent, ModalOverlay } from "./style";

interface PasswordModalProps {
  modalAction: "promote" | "demote";
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  password: string;
  setPassword: (value: string) => void;
  loading: boolean;
  email: string;
}

const PasswordModal = ({
  modalAction,
  isOpen,
  onClose,
  onConfirm,
  password,
  setPassword,
  loading,
  email,
}: PasswordModalProps) => {
  const theme = useTheme();
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={onClose} type="button">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="userEmail">
          <Text fontName="SMALL" color={theme.text_03}>
            {modalAction === "promote" ? "Promovendo:" : "Rebaixando:"}
          </Text>
          <Text fontName="REGULAR_SEMI_BOLD" color={theme.text_01}>
            {email}
          </Text>
        </div>

        <div className="modalBody">
          <Text fontName="REGULAR_MEDIUM" color={theme.text_01}>
            Confirme sua senha para concluir
          </Text>
          <form onSubmit={handleSubmit}>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha..."
              height={40}
              autoFocus
            />
          </form>
        </div>

        <div className="modalFooter">
          <Button
            onClick={onConfirm}
            title={loading ? "CONFIRMANDO..." : "CONFIRMAR"}
            width={180}
            height={36}
            rounded
            disabled={!password || loading}
          />
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PasswordModal;
