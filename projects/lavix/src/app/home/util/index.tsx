"use client";

import Text from "@4miga/design-system/components/Text";
import { useProducts } from "contexts/products/ProductsProvider";
import { useStore } from "contexts/store/StoreProvider";
import { useRouter } from "next/navigation";
import BottomOffer from "public/components/bottomOffer/bottomOffer";
import HowItWorks from "public/components/howItWorks";
import { PackageType } from "types/productTypes";
import { formatString } from "utils/formatString";
import { useTheme } from "styled-components";
import { HomeTestContainer } from "./style";
import PackageBigoCard from "public/cards/packageBigoCardCompact/card";

type Props = {
  coupon?: string;
};

const HomeTest = ({ coupon }: Props) => {
  const theme = useTheme();
  const route = useRouter();
  const { product } = useProducts();
  const { store } = useStore();

  const handleClick = (item: PackageType) => {
    sessionStorage.removeItem("order");
    route.push(
      `/product?package=${item.id}${coupon ? `&coupon=${formatString(coupon)}` : ""}`,
    );
  };

  return (
    <HomeTestContainer>
      <main>
        {/* <Text
          tag="h1"
          align="center"
          fontName="LARGE_SEMI_BOLD"
          margin="48px 0px 0px 0px"
        >
          RECARREGUE AGORA
        </Text> */}
        <Text
          tag="p"
          align="center"
          fontName="REGULAR"
          className="homeTestText"
          color={theme.text_01}
          margin="16px 0 8px 0"
        >
          Selecione o pacote que melhor combina com você
        </Text>
        <section className="cardsContainer">
          {product &&
            product?.packages.map((packageItem, index) => (
              <div
                key={index}
                className="cardEnviroment"
                onClick={() => handleClick(packageItem)}
              >
                <PackageBigoCard selected={false} item={packageItem} />
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
          color={theme.text_03}
          margin="32px 0 16px 0"
        >
          Quer economizar ainda mais?
        </Text>
        <Text
          tag="a"
          align="center"
          fontName="REGULAR_MEDIUM"
          color={theme.mainColor}
          underline
          pointer
          onClick={() => route.push("/coupons")}
          style={{ cursor: "pointer" }}
        >
          Ver cupons disponíveis
        </Text>
      </div>
      <div className="couponsLink">
        <Text
          tag="p"
          align="center"
          fontName="REGULAR"
          color={theme.text_03}
          margin="0px 0 16px 0"
        >
          Calcule aqui sua meta mensal de Beans
        </Text>
        <Text
          tag="a"
          align="center"
          fontName="REGULAR_MEDIUM"
          color={theme.mainColor}
          underline
          pointer
          onClick={() => route.push("/calc")}
          style={{ cursor: "pointer" }}
        >
          Calculadora de Beans
        </Text>
      </div>
    </HomeTestContainer>
  );
};

export default HomeTest;
