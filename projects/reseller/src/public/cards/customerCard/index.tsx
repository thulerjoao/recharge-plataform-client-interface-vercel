"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
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
        color={Theme.colors.mainlight}
        className="cardLine cardName"
      >
        {name}
      </Text>
      <Text
        fontName="REGULAR_MEDIUM"
        color={Theme.colors.secondaryText}
        className="cardLine cardEmail"
      >
        {email}
      </Text>
      <div className="cardContactWrapper">
        <Text
          fontName="REGULAR_MEDIUM"
          color={Theme.colors.secondaryText}
          className="cardLine cardPhone"
        >
          Telefone: {phone}
        </Text>
        <Text
          fontName="REGULAR_MEDIUM"
          color={Theme.colors.secondaryText}
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
