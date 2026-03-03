"use client";

import Text from "@4miga/design-system/components/Text";
import { useStore } from "contexts/store/StoreProvider";
import { useTheme } from "styled-components";
import Wpp from "../../icons/Wpp.svg";
import { WhatsAppButton, WhatsAppGlobalContainer } from "./style";

//specific phone number for testing
const TEST_PHONE_NUMBER = "";

const WhatsAppFloatingButton = () => {
  const theme = useTheme();
  const { store } = useStore();

  const formatPhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) return "";
    return phoneNumber.replace(/\D/g, "");
  };

  const wppNumber = TEST_PHONE_NUMBER || store?.wppNumber;

  if (!wppNumber) {
    return null;
  }

  const phoneNumber = `55${formatPhoneNumber(wppNumber)}`;
  const message = encodeURIComponent("Olá! Preciso de ajuda.");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

  return (
    <WhatsAppGlobalContainer>
      <div className="mainContainer">
        <WhatsAppButton
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
        >
          <Wpp />
          <div className="bottomText">
            <Text
              align="center"
              color={theme.whatsappBackground}
              fontName="TINY"
            >
              Ajuda?
            </Text>
          </div>
        </WhatsAppButton>
      </div>
    </WhatsAppGlobalContainer>
  );
};

export default WhatsAppFloatingButton;
