import Text from "@4miga/design-system/components/Text";
import GameCard from "public/cards/gameCard/card";
import Card1 from "../../temp/Card1.png";
import Card2 from "../../temp/Card2.png";
import Card4 from "../../temp/Card4.png";
import Card5 from "../../temp/Card5.png";
import { MainGamesContainer } from "./style";

const MainGames = () => {
  return (
    <MainGamesContainer>
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
    </MainGamesContainer>
  );
};

export default MainGames;
