"use client";

import Text from "@4miga/design-system/components/Text";
import { useAuth } from "contexts/auth";
import { useOrders } from "contexts/orders";
import { useRouter } from "next/navigation";
import OrderCard from "public/cards/orderCard/card";
import Pagination from "public/components/pagination";
import { useEffect, useState } from "react";
import BackArrow from "../../common/icons/BackArrow.svg";
import { MyOrderContainer } from "./style";

const MyOrders = () => {
  const [page, setPage] = useState<number>(1);
  const route = useRouter();
  const { orders, getOrders, updateOrders } = useOrders();
  const { logged } = useAuth();
  const totalPages = Math.ceil(orders.length / 6);

  useEffect(() => {
    if (logged) {
      updateOrders();
    }
  }, [logged, updateOrders]);

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
        {getOrders(page).map((order, index) => {
          return <OrderCard key={index} order={order} />;
        })}
      </section>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </MyOrderContainer>
  );
};

export default MyOrders;
