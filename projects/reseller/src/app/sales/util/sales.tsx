import Text from "@4miga/design-system/components/Text";
import Input from "@4miga/design-system/components/input";
import { Theme } from "@4miga/design-system/theme/theme";
import OrderCard from "public/cards/orderCard/card";
import HeaderEnviroment from "public/components/headerEnviroment";
import DownArrow from "../common/icons/DownArrow.svg";
import Search from "../common/icons/Search.svg";
import Setting from "../common/icons/Setting.svg";
import Card1 from "../common/temp/Card1.png";
import Card2 from "../common/temp/Card2.png";
import { SalesContainer } from "./style";

const Sales = () => {
  return (
    <SalesContainer>
      <HeaderEnviroment>
        <header>
          <div className="headerTitle">
            <Text fontName="LARGE_SEMI_BOLD">VENDAS</Text>
          </div>
          <div className="searchInput">
            <Input
              padding="0 44px 0 16px"
              rightElement={<Search />}
              placeholder="Pesquisar..."
              height={40}
            />
          </div>
          <div className="filter">
            <span>
              <Setting />
            </span>
            <Text align="center" fontName="SMALL">
              FILTRAR
            </Text>
            <span>
              <DownArrow />
            </span>
          </div>
        </header>
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
      <div className="pagination">
        <Text align="center" fontName="REGULAR_SEMI_BOLD">
          1
        </Text>
        <Text
          align="center"
          color={Theme.colors.secondaryText}
          fontName="REGULAR_SEMI_BOLD"
        >
          2
        </Text>
        <Text
          align="center"
          color={Theme.colors.secondaryText}
          fontName="REGULAR_SEMI_BOLD"
        >
          3
        </Text>
        <Text
          align="center"
          color={Theme.colors.secondaryText}
          fontName="REGULAR_SEMI_BOLD"
        >
          4
        </Text>
        <Text
          align="center"
          color={Theme.colors.secondaryText}
          fontName="REGULAR_SEMI_BOLD"
        >
          5
        </Text>
        <Text
          className="dots"
          align="center"
          color={Theme.colors.secondaryText}
          fontName="REGULAR_SEMI_BOLD"
        >
          ...
        </Text>
        <Text
          align="center"
          color={Theme.colors.secondaryText}
          fontName="REGULAR_SEMI_BOLD"
        >
          55
        </Text>
      </div>
    </SalesContainer>
  );
};

export default Sales;
