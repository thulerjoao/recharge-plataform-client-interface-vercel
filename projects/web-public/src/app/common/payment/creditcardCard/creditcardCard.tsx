import { Theme } from "@4miga/design-system/theme/theme";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { InputHTMLAttributes, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import CreditCard from "../../icons/CreditCard.svg";
import DownArrow from "../../icons/DownArrow.svg";
import UpArrow from "../../icons/UpArrow.svg";
import { BottomElement, CreditCardContainer } from "./style";

const CreditcardCard = () => {
  const [expand, setExpend] = useState<boolean>(false);
  const [isRounded, setIsRounded] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(false);

  const handleFirstExpand = () => {
    if (!initialized) {
      setInitialized(true);
    }
    setExpend(!expand);
  };

  useEffect(() => {
    if (!expand) {
      setTimeout(() => {
        setIsRounded(true);
      }, 400);
    } else {
      setIsRounded(false);
    }
  }, [expand]);

  return (
    <>
      <CreditCardContainer
        onClick={() => handleFirstExpand()}
        expand={expand}
        isRounded={isRounded}
        initialized={initialized}
      >
        <div className="headerText">
          <span>
            <CreditCard />
          </span>
          <Text fontName="REGULAR_MEDIUM" color={Theme.colors.maindark}>
            Cartão de crédito
          </Text>
        </div>
        <span className="downArrow">
          {expand ? <UpArrow /> : <DownArrow />}
        </span>
      </CreditCardContainer>
      <BottomElement
        expand={expand}
        isRounded={isRounded}
        initialized={initialized}
      >
        <div className="valueToPay">
          <div style={{ width: "300px" }}>
            <Text fontName="LARGE_MEDIUM" color={Theme.colors.maindark}>
              Valor para pagamento
            </Text>
          </div>
          <div>
            <Text
              align="end"
              fontName="LARGE_SEMI_BOLD"
              color={Theme.colors.maindark}
            >
              R$ 12,00
            </Text>
          </div>
        </div>
        <InputMask
          mask="9999 9999 9999 9999"
          maskChar=""
          className="creditCardNumber"
        >
          {(inputProps: InputHTMLAttributes<HTMLInputElement>) => (
            <Input
              {...inputProps}
              height={48}
              title="Número do Cartão"
              placeholder="0000 0000 0000 0000"
            />
          )}
        </InputMask>

        <div className="userName">
          <Input
            height={48}
            title="Nome escrito no cartão"
            placeholder="Nome do titular"
          />
        </div>
        <InputMask mask="999.999.999-99" maskChar="" className="userCPF">
          {(inputProps: InputHTMLAttributes<HTMLInputElement>) => (
            <Input
              {...inputProps}
              height={48}
              title="CPF do titular"
              placeholder="000.000.000-00"
            />
          )}
        </InputMask>
        <div className="bottomInputs">
          <InputMask mask="99/99" maskChar="">
            {(inputProps: InputHTMLAttributes<HTMLInputElement>) => (
              <Input
                {...inputProps}
                height={48}
                title="Validade"
                style={{ width: "96%" }}
                placeholder="MM/AA"
              />
            )}
          </InputMask>
          <InputMask mask="999" maskChar="">
            {(inputProps: InputHTMLAttributes<HTMLInputElement>) => (
              <Input
                {...inputProps}
                height={48}
                title="CVV"
                style={{ width: "100%" }}
                placeholder="000"
              />
            )}
          </InputMask>
        </div>
        <div className="bottomButtons">
          <Button
            style={{ width: "80%" }}
            isNotSelected
            title="Cancelar"
            height={40}
            rounded
          />
          <Button
            style={{ marginLeft: "16px" }}
            title="Confirmar"
            height={40}
            rounded
          />
        </div>
      </BottomElement>
    </>
  );
};

export default CreditcardCard;
