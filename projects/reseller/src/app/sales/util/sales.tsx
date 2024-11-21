import { useDevice } from "context/deviceContext";
import OrderCard from "public/cards/orderCard/card";
import HeaderEnviroment from "public/components/headerEnviroment";
import MobileSecondaryMenu from "public/components/mobileSecondaryMenu";
import Pagination from "public/components/pagination";
import SalesHeader from "../common/components/salesHeader";
import SalesTitles from "../common/components/salesTiltes";
import Card1 from "../common/temp/Card1.png";
import Card2 from "../common/temp/Card2.png";
import { SalesContainer } from "./style";

const Sales = () => {
  const { device } = useDevice();

  return (
    <SalesContainer>
      {(device === "desktop" || device === "tablet") && (
        <>
          <HeaderEnviroment>
            <SalesHeader />
          </HeaderEnviroment>
          <SalesTitles />
        </>
      )}
      {device === "mobile" && <MobileSecondaryMenu title="VENDAS" />}
      <div className="cards">
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
        />
        <OrderCard
          image={Card2}
          orderNumber={898989}
          clientName="Luiz Santos Silva"
          packageName="Farlight 84 5000 diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
        />
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
        />
        <OrderCard
          image={Card2}
          orderNumber={898989}
          clientName="Luiz Santos Silva"
          packageName="Farlight 84 5000 diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
        />
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
        />
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
        />
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
        />
        <OrderCard
          image={Card2}
          orderNumber={898989}
          clientName="Luiz Santos Silva"
          packageName="Farlight 84 5000 diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
        />
        <OrderCard
          image={Card2}
          orderNumber={898989}
          clientName="Luiz Santos Silva"
          packageName="Farlight 84 5000 diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
        />
        <OrderCard
          image={Card1}
          orderNumber={123456}
          clientName="Maria Luiza Silva Santos"
          packageName="Bigo 3000 Diamantes"
          paymentStatus="approved"
          rechargeStatus="processing"
        />
      </div>
      <Pagination />
    </SalesContainer>
  );
};

export default Sales;
