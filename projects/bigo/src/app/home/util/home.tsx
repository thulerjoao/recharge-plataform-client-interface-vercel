"use client";

import Text from "@4miga/design-system/components/Text";
import { useProducts } from "contexts/products/ProductsProvider";
import { useRouter } from "next/navigation";
import PackageCard from "public/cards/packageCard/card";
import BottomOffer from "public/components/bottomOffer/bottomOffer";
import Carousel from "public/components/carousel/carousel";
import SecurityAdvertise from "public/components/securityAdvertise/securityAdvertise";
import { useEffect } from "react";
import { PackageType } from "types/productTypes";
import { formatString } from "utils/formatString";
import Lines from "../../../public/components/lines/lines";
import banner01 from "../temp/banner01.png";
import InvisibleCards from "./invisivleCards";
import { HomeContainer } from "./style";

const Home = () => {
  const route = useRouter();
  const products = useProducts();
  const handleClick = (item: PackageType) => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("orderId");
    sessionStorage.removeItem("qrCode");
    sessionStorage.removeItem("copyAndPaste");
    sessionStorage.setItem("package", JSON.stringify(item));
    route.push(`/package/${formatString(item.id)}`);
  };

  console.log(products[0].packages);

  return (
    <HomeContainer>
      <Carousel imagesList={[banner01, banner01, banner01]} />
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
            products[0].packages.map((packageItem, index) => (
              <div
                key={index}
                className="cardEnviroment"
                onClick={() => handleClick(packageItem)}
              >
                <PackageCard selected={false} item={packageItem} />
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
