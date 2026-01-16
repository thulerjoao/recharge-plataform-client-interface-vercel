"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useProducts } from "contexts/products/ProductsProvider";
import { useStore } from "contexts/store/StoreProvider";
import { useRouter } from "next/navigation";
import PackageCardTest from "public/cards/packageCardCompact/card";
import BottomOffer from "public/components/bottomOffer/bottomOffer";
import Carousel from "public/components/carousel/carousel";
import HowItWorks from "public/components/howItWorks";
import { PackageType } from "types/productTypes";
import { formatString } from "utils/formatString";
import Lines from "../../../public/components/lines/lines";
import { HomeTestContainer } from "./style";

type Props = {
  coupon?: string;
};

const HomeTest = ({ coupon }: Props) => {
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
    <HomeTestContainer>
      <Carousel imagesList={bannerList} />
      <Lines />
      <main>
        <Text
          tag="h1"
          align="center"
          fontName="LARGE_SEMI_BOLD"
          margin="48px 0px 0px 0px"
        >
          RECARREGUE AGORA
        </Text>
        <Text
          tag="p"
          align="center"
          fontName="REGULAR"
          className="homeTestText"
          color={Theme.colors.secondaryText}
          margin="16px 0 8px 0"
        >
          Recargas direto para sua conta Bigo Live
        </Text>
        <section className="cardsContainer">
          {product &&
            product?.packages.map((packageItem, index) => (
              <div
                key={index}
                className="cardEnviroment"
                onClick={() => handleClick(packageItem)}
              >
                <PackageCardTest selected={false} item={packageItem} />
              </div>
            ))}
        </section>
      </main>
      <HowItWorks />
      {/* <SecurityAdvertise /> */}
      <BottomOffer />
      <div className="couponsLink">
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
      </div>
    </HomeTestContainer>
  );
};

export default HomeTest;
