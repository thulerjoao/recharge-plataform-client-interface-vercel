"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { ModalOverlay, ModalContent } from "./style";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  password: string;
  setPassword: (value: string) => void;
  loading: boolean;
  userName: string;
}

const PasswordModal = ({
  isOpen,
  onClose,
  onConfirm,
  password,
  setPassword,
  loading,
  userName,
}: PasswordModalProps) => {
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
          <Text fontName="SMALL" color={Theme.colors.secondaryText}>
            Promovendo:
          </Text>
          <Text fontName="REGULAR_SEMI_BOLD" color={Theme.colors.mainlight}>
            {userName}
          </Text>
        </div>

        <div className="modalBody">
          <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainlight}>
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

