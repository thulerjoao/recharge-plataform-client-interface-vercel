import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import Fast from "./images/fast.png";
import PackageIcon from "./images/package.png";
import Shield from "./images/shield.png";
import User from "./images/user.png";
import { HowItWorksContainer } from "./style";

const HowItWorks = () => {
  return (
    <HowItWorksContainer>
      <Text
        tag="h2"
        fontName="LARGE_SEMI_BOLD"
        color={Theme.colors.mainlight}
        align="center"
      >
        COMO FUNCIONA
      </Text>
      <section className="howItWorksContent">
        <section>
          <div>
            <Image src={PackageIcon} alt="Package Icon" />
            <Text tag="p" fontName="TINY_MEDIUM" color={Theme.colors.mainlight}>
              1. Escolha um pacote
            </Text>
          </div>
          <div>
            <Image src={User} alt="User Icon" />
            <Text tag="p" fontName="TINY_MEDIUM" color={Theme.colors.mainlight}>
              2. Informe seu ID BIGO
            </Text>
          </div>
          <div>
            <Image src={Shield} alt="Shield Icon" />
            <Text tag="p" fontName="TINY_MEDIUM" color={Theme.colors.mainlight}>
              3. Pague com segurança
            </Text>
          </div>
          <div>
            <Image src={Fast} alt="Diamonds Icon" width={50} height={50} />
            <Text tag="p" fontName="TINY_MEDIUM" color={Theme.colors.mainlight}>
              4. Receba na hora!
            </Text>
          </div>
        </section>
      </section>
    </HowItWorksContainer>
  );
};

export default HowItWorks;
