import Button from "@4miga/design-system/components/button";
import { useTheme } from "styled-components";
import { ConfirmModalBackground, ConfirmModalContainer } from "./style";

interface ConfirmProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Confirm = ({ message, onConfirm, onCancel }: ConfirmProps) => {
  const theme = useTheme();
  return (
    <ConfirmModalBackground onClick={onCancel}>
      <ConfirmModalContainer onClick={(e) => e.stopPropagation()}>
        <p className="message">{message}</p>
        <div className="buttons">
          <Button
            onClick={onCancel}
            title="Cancelar"
            width={120}
            height={32}
            rounded
            isNotSelected
            style={{ color: theme.text_01 }}
          />
          <Button
            onClick={onConfirm}
            title="Confirmar"
            width={120}
            height={32}
            rounded
          />
        </div>
      </ConfirmModalContainer>
    </ConfirmModalBackground>
  );
};

export default Confirm;
