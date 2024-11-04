import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import React from "react";
import { LoginSteps } from "../../types/types";
import { ConfirmCodeContainer } from "./style";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
}

const ConfirmCode = ({ setStep }: Props) => {
  return (
    <ConfirmCodeContainer>
      <Text margin="24px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
        Confirme o código que foi enviado para seu e-mail
      </Text>
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder=""
      />
      <Button
        onClick={() => {
          setStep("newPassword");
        }}
        margin="24px 0 0 0"
        width={310}
        height={40}
        rounded
        title="Enviar"
      />
    </ConfirmCodeContainer>
  );
};

export default ConfirmCode;
