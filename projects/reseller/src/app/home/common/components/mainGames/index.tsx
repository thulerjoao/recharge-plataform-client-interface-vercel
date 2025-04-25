import Text from "@4miga/design-system/components/Text";
import GameCard from "public/cards/gameCard/card";
import { MainGamesContainer } from "./style";

const MainGames = () => {
  const Products = [
    {
      id: "1",
      name: "Bigo Live",
      imgCardUrl: "http://imagecard",
      recharges: 530,
    },
    {
      id: "2",
      name: "Farlight 84",
      imgCardUrl: "http://imagecard",
      recharges: 430,
    },
    {
      id: "3",
      name: "Free Fire",
      imgCardUrl: "http://imagecard",
      recharges: 330,
    },
    {
      id: "4",
      name: "Pubg Moblie",
      imgCardUrl: "http://imagecard",
      recharges: 230,
    },
  ];

  return (
    <MainGamesContainer>
      <section className="list">
        {Products &&
          Products.map((product) => {
            return (
              <div key={product.id} className="newCardContainer">
                <GameCard product={product} />
                <Text
                  margin="16px 0 0 0"
                  align="center"
                  fontName="REGULAR_MEDIUM"
                >
                  {`${product.recharges} recargas`}
                </Text>
              </div>
            );
          })}
      </section>
    </MainGamesContainer>
  );
};

export default MainGames;
