"use client";

import Text from "@4miga/design-system/components/Text";
import { useProducts } from "contexts/products/ProductsProvider";
import { useStore } from "contexts/store/StoreProvider";
import { useRouter } from "next/navigation";
import PackageCard from "public/cards/packageCard/card";
import BottomOffer from "public/components/bottomOffer/bottomOffer";
import Carousel from "public/components/carousel/carousel";
import SecurityAdvertise from "public/components/securityAdvertise/securityAdvertise";
import { PackageType } from "types/productTypes";
import { formatString } from "utils/formatString";
import Lines from "../../../public/components/lines/lines";
import InvisibleCards from "./invisivleCards";
import { HomeContainer } from "./style";

type Props = {
  coupon?: string;
};

const Home = ({ coupon }: Props) => {
  const route = useRouter();
  const { product } = useProducts();
  const { store } = useStore();
  const bannerList: string[] = store?.bannersUrl || [];

  const handleClick = (item: PackageType) => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("orderId");
    sessionStorage.removeItem("qrCode");
    sessionStorage.removeItem("copyAndPaste");
    if (coupon) {
      sessionStorage.setItem("coupon", coupon);
    }
    route.push(`/package/${formatString(item.id)}`);
  };

  return (
    <HomeContainer>
      <Carousel imagesList={bannerList} />
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
        {/* <Text
          tag="h2"
          align="center"
          fontName="REGULAR"
          margin="8px 0px 0px 0px"
        >
          Texto de exemplo
        </Text> */}
        <section className="cardsContainer">
          {product &&
            product?.packages.map((packageItem, index) => (
              <div
                key={index}
                className="cardEnviroment"
                onClick={() => handleClick(packageItem)}
              >
                <PackageCard selected={false} item={packageItem} />
              </div>
            ))}
          {InvisibleCards(product?.packages)}
        </section>
      </main>
      <SecurityAdvertise />
      <BottomOffer />
    </HomeContainer>
  );
};

export default Home;
