import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import React from "react";
import Arrow from "../icons/Arrow.svg";
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
          Deseja confirmar alterações?
        </Text>
        <Text margin="32px 0 4px 0" align="center" fontName="SMALL_MEDIUM">
          Valor de Lucro PIX
        </Text>
        <div className="afterAndBefore">
          <Text align="center" fontName="SMALL">
            R$ 1,90
          </Text>
          <span className="arrow">
            <Arrow />
          </span>
          <Text align="center" fontName="SMALL">
            R$ 2,10
          </Text>
        </div>
        <span className="line" />
        <Text margin="8px 0 4px 0" align="center" fontName="SMALL_MEDIUM">
          Valor de Lucro PIX
        </Text>
        <div className="afterAndBefore">
          <Text align="center" fontName="SMALL">
            R$ 1,90
          </Text>
          <span className="arrow">
            <Arrow />
          </span>
          <Text align="center" fontName="SMALL">
            R$ 2,10
          </Text>
        </div>
        <Button
          onClick={() => setconfirmModal(false)}
          margin="48px 0 0 0"
          rounded
          height={40}
          title="Confirmar"
        />
      </section>
    </ConfirmModalContainer>
  );
};

export default ConfirmModal;
