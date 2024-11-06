import Text from "@4miga/design-system/components/Text";
import GameCard from "public/cards/gameCard/card";
import Card1 from "../common/temp/Card1.png";
import Card2 from "../common/temp/Card2.png";
import Card4 from "../common/temp/Card4.png";
import Card5 from "../common/temp/Card5.png";
import { HomeContainer, VerticalBar } from "./style";

const Home = () => {
  return (
    <HomeContainer>
      <Text fontName="LARGE_SEMI_BOLD">Mais recarregados</Text>
      <section className="mainGames">
        <div>
          <GameCard name="Bigo Live" image={Card1} />
          <Text margin="16px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
            530 recargas
          </Text>
        </div>
        <div>
          <GameCard name="Farlight 84" image={Card2} />
          <Text margin="16px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
            430 recargas
          </Text>
        </div>
        <div>
          <GameCard name="Free Fire" image={Card4} />
          <Text margin="16px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
            330 recargas
          </Text>
        </div>
        <div>
          <GameCard name="Pubg Moblie" image={Card5} />
          <Text margin="16px 0 0 0" align="center" fontName="REGULAR_MEDIUM">
            230 recargas
          </Text>
        </div>
      </section>
      <section className="bottomContainer">
        <div className="dailySales">
          <Text fontName="LARGE_SEMI_BOLD">Vendas diárias</Text>
          <div className="graphics ">
            <div className="vertical metrics">
              <Text fontName="SMALL">100k</Text>
              <Text fontName="SMALL">75k</Text>
              <Text fontName="SMALL">50k</Text>
              <Text fontName="SMALL">25k</Text>
              <Text fontName="SMALL">1k</Text>
            </div>
            <div className="vertical">
              <VerticalBar heightInPercent={40} />
              <Text margin="7px 0" fontName="SMALL">
                Seg
              </Text>
            </div>
            <div className="vertical">
              <VerticalBar heightInPercent={75} />
              <Text margin="7px 0" fontName="SMALL">
                Ter
              </Text>
            </div>
            <div className="vertical">
              <VerticalBar heightInPercent={80} />
              <Text margin="7px 0" fontName="SMALL">
                Qua
              </Text>
            </div>
            <div className="vertical">
              <VerticalBar heightInPercent={90} />
              <Text margin="7px 0" fontName="SMALL">
                Qui
              </Text>
            </div>
            <div className="vertical">
              <VerticalBar heightInPercent={70} />
              <Text margin="7px 0" fontName="SMALL">
                Sex
              </Text>
            </div>
            <div className="vertical">
              <VerticalBar heightInPercent={48} />
              <Text margin="7px 0" fontName="SMALL">
                Sáb
              </Text>
            </div>
            <div className="vertical">
              <VerticalBar heightInPercent={53} />
              <Text margin="7px 0" fontName="SMALL">
                Som
              </Text>
            </div>
          </div>
        </div>
        <div className="monthSales">
          <Text fontName="LARGE_SEMI_BOLD">Vendas mensais</Text>
        </div>
      </section>
    </HomeContainer>
  );
};

export default Home;
