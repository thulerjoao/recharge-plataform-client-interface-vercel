"use client";

import Text from "@4miga/design-system/components/Text";
import { useAuth } from "contexts/auth";
import { useOrders } from "contexts/orders";
import { useRouter } from "next/navigation";
import OrderCard from "public/cards/orderCard/card";
import SkeletonOrderCard from "public/cards/orderCard/skeletonOrderCard";
import LoginModal from "public/components/loginModal";
import Pagination from "public/components/pagination";
import BackArrow from "public/icons/BackArrow.svg";
import { useEffect } from "react";
import { MyOrderContainer } from "./style";

interface Props {
  currentPage: number;
}

const MyOrders = ({ currentPage }: Props) => {
  const route = useRouter();
  const { loadingOrders, orders, getOrders, setPage } = useOrders();
  const { logged } = useAuth();

  useEffect(() => {
    setPage(currentPage);
    getOrders(currentPage, 6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams();
    params.append("page", newPage.toString());
    route.push(`/my-orders?${params.toString()}`);
  };

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
        {loadingOrders && orders?.totalOrders === 0 && <SkeletonOrderCard />}
        {!loadingOrders && orders?.totalOrders === 0 && (
          <div className="ordersAlert">
            <Text align="center" fontName="REGULAR">
              Você ainda não realizou nenhum pedido
            </Text>
          </div>
        )}
        {orders?.data.map((order, index) => {
          return <OrderCard key={index} order={order} />;
        })}
      </section>
      {orders && (
        <Pagination
          page={orders?.page}
          setPage={navigateToPage}
          totalPages={orders?.totalPages}
        />
      )}
      {!logged && <LoginModal />}
    </MyOrderContainer>
  );
};

export default MyOrders;
