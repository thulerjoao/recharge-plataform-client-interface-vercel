"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import HeaderEnviroment from "public/components/headerEnviroment";
import DefaultHeader from "../common/components/defaultHeader";
import Pix from "../common/icons/Pix.svg";
import Card1 from "../common/temp/Card1.png";
import Card3 from "../common/temp/Card3.png";
import { SalesInnerPage } from "./style";

type Props = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: Props) => {
  return (
    <SalesInnerPage>
      <HeaderEnviroment>
        <DefaultHeader title="DETALHES DA VENDA" />
      </HeaderEnviroment>
      <div>
        <Text margin="96px 0 0 0" align="center" fontName="LARGE_MEDIUM">
          BIGO LIVE
        </Text>
      </div>
      <main>
        <section className="top">
          <div className="leftTop">
            <Image src={Card1} alt="Card do jogo" />
            <Text margin="24px 0 0 0" fontName="SMALL_MEDIUM">
              Número do pedido
            </Text>
            <Text fontName="SMALL_MEDIUM">ID de usuário</Text>
            <Text fontName="SMALL_MEDIUM">Nome</Text>
            <Text fontName="SMALL_MEDIUM">E-mail</Text>
            <Text fontName="SMALL_MEDIUM">Telefone</Text>
          </div>
          <div className="rightTop">
            <Text tag="h2" align="end" fontName="REGULAR_MEDIUM">
              Bigo 3000 diamantes
            </Text>
            <Text
              tag="h3"
              align="end"
              fontName="TINY"
              color={Theme.colors.secondaryText}
            >
              Hoje, 11:23
            </Text>
            <Text align="end" fontName="SMALL_MEDIUM">
              4321-12345
            </Text>
            <Text align="end" fontName="SMALL_MEDIUM">
              12345
            </Text>
            <Text align="end" fontName="SMALL_MEDIUM">
              Maria Silva Santos
            </Text>
            <Text align="end" fontName="SMALL_MEDIUM">
              maria_silva@gmail.com
            </Text>
            <Text align="end" fontName="SMALL_MEDIUM">
              (11) 9 9988-9900
            </Text>
          </div>
        </section>
        <Text margin="24px 0 16px 0" fontName="REGULAR_MEDIUM">
          Detalhes do pagamento
        </Text>
        <section className="medium">
          <span>
            <Pix />
          </span>
          <section>
            <div className="leftMedium">
              <Text fontName="SMALL_MEDIUM">Pix</Text>
              <Text fontName="TINY" color={Theme.colors.approved}>
                Pagamento aprovado
              </Text>
            </div>
            <div className="rightMedium">
              <Text align="end" fontName="SMALL_SEMI_BOLD">
                R$ 29,90
              </Text>
              <Text
                align="end"
                fontName="TINY"
                color={Theme.colors.secondaryText}
              >
                Hoje 11:25
              </Text>
            </div>
          </section>
        </section>
        <Text margin="24px 0 16px 0" fontName="REGULAR_MEDIUM">
          Detalhes da recarga
        </Text>
        <section className="bottom">
          <Image src={Card3} alt="Imagem do pacote" />
          <section>
            <div className="leftMedium">
              <Text fontName="SMALL_MEDIUM">Bigo Live</Text>
              <Text fontName="TINY" color={Theme.colors.approved}>
                Recarga realizada
              </Text>
            </div>
            <div className="rightMedium">
              <Text align="end" fontName="SMALL_SEMI_BOLD">
                3000 Diamantes
              </Text>
              <Text
                align="end"
                fontName="TINY"
                color={Theme.colors.secondaryText}
              >
                Hoje 11:26
              </Text>
            </div>
          </section>
        </section>
      </main>
    </SalesInnerPage>
  );
};

export default Page;
