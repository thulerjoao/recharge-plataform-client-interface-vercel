"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import OnOff from "@4miga/design-system/components/onOff";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import CameraIcon from "../../common/icons/CameraIcon.svg";
import Pen from "../../common/icons/Pen.svg";
import BigoCard from "../../common/temp/bigoCard.svg";
import { ConfigPackagePage } from "./style";

type Props = {
  params: {
    slug: string;
    childSlug: string;
  };
};

const Page = ({ params }: Props) => {
  return (
    <ConfigPackagePage>
      <HeaderEnviroment>
        <DefaultHeader backWard title="CONFIGURAR PACOTE" />
      </HeaderEnviroment>
      <main>
        <div className="topContainer">
          <Text fontName="LARGE_MEDIUM">BIGO LIVE</Text>
          <Text tag="h3" align="end" underline fontName="REGULAR">
            Desativar Pacote
          </Text>
        </div>
        <section className="packageSettings">
          <div className="leftContainer">
            <span className="pen">
              <Pen />
            </span>
            <Text fontName="REGULAR_SEMI_BOLD">NOME DO PACOTE</Text>
            <Input margin="16px 0 0 0" height={53} />
            <div className="bottomLeftContainer">
              <Text nowrap fontName="REGULAR_SEMI_BOLD">
                QUANTIDADE DE CRÉDITOS:
              </Text>
              <Text
                align="end"
                color={Theme.colors.mainHighlight}
                fontName="REGULAR_SEMI_BOLD"
              >
                30
              </Text>
            </div>
            <div className="bottomLeftContainer">
              <Text nowrap fontName="REGULAR_SEMI_BOLD">
                DEFINIR COMO OFERTA:
              </Text>
              <OnOff onOff={true} />
            </div>
          </div>
          <div className="rightContainer">
            <Text align="center" fontName="REGULAR_SEMI_BOLD">
              IMAGEM DO PACOTE
            </Text>
            <Text margin="16px 0 0 0" align="center" fontName="TINY_MEDIUM">
              A imagem deve estar no formato .png, .jpg ou .jpeg, ter uma
              resolução mínima de 480 x 480 e uma proporção de 1:1
            </Text>
            <span className="packageImage">
              <BigoCard />
            </span>
            <Button
              leftElement={<CameraIcon />}
              rounded
              margin="16px 0 0 0"
              height={32}
              width={181}
              title="Atualizar imagem"
            />
          </div>
        </section>
      </main>
    </ConfigPackagePage>
  );
};

export default Page;
