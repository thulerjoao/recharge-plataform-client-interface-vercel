"use client";

import { useRouter } from "next/navigation";
import { FixRechargePage } from "./style";

type Props = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: Props) => {
  const route = useRouter();

  return (
    <FixRechargePage>
      {/* {(device === "desktop" || device === "tablet") && (
        <HeaderEnviroment>
          <DefaultHeader backWard title="Corrigir recarga" />
        </HeaderEnviroment>
      )}
      {device === "mobile" && (
        <DefaultHeader backWard title="Corrigir recarga" />
      )}
      {(device === "mobile" || device === "tablet") && (
        <Text margin="24px 0 24px 0" align="center" fontName="LARGE_MEDIUM">
          BIGO LIVE
        </Text>
      )}
      <main>
        {device === "desktop" && (
          <section className="bannerContainer">
            <Image src={BigoBanner} alt="Imagem de banner" />
            <Text margin="32px 0 0 0" fontName="BIG_SEMI_BOLD">
              BIGO LIVE
            </Text>
          </section>
        )}
        <section className="rechargeDatas">
          <div className="inputsContainer">
            <Input
              value={params.slug}
              margin="0 0 24px 0"
              height={48}
              title="Número do pedido"
            />
            <Input
              placeholder="Insira o ID de usuário"
              margin="0 0 24px 0"
              height={48}
              title="Id do usuário *"
            />
            <Input
              placeholder="Insira o e-mail do usuário"
              margin="0 0 24px 0"
              height={48}
              title="E-mail do usuário"
            />
            <Input
              placeholder="Telefone do usuário"
              margin="0 0 24px 0"
              height={48}
              title="Telefone do usuário"
            />
          </div>
          <div className="bottomContainer">
            <Text
              margin="0 0 24px 0"
              align="center"
              fontName="REGULAR_SEMI_BOLD"
            >
              Selecione o Pacote para Recarga
            </Text>
            <PackageCard
              selected
              bestOffer
              title="BIGO 100"
              image={<BigoCard />}
              price={6.9}
            />
            <Button
              margin="32px 0 96px 0"
              rounded
              width={201}
              height={40}
              title="Recarregar agora"
            />
          </div>
        </section>
      </main> */}
    </FixRechargePage>
  );
};

export default Page;
