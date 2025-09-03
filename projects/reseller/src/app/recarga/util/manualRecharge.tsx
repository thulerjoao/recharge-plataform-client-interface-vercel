import ManualOrderCard from "public/cards/orderManualCard/card";
import HeaderEnviroment from "public/components/headerEnviroment";
import HeaderSearch from "public/components/headerSearch";
import MobileSecondaryMenu from "public/components/mobileSecondaryMenu";
import Pagination from "public/components/pagination";
import ManualRechargeTitles from "../common/components/salesTiltes";
import Card1 from "../common/temp/Card1.png";
import Card2 from "../common/temp/Card2.png";
import { ManualRechargeContainer } from "./style";

const ManualRecharge = () => {
  return (
    <ManualRechargeContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <HeaderSearch title="RECARGAS" />
        </HeaderEnviroment>
      </div>
      <div className="desktop title">
        <ManualRechargeTitles />
      </div>
      <div className="mobile">
        <MobileSecondaryMenu title="RECARGAS MANUAIS" />
      </div>
      <div className="cards">
        <ManualOrderCard
          image={Card1}
          orderNumber={123456}
          orderDate="Hoje, 11:23"
          packageName="Bigo 3000 Diamantes"
          plataform="Bigo Live"
          rechargeStatus="processing"
          pushTo={`/recharge/${123456}`}
        />
        <ManualOrderCard
          image={Card2}
          orderNumber={898989}
          orderDate="Hoje, 11:23"
          packageName="Farlight 84 5000 diamantes"
          plataform="Bigo Live"
          rechargeStatus="processing"
          pushTo={`/recharge/${898989}`}
        />
        <ManualOrderCard
          image={Card1}
          orderNumber={123456}
          orderDate="Hoje, 11:23"
          packageName="Bigo 3000 Diamantes"
          plataform="Bigo Live"
          rechargeStatus="processing"
          pushTo={`/recharge/${123456}`}
        />
        <ManualOrderCard
          image={Card2}
          orderNumber={898989}
          plataform="Bigo Live"
          packageName="Farlight 84 5000 diamantes"
          orderDate="Hoje, 11:23"
          rechargeStatus="approved"
          pushTo={`/recharge/${898989}`}
        />
        <ManualOrderCard
          image={Card1}
          orderNumber={123456}
          orderDate="Hoje, 11:23"
          packageName="Bigo 3000 Diamantes"
          plataform="Bigo Live"
          rechargeStatus="approved"
          pushTo={`/recharge/${123456}`}
        />
        <ManualOrderCard
          image={Card1}
          orderNumber={123456}
          orderDate="Hoje, 11:23"
          packageName="Bigo 3000 Diamantes"
          plataform="Bigo Live"
          rechargeStatus="approved"
          pushTo={`/recharge/${123456}`}
        />
        <ManualOrderCard
          image={Card1}
          orderNumber={123456}
          orderDate="Hoje, 11:23"
          packageName="Bigo 3000 Diamantes"
          plataform="Bigo Live"
          rechargeStatus="approved"
          pushTo={`/recharge/${123456}`}
        />
        <ManualOrderCard
          image={Card2}
          orderNumber={898989}
          orderDate="Hoje, 11:23"
          packageName="Farlight 84 5000 diamantes"
          plataform="Bigo Live"
          rechargeStatus="approved"
          pushTo={`/recharge/${898989}`}
        />
        <ManualOrderCard
          image={Card2}
          orderNumber={898989}
          orderDate="Hoje, 11:23"
          packageName="Farlight 84 5000 diamantes"
          plataform="Bigo Live"
          rechargeStatus="approved"
          pushTo={`/recharge/${898989}`}
        />
        <ManualOrderCard
          image={Card1}
          orderNumber={123456}
          orderDate="Hoje, 11:23"
          packageName="Bigo 3000 Diamantes"
          plataform="Bigo Live"
          rechargeStatus="approved"
          pushTo={`/recharge/${123456}`}
        />
      </div>
      <Pagination />
    </ManualRechargeContainer>
  );
};

export default ManualRecharge;
