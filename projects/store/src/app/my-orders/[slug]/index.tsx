"use client";

import Text from "@4miga/design-system/components/Text";
import { useAuth } from "contexts/auth";
import { useOrders } from "contexts/orders";
import { useRouter } from "next/navigation";
import OrderCard from "public/cards/orderCard/card";
import LoadingDots from "public/components/loadingDots";
import LoginModal from "public/components/loginModal";
import Pagination from "public/components/pagination";
import { useEffect, useState } from "react";
import BackArrow from "../../common/icons/BackArrow.svg";
import { MyOrderContainer } from "./style";

interface Props {
  currentPage: number;
}

const MyOrders = ({ currentPage }: Props) => {
  const route = useRouter();
  const { loadingOrders, orders, getOrders, updateOrders } = useOrders();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged]);

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
        {loadingOrders && orders.length === 0 && (
          <div className="ordersAlert">
            <Text style={{ width: "110px" }} nowrap fontName="REGULAR">
              Carregando{<LoadingDots />}
            </Text>
          </div>
        )}
        {!loadingOrders && orders.length === 0 && (
          <div className="ordersAlert">
            <Text align="center" fontName="REGULAR">
              Você ainda não realizou nenhum pedido
            </Text>
          </div>
        )}
        {getOrders(page).map((order, index) => {
          return <OrderCard key={index} order={order} />;
        })}
      </section>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      {!logged && <LoginModal />}
    </MyOrderContainer>
  );
};

export default MyOrders;
