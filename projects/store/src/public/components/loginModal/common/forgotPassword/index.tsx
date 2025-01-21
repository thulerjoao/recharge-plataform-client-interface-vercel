import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import React from "react";
import Email from "../../icons/Email.svg";
import Password from "../../icons/Password.svg";
import { LoginSteps } from "../../types/types";
import { ForgotPasswordContainer } from "./style";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<LoginSteps>>;
}

const ForgotPassword = ({ setStep }: Props) => {
  return (
    <ForgotPasswordContainer>
      <Text margin="24px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
        Digite seu e-mail para recuperar sua senha
      </Text>
      <Input
        margin="24px 0 0 0"
        padding="0 8px 0px 40px"
        height={40}
        placeholder="E-mail"
        leftElement={<Email />}
      />
      <Button
        onClick={() => {
          setStep("confirmCode");
        }}
        margin="24px 0 0 0"
        width={310}
        height={40}
        rounded
        title="Continuar"
      />
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
