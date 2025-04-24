import Text from "@4miga/design-system/components/Text";

import DailySales from "../common/components/dailySales";
import MainGames from "../common/components/mainGames";
import MonthCard from "../common/components/monthCard";
import Card1 from "../common/temp/Card1.png";
import Card2 from "../common/temp/Card2.png";
import Card4 from "../common/temp/Card4.png";
import { HomeContainer } from "./style";

const Home = () => {
  return (
    <HomeContainer>
      <Text fontName="LARGE_SEMI_BOLD">Mais recarregados</Text>
      <MainGames />
      <section className="bottomContainer">
        <DailySales />
        <div className="monthSales">
          <Text margin="0 0 24px 0" fontName="LARGE_SEMI_BOLD">
            Vendas mensais
          </Text>
          <MonthCard
            image={Card1}
            sold={110}
            invoicing={20000}
            profit={10000}
          />
          <MonthCard
            image={Card2}
            sold={110}
            invoicing={20000}
            profit={10000}
          />
          <MonthCard
            image={Card4}
            sold={110}
            invoicing={20000}
            profit={10000}
          />
        </div>
      </section>
    </HomeContainer>
  );
};

export default Home;
