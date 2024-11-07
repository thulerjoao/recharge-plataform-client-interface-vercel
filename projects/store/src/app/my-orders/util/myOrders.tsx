"use client";

import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OrderCard from "public/cards/orderCard/card";
import BackArrow from "../../common/icons/BackArrow.svg";
import Bigo from "../common/temp/Bigo.svg";
import Freefire from "../common/temp/Freefire.svg";
import { MyOrderContainer } from "./style";

const MyOrders = () => {
  const [page, setPage] = useState<number>(1);
  const route = useRouter();

  return (
    <MyOrderContainer>
      <div className="topMessage">
        <span onClick={() => route.back()}>
          <BackArrow />
        </span>
        <Text tag="h1" align="center" fontName="REGULAR_SEMI_BOLD">
          MEUS PEDIDOS
        </Text>
      </div>
      <section className="cardsSection">
        <OrderCard
          status="approved"
          price={29.9}
          time="Hoje, 11:23"
          title="Bigo 3000 diamantes"
          image={<Bigo />}
        />
        <OrderCard
          status="approved"
          price={29.9}
          time="Hoje, 11:23"
          title="Bigo 3000 diamantes"
          image={<Bigo />}
        />
        <OrderCard
          status="approved"
          price={29.9}
          time="Hoje, 11:23"
          title="Farlight 84 5000 diamantes"
          image={<Freefire />}
        />
        <OrderCard
          status="pending"
          price={29.9}
          time="Hoje, 11:23"
          title="Bigo 3000 diamantes"
          image={<Bigo />}
        />
        <OrderCard
          status="canceled"
          price={29.9}
          time="Ontem, 10:32"
          title="Farlight 84 5000 diamantes"
          image={<Freefire />}
        />
        <OrderCard
          status="canceled"
          price={29.9}
          time="10/10/2024 - 21:33"
          title="Bigo 3000 diamantes"
          image={<Bigo />}
        />
      </section>
      <div className="pagination">
        <Text align="center" fontName="REGULAR_SEMI_BOLD">
          1
        </Text>
        <Text
          align="center"
          color={Theme.colors.secondaryText}
          fontName="REGULAR_SEMI_BOLD"
        >
          2
        </Text>
        <Text
          align="center"
          color={Theme.colors.secondaryText}
          fontName="REGULAR_SEMI_BOLD"
        >
          3
        </Text>
        <Text
          align="center"
          color={Theme.colors.secondaryText}
          fontName="REGULAR_SEMI_BOLD"
        >
          4
        </Text>
        <Text
          align="center"
          color={Theme.colors.secondaryText}
          fontName="REGULAR_SEMI_BOLD"
        >
          5
        </Text>
        <Text
          className="dots"
          align="center"
          color={Theme.colors.secondaryText}
          fontName="REGULAR_SEMI_BOLD"
        >
          ...
        </Text>
        <Text
          align="center"
          color={Theme.colors.secondaryText}
          fontName="REGULAR_SEMI_BOLD"
        >
          55
        </Text>
      </div>
    </MyOrderContainer>
  );
};

export default MyOrders;
