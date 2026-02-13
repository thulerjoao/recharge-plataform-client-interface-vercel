"use client";

import Text from "@4miga/design-system/components/Text";
import { useTheme } from "styled-components";
import { CustomerCardContainer } from "./style";
import TrashIcon from "../../icons/Trash.svg";

export interface CustomerCardDisplayData {
  name: string;
  email: string;
  phone: string;
  documentValue: string;
}

export interface CustomerCardDeleteAction {
  confirmMessage: string;
  confirm: (message: string) => Promise<boolean>;
  onConfirm: () => void | Promise<void>;
}

interface CustomerCardProps {
  displayData: CustomerCardDisplayData;
  isExcluded?: boolean;
  deleteAction?: CustomerCardDeleteAction;
}

const CustomerCard = ({
  displayData,
  isExcluded,
  deleteAction,
}: CustomerCardProps) => {
  const theme = useTheme();
  const { name, email, phone, documentValue } = displayData;

  // eslint-disable-next-line no-undef
  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!deleteAction) return;
    const confirmed = await deleteAction.confirm(deleteAction.confirmMessage);
    if (confirmed) {
      await deleteAction.onConfirm();
    }
  };

  return (
    <CustomerCardContainer $isExcluded={isExcluded}>
      <Text
        fontName="REGULAR_SEMI_BOLD"
        color={theme.text_01}
        className="cardLine cardName"
      >
        {name}
      </Text>
      <Text
        fontName="REGULAR_MEDIUM"
        color={theme.text_03}
        className="cardLine cardEmail"
      >
        {email}
      </Text>
      <div className="cardContactWrapper">
        <Text
          fontName="REGULAR_MEDIUM"
          color={theme.text_03}
          className="cardLine cardPhone"
        >
          Telefone: {phone}
        </Text>
        <Text
          fontName="REGULAR_MEDIUM"
          color={theme.text_03}
          className="cardLine cardCpf"
        >
          CPF: {documentValue}
        </Text>
      </div>
      {deleteAction && (
        <button
          type="button"
          className="deleteIconButton"
          onClick={handleDeleteClick}
          aria-label="Excluir usuário"
        >
          <TrashIcon />
        </button>
      )}
    </CustomerCardContainer>
  );
};

export default CustomerCard;
