import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import OrderCard from "public/cards/orderCard/card";
import HeaderEnviroment from "public/components/headerEnviroment";
import Card1 from "../common/temp/Card1.png";
import Card2 from "../common/temp/Card2.png";
import { SalesContainer } from "./style";
import Pagination from "public/components/pagination";
import SalesHeader from "../common/components/salesHeaderContainer";

const Sales = () => {
  return (
    <SalesContainer>
      <HeaderEnviroment>
        <SalesHeader />
      </HeaderEnviroment>
      <section className="titles">
        <span className="orderNumber">
          <Text
            align="center"
            color={Theme.colors.mainHighlight}
            fontName="REGULAR_MEDIUM"
          >
            Nº do Pedido
          </Text>
        </span>
        <span className="names">
          <Text
            align="center"
            color={Theme.colors.mainHighlight}
            fontName="REGULAR_MEDIUM"
          >
            Cliente
          </Text>
        </span>
        <span className="names">
          <Text
            align="center"
            color={Theme.colors.mainHighlight}
            fontName="REGULAR_MEDIUM"
          >
            Pacote
          </Text>
        </span>
        <span className="status">
          <Text
            align="center"
            color={Theme.colors.mainHighlight}
            fontName="REGULAR_MEDIUM"
          >
            Pagamento
          </Text>
        </span>
        <span className="status">
          <Text
            align="center"
            color={Theme.colors.mainHighlight}
            fontName="REGULAR_MEDIUM"
          >
            Recarga
          </Text>
        </span>
      </section>
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
