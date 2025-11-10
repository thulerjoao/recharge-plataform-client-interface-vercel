"use client";

import Text from "@4miga/design-system/components/Text";
import { useOrders } from "context/orders";
import { useRouter } from "next/navigation";
import OrderCard from "public/cards/orderCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import Pagination from "public/components/pagination";
import { useEffect, useState } from "react";
import { OrderType } from "types/orderType";
import { OrdersContainer } from "./style";

interface Props {
  currentPage: number;
  search: string;
  status: string | undefined;
}

const OrdersPage = ({ currentPage, search, status }: Props) => {
  const router = useRouter();
  const { orders, loadingOrders, getOrders, setPage, setFilter, setStatus } =
    useOrders();

  const [localFilter, setLocalFilter] = useState(search);
  const [localStatus, setLocalStatus] = useState(status);

  useEffect(() => {
    setPage(currentPage);
    setFilter(search);
    setLocalFilter(search);
    setStatus(status);
    setLocalStatus(status);
    getOrders(currentPage, 6, search, status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, search, status]);

  const handleChangeStatus = (newStatus: string) => {
    setLocalStatus(newStatus);
    const params = new URLSearchParams();
    if (localFilter) params.append("search", localFilter);
    if (newStatus) params.append("status", newStatus);
    const queryString = params.toString();
    const url = `/pedidos/1${queryString ? `?${queryString}` : ""}`;
    router.push(url);
  };

  const handleChangeFilter = (newFilter: string) => {
    setLocalFilter(newFilter);
    const params = new URLSearchParams();
    if (newFilter) params.append("search", newFilter);
    if (localStatus) params.append("status", localStatus);
    const queryString = params.toString();
    const url = `/pedidos/1${queryString ? `?${queryString}` : ""}`;
    router.push(url);
  };

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams();
    if (localFilter) params.append("search", localFilter);
    if (localStatus !== "all") params.append("status", localStatus);

    const queryString = params.toString();
    const url = `/pedidos/${newPage}${queryString ? `?${queryString}` : ""}`;

    router.push(url);
  };

  return (
    <OrdersContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader title="PEDIDOS" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          PEDIDOS
        </Text>
      </div>
      {/* <div className="desktop">
        <HeaderEnviroment>
          <HeaderSearch title="vendas" />
        </HeaderEnviroment>
      </div>
      <div className="desktop title">
        <SalesTitles />
      </div>

      <div className="mobile">
        <MobileSecondaryMenu title="VENDAS" />
      </div> */}

      <section className="cards">
        {loadingOrders && <div>Carregando...</div>}
        {!loadingOrders && orders?.data?.length === 0 && (
          <div className="emptyState">
            <Text align="center" fontName="REGULAR_MEDIUM" color="#666">
              Nenhum pedido encontrado
            </Text>
          </div>
        )}
        {orders?.data?.map((order: OrderType) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </section>
      {orders?.data?.length !== 0 && orders !== undefined && (
        <Pagination
          page={orders?.page}
          setPage={navigateToPage}
          totalPages={orders?.totalPages}
        />
      )}
      {/* <Pagination page={1} setPage={() => {}} totalPages={10} /> */}
    </OrdersContainer>
  );
};

export default OrdersPage;
