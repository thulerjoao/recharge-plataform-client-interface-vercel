"use client";

import Text from "@4miga/design-system/components/Text";
import Carousel from "app/home/common/components/carousel/carousel";
import { useProducts } from "contexts/products/ProductsProvider";
import { useRouter } from "next/navigation";
import BottomOffer from "public/components/bottomOffer/bottomOffer";
import SecurityAdvertise from "public/components/securityAdvertise/securityAdvertise";
import { PackageType } from "types/productTypes";
import Lines from "../common/components/lines/lines";
import mainBanner from "../common/temp/mainBanner.png";
import InvisibleCards from "./invisivleCards";
import { HomeContainer } from "./style";
import PackageCard from "public/cards/packageCard/card";

const Home = () => {
  const route = useRouter();
  const products = useProducts();
  const handleClick = (item: PackageType) => {
    sessionStorage.setItem("package", JSON.stringify(item));
    route.push(`/home`);
  };

  return (
    <HomeContainer>
      <Carousel imagesList={[mainBanner, mainBanner, mainBanner]} />
      <Lines />
      <main>
        <Text
          tag="h1"
          align="center"
          fontName="LARGE_SEMI_BOLD"
          margin="72px 0px 0px 0px"
        >
          RECARREGUE AGORA!
        </Text>
        <Text
          tag="h2"
          align="center"
          fontName="REGULAR"
          margin="8px 0px 0px 0px"
        >
          Texto de exemplo
        </Text>
        <section className="cardsContainer">
          {products &&
            products[0].packages.map((packageItem) => (
              <div
                key={packageItem.id}
                className="cardEnviroment"
                onClick={() => handleClick(packageItem)}
              >
                <PackageCard item={packageItem} selected={false} />
              </div>
            ))}
          {InvisibleCards(products)}
        </section>
      </main>
      <SecurityAdvertise />
      <BottomOffer />
    </HomeContainer>
  );
};

export default Home;

// product.packages.map((item, index) => (
//   <div
//     key={index}
//     className="cardEnviroment"
//     onClick={() => setSelected(index)}
//   >
//     <PackageCard item={item} selected={selected === index} />
//   </div>
// ))
