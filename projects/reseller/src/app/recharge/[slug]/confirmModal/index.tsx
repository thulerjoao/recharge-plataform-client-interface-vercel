import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import React from "react";
import Close from "../icons/Close.svg";
import { ConfirmModalContainer } from "./style";

interface ModalProps {
  setconfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmModal = ({ setconfirmModal }: ModalProps) => {
  return (
    <ConfirmModalContainer
      className="close"
      onClick={() => setconfirmModal(false)}
    >
      <section className="mainContent" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={() => setconfirmModal(false)}>
          <Close />
        </span>
        <Text align="center" fontName="REGULAR_MEDIUM">
          Deseja confirmar a recarga?
        </Text>
        <div className="buttonsContainer">
          <Button
            isNotSelected
            onClick={() => setconfirmModal(false)}
            margin="0 8px 0 0"
            rounded
            height={40}
            title="voltar"
          />
          <Button
            onClick={() => setconfirmModal(false)}
            margin="0 0 0 8px"
            rounded
            height={40}
            title="Confirmar"
          />
        </div>
      </section>
    </ConfirmModalContainer>
  );
};

export default ConfirmModal;
