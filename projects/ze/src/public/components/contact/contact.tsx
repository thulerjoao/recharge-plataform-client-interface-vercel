import Text from "@4miga/design-system/components/Text";
import { useStore } from "contexts/store/StoreProvider";
import { useTheme } from "styled-components";
import Email from "../../icons/Email.svg";
import Facebook from "../../icons/Facebook.svg";
import Instagram from "../../icons/Instagram.svg";
import TikTok from "../../icons/TikTok.svg";
import Wpp from "../../icons/Wpp.svg";
import { ContactContainer } from "./style";
import toast from "react-hot-toast";

const Contact = () => {
  const theme = useTheme();
  const { store } = useStore();

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(store?.email);
      toast.success("Email copiado para área de transferência");
    } catch (err) {
      toast.error("Erro ao copiar email");
    }
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) return "";
    return phoneNumber.replace(/\D/g, "");
  };

  return (
    <ContactContainer>
      <div className="topDiv">
        <Text
          align="center"
          color={theme.mainColor}
          fontName="REGULAR_MEDIUM"
        >
          Central de Atendimento
        </Text>
        {store?.wppNumber && (
          <a
            href={`https://api.whatsapp.com/send?phone=55${formatPhoneNumber(store?.wppNumber)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <figure>
              <Wpp />
            </figure>
            <Text align="center" fontName="REGULAR" margin="0 0 0 8px">
              {store?.wppNumber}
            </Text>
          </a>
        )}
        {store?.email && (
          <span onClick={copyEmailToClipboard}>
            <figure>
              <Email />
            </figure>
            <Text align="center" fontName="REGULAR" margin="0 0 0 8px">
              {store?.email}
            </Text>
          </span>
        )}
      </div>
      {(store?.instagramUrl || store?.facebookUrl || store?.tiktokUrl) && (
        <div>
          <Text
            align="center"
            color={theme.mainColor}
            fontName="REGULAR_MEDIUM"
          >
            Redes Sociais
          </Text>
          <span>
            {store?.instagramUrl && (
              <a
                href={`https://instagram.com/${store?.instagramUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="socialMedia"
              >
                <Instagram />
              </a>
            )}
            {store?.facebookUrl && (
              <a
                href={`https://facebook.com/${store?.facebookUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="socialMedia"
              >
                <Facebook />
              </a>
            )}
            {store?.tiktokUrl && (
              <a
                href={`https://tiktok.com/${store?.tiktokUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="socialMedia"
              >
                <TikTok />
              </a>
            )}
          </span>
        </div>
      )}
    </ContactContainer>
  );
};

export default Contact;
