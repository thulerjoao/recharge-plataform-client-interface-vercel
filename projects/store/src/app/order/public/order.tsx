"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import Image from "next/image";
import BackArrow from "../../common/icons/BackArrow.svg";
import MiniBigo from "../common/icons/MiniBigo.svg";
import Pix from "../common/icons/Pix.svg";
import cardIcon from "../common/temp/cardIcon.png";
import { OrderContainer } from "./style";
import { useRouter } from "next/navigation";

const Order = () => {
  const route = useRouter();

  return (
    <OrderContainer>
      <div className="topMessage">
        <span onClick={() => route.back()}>
          <BackArrow />
        </span>
        <Text tag="h1" align="center" fontName="REGULAR_SEMI_BOLD">
          DETALHES DO PEDIDO
        </Text>
      </div>
      <main>
        <section className="fisrtSection">
          <div className="fisrtRow">
            <Image src={cardIcon} alt="imagem do card" />
            <div>
              <Text align="end" fontName="REGULAR_MEDIUM" tag="h2">
                Bigo 3000 diamantes
              </Text>
              <Text
                margin="8px 0 0 0"
                align="end"
                color={Theme.colors.secondaryText}
                fontName="TINY"
                tag="h3"
              >
                Hoje, 11:23
              </Text>
            </div>
          </div>
          <div className="secondaryRow">
            <Text fontName="SMALL_MEDIUM">Número do pedido</Text>
            <Text fontName="SMALL_MEDIUM" align="end">
              4321-12345
            </Text>
          </div>
          <div className="secondaryRow third">
            <Text fontName="SMALL_MEDIUM">ID de usuário</Text>
            <Text fontName="SMALL_MEDIUM" align="end">
              12345
            </Text>
          </div>
        </section>
        <section className="secondarySection">
          <Text fontName="REGULAR_MEDIUM" tag="h2">
            Detalhes do pagamento
          </Text>
          <div className="outside">
            <span>
              <Pix />
            </span>
            <div className="allInfos">
              <div className="innerContent">
                <Text fontName="SMALL_MEDIUM">Pix</Text>
                <Text fontName="SMALL_SEMI_BOLD" align="end">
                  R$ 29,90
                </Text>
              </div>
              <div className="innerContent">
                <Text fontName="TINY" color={Theme.colors.approved}>
                  Pagamento aprovado
                </Text>
                <Text
                  align="end"
                  color={Theme.colors.secondaryText}
                  fontName="TINY"
                  tag="h3"
                >
                  Hoje, 11:25
                </Text>
              </div>
            </div>
          </div>
        </section>
        <section className="thirdSection">
          <Text fontName="REGULAR_MEDIUM" tag="h2">
            Detalhes da recarga
          </Text>
          <div className="outside">
            <span>
              <MiniBigo />
            </span>
            <div className="allInfos">
              <div className="innerContent">
                <Text fontName="SMALL_MEDIUM">Bigo Live</Text>
                <Text fontName="SMALL_SEMI_BOLD" align="end">
                  3000 Diamantes
                </Text>
              </div>
              <div className="innerContent">
                <Text fontName="TINY" color={Theme.colors.approved}>
                  Recarga realizada
                </Text>
                <Text
                  align="end"
                  color={Theme.colors.secondaryText}
                  fontName="TINY"
                  tag="h3"
                >
                  Hoje, 11:26
                </Text>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Button
        margin="32px 0 0 0"
        width={228}
        rounded
        height={40}
        title="Comprar novamente"
      />
    </OrderContainer>
  );
};

export default Order;
