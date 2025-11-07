"use client";

import { useRouter } from "next/navigation";
import OrderCard from "public/cards/orderCard/card";
import HeaderEnviroment from "public/components/headerEnviroment";
import HeaderSearch from "public/components/headerSearch";
import MobileSecondaryMenu from "public/components/mobileSecondaryMenu";
import Pagination from "public/components/pagination";
import SalesTitles from "../common/components/salesTiltes";
import Card1 from "../common/temp/Card1.png";
import Card2 from "../common/temp/Card2.png";
import { OrdersContainer } from "./style";

interface Props {
  currentPage: number;
  search: string;
  status: "all" | "active" | "inactive";
}

const OrdersPage = ({ currentPage, search, status }: Props) => {
  const router = useRouter();

  return (
    <OrdersContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <HeaderSearch title="vendas" />
        </HeaderEnviroment>
      </div>
      <div className="desktop title">
        <SalesTitles />
      </div>

      <div className="mobile">
        <MobileSecondaryMenu title="VENDAS" />
      </div>

      <div className="cards">
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/sales/${123456}`}
        />
        <OrderCard
          image={Card2}
          orderNumber={898989}
          clientName="Luiz Santos Silva"
          packageName="Farlight 84 5000 diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/sales/${898989}`}
        />
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/sales/${123456}`}
        />
        <OrderCard
          image={Card2}
          orderNumber={898989}
          clientName="Luiz Santos Silva"
          packageName="Farlight 84 5000 diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/sales/${898989}`}
        />
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/sales/${123456}`}
        />
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/sales/${123456}`}
        />
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/sales/${123456}`}
        />
        <OrderCard
          image={Card2}
          orderNumber={898989}
          clientName="Luiz Santos Silva"
          packageName="Farlight 84 5000 diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/sales/${898989}`}
        />
        <OrderCard
          image={Card2}
          orderNumber={898989}
          clientName="Luiz Santos Silva"
          packageName="Farlight 84 5000 diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/sales/${898989}`}
        />
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/sales/${123456}`}
        />
      </div>
      <Pagination page={1} setPage={() => {}} totalPages={10} />
    </OrdersContainer>
  );
};

export default OrdersPage;
