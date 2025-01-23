import Text from "@4miga/design-system/components/Text";
import { useDevice } from "context/deviceContext";
import { useRouter } from "next/navigation";
import GameCard from "public/cards/gameCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import Card1 from "../common/temp/Card1.png";
import Card2 from "../common/temp/Card2.png";
import Card3 from "../common/temp/Card3.png";
import Card4 from "../common/temp/Card4.png";
import Card5 from "../common/temp/Card5.png";
import Card6 from "../common/temp/Card6.png";
import { ProductsPageContainer } from "./style";

const ProductsPage = () => {
  const route = useRouter();
  const { device } = useDevice();
  return (
    <ProductsPageContainer>
      {(device === "desktop" || device === "tablet") && (
        <HeaderEnviroment>
          <DefaultHeader backWard title="PRODUTOS" />
        </HeaderEnviroment>
      )}
      {device === "mobile" && <DefaultHeader backWard title="PRODUTOS" />}
      <div className="mainTitle">
        {/* <Text align="center" fontName="REGULAR_SEMI_BOLD">
          CONFIGURE SEUS PRODUTOS
        </Text> */}
      </div>
      <main className="cardsContainer">
        <div
          className="cardEnviroment"
          onClick={() => route.push("/products/bigo")}
        >
          <GameCard image={Card1} name="Bigo Live" />
        </div>
        <div
          className="cardEnviroment"
          onClick={() => route.push("/products/bigo")}
        >
          <GameCard image={Card2} name="Farlight 84" />
        </div>
        <div
          className="cardEnviroment"
          onClick={() => route.push("/products/bigo")}
        >
          <GameCard image={Card3} name="8 Ball Pool" />
        </div>
        <div
          className="cardEnviroment"
          onClick={() => route.push("/products/bigo")}
        >
          <GameCard image={Card4} name="Free Fire" />
        </div>
        <div
          className="cardEnviroment"
          onClick={() => route.push("/products/bigo")}
        >
          <GameCard image={Card5} name="Pubg Mobile" />
        </div>
        <div
          className="cardEnviroment"
          onClick={() => route.push("/products/bigo")}
        >
          <GameCard image={Card6} name="Mobile Legends" />
        </div>
      </main>
    </ProductsPageContainer>
  );
};

export default ProductsPage;
