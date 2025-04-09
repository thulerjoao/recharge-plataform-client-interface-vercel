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

interface Props {
  currentPage: number;
}

const MyOrders = ({ currentPage }: Props) => {
  const route = useRouter();
  const { orders, getOrders, updateOrders } = useOrders();
  const { logged } = useAuth();
  const totalPages: number = Math.ceil(orders.length / 6);
  const initialPage = () => {
    if (currentPage > totalPages) {
      return 1;
    } else {
      return currentPage;
    }
  };
  const [page, setPage] = useState<number>(initialPage());
  useEffect(() => {
    route.push(`/my-orders/${page}`);
  }, [page, route]);

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
