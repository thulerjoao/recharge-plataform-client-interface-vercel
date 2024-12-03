"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { useDevice } from "context/deviceContext";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { NewRequestPageContainer } from "./style";

type Props = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: Props) => {
  const { device } = useDevice();
  return (
    <NewRequestPageContainer>
      {(device === "desktop" || device === "tablet") && (
        <HeaderEnviroment>
          <DefaultHeader backWard title="NOVO SAQUE" />
        </HeaderEnviroment>
      )}
      {device === "mobile" && <DefaultHeader backWard title="NOVO SAQUE" />}
      <main>
        <div className="availableValue">
          <Text fontName="REGULAR_MEDIUM">SALDO PARA ESTOQUE</Text>
          <span>
            <Text nowrap fontName="REGULAR_SEMI_BOLD">
              R$ 40.000,00
            </Text>
          </span>
        </div>
        <div className="availableValue">
          <Text fontName="REGULAR_MEDIUM">VALOR DISPONÍVEL PARA SAQUE</Text>
          <span>
            <Text nowrap fontName="REGULAR_SEMI_BOLD">
              R$ 12.000,00
            </Text>
          </span>
        </div>
        <div className="availableValue">
          <Text fontName="REGULAR_MEDIUM">VALOR TOTAL VENDIDO</Text>
          <span>
            <Text nowrap fontName="REGULAR_SEMI_BOLD">
              R$ 21.000,00
            </Text>
          </span>
        </div>
        <div className="availableValue">
          <Text fontName="REGULAR_MEDIUM">TOTAL NA CARTEIRA</Text>
          <span>
            <Text nowrap fontName="REGULAR_SEMI_BOLD">
              R$ 73.000,00
            </Text>
          </span>
        </div>
        <div className="availableValue">
          <Text fontName="REGULAR_MEDIUM">VALOR MÍNIMO PARA SAQUE</Text>
          <span>
            <Text nowrap fontName="REGULAR_SEMI_BOLD">
              R$ 5.000,00
            </Text>
          </span>
        </div>
        <div className="availableValue">
          <Text fontName="REGULAR_MEDIUM">CHAVE PIX</Text>
          <span>
            <Text nowrap fontName="REGULAR_SEMI_BOLD">
              10.204.300/0001-10
            </Text>
          </span>
        </div>
        <section className="withdrawValue">
          <Input
            placeholder="Digite o valor que deseja sacar..."
            title="Valor a sacar"
            height={48}
            type="number"
          />
          <Button
            margin="24px 0 0 0"
            rounded
            width={180}
            height={40}
            title="Solicitar saque"
          />
        </section>
      </main>
    </NewRequestPageContainer>
  );
};

export default Page;
