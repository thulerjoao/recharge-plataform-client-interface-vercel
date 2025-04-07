"use client";

import Text from "@4miga/design-system/components/Text";
import { useOrders } from "contexts/orders";
import { useRouter } from "next/navigation";
import OrderCard from "public/cards/orderCard/card";
import Pagination from "public/components/pagination";
import { useState } from "react";
import BackArrow from "../../common/icons/BackArrow.svg";
import { MyOrderContainer } from "./style";

const MyOrders = () => {
  const [page, setPage] = useState<number>(1);
  const route = useRouter();
  const { orders } = useOrders();

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
        {orders.map((item, index) => {
          return <OrderCard key={index} item={item} />;
        })}
      </section>
      <Pagination page={page} setPage={setPage} totalPages={55} />
    </MyOrderContainer>
  );
};

export default MyOrders;
