import Button from "@4miga/design-system/components/button";
import { Theme } from "@4miga/design-system/theme/theme";
import { ConfirmModalBackground, ConfirmModalContainer } from "./style";

interface ConfirmProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Confirm = ({ message, onConfirm, onCancel }: ConfirmProps) => {
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
            style={{ color: Theme.colors.mainlight }}
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
