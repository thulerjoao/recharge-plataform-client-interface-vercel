"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
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
    sessionStorage.removeItem("order");
    route.push(
      `/product?package=${item.id}${coupon ? `&coupon=${formatString(coupon)}` : ""}`,
    );
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
      {/* <div className="couponsLink">
        <Text
          tag="p"
          align="center"
          fontName="REGULAR"
          color={Theme.colors.secondaryText}
          margin="32px 0 16px 0"
        >
          Quer economizar ainda mais?
        </Text>
        <Text
          tag="a"
          align="center"
          fontName="REGULAR_MEDIUM"
          color={Theme.colors.mainHighlight}
          underline
          pointer
          onClick={() => route.push("/coupons")}
          style={{ cursor: "pointer" }}
        >
          Ver cupons disponíveis
        </Text>
      </div> */}
      <BottomOffer />
    </HomeContainer>
  );
};

export default Home;
