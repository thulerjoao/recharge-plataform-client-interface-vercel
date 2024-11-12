"use client";

import HeaderEnviroment from "public/components/headerEnviroment";
import DefaultHeader from "../common/components/defaultHeader";
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
    </SalesInnerPage>
  );
};

export default Page;
