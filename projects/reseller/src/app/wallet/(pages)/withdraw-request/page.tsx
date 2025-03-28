"use client";

import OrderCard from "public/cards/orderCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import Pagination from "public/components/pagination";
import { WithDrawRequestContainer } from "./style";
import Card1 from "./temp/Card1.png";
import Card2 from "./temp/Card2.png";

const WithDrawRequest = () => {
  return (
    <WithDrawRequestContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="SOLICITAÇÕES DE SAQUE" />
        </HeaderEnviroment>
      </div>
      <div className="mobile">
        <DefaultHeader backWard title="SOLICITAÇÕES DE SAQUE" />
      </div>
      <div className="cards">
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/wallet/withdraw-request/${123456}`}
        />
        <OrderCard
          image={Card2}
          orderNumber={898989}
          clientName="Luiz Santos Silva"
          packageName="Farlight 84 5000 diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/wallet/withdraw-request/${898989}`}
        />
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/wallet/withdraw-request/${123456}`}
        />
        <OrderCard
          image={Card2}
          orderNumber={898989}
          clientName="Luiz Santos Silva"
          packageName="Farlight 84 5000 diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/wallet/withdraw-request/${898989}`}
        />
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/wallet/withdraw-request/${123456}`}
        />
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/wallet/withdraw-request/${123456}`}
        />
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/wallet/withdraw-request/${123456}`}
        />
        <OrderCard
          image={Card2}
          orderNumber={898989}
          clientName="Luiz Santos Silva"
          packageName="Farlight 84 5000 diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/wallet/withdraw-request/${898989}`}
        />
        <OrderCard
          image={Card2}
          orderNumber={898989}
          clientName="Luiz Santos Silva"
          packageName="Farlight 84 5000 diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/wallet/withdraw-request/${898989}`}
        />
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
          pushTo={`/wallet/withdraw-request/${123456}`}
        />
      </div>
      <Pagination />
    </WithDrawRequestContainer>
  );
};

export default WithDrawRequest;
