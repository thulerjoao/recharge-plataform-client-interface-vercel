import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useStore } from "contexts/store/StoreProvider";
import Email from "../../icons/Email.svg";
import Facebook from "../../icons/Facebook.svg";
import Instagram from "../../icons/Instagram.svg";
import TikTok from "../../icons/TikTok.svg";
import Wpp from "../../icons/Wpp.svg";
import { ContactContainer } from "./style";

const Contact = () => {
  const { store } = useStore();

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(store?.email);
      alert("Email copiado para área de transferência");
    } catch (err) {
      alert("Erro ao copiar email");
    }
  };

  return (
    <ContactContainer>
      <div className="topDiv">
        <Text
          align="center"
          color={Theme.colors.mainHighlight}
          fontName="REGULAR_MEDIUM"
        >
          Central de Atendimento
        </Text>
        {store?.wppNumber && (
          <a
            href={`https://api.whatsapp.com/send?phone=${store?.wppNumber}`}
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
            color={Theme.colors.mainHighlight}
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
