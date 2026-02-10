import Text from "@4miga/design-system/components/Text";
import Image from "next/image";
import { useTheme } from "styled-components";
import Fast from "./images/fast.png";
import PackageIcon from "./images/package.png";
import Shield from "./images/shield.png";
import User from "./images/user.png";
import { HowItWorksContainer } from "./style";

const HowItWorks = () => {
  const theme = useTheme();
  return (
    <HowItWorksContainer>
      <Text
        tag="h2"
        fontName="LARGE_SEMI_BOLD"
        color={theme.text_01}
        align="center"
      >
        COMO FUNCIONA
      </Text>
      <section className="howItWorksContent">
        <section>
          <div>
            <Image
              src={PackageIcon}
              alt="Ícone de pacote - Escolha um pacote"
              width={50}
              height={50}
              quality={75}
            />
            <Text
              nowrap
              tag="p"
              fontName="TINY_MEDIUM"
              color={theme.text_01}
            >
              1. Escolha um pacote
            </Text>
          </div>
          <div>
            <Image
              src={User}
              alt="Ícone de usuário - Informe seu ID BIGO"
              width={50}
              height={50}
              quality={75}
            />
            <Text
              nowrap
              tag="p"
              fontName="TINY_MEDIUM"
              color={theme.text_01}
            >
              2. Informe seu ID BIGO
            </Text>
          </div>
          <div>
            <Image
              src={Shield}
              alt="Ícone de segurança - Pague com segurança"
              width={50}
              height={50}
              quality={75}
            />
            <Text
              nowrap
              tag="p"
              fontName="TINY_MEDIUM"
              color={theme.text_01}
            >
              3. Pague com segurança
            </Text>
          </div>
          <div>
            <Image
              src={Fast}
              alt="Ícone de raio - Receba na hora!"
              width={50}
              height={50}
              quality={75}
            />
            <Text
              nowrap
              tag="p"
              fontName="TINY_MEDIUM"
              color={theme.text_01}
            >
              4. Receba na hora!
            </Text>
          </div>
        </section>
      </section>
    </HowItWorksContainer>
  );
};

export default HowItWorks;
