"use client";

import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { useOrders } from "context/orders";
import { useRouter } from "next/navigation";
import OrderCard from "public/cards/orderCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import Pagination from "public/components/pagination";
import { useEffect, useState } from "react";
import { OrderStatus, OrderType } from "types/orderType";
import Search from "../icons/Search.svg";
import { OrdersContainer } from "./style";

interface Props {
  currentPage: number;
  search: string;
  status: OrderStatus | undefined;
  productId: string | undefined;
}

const OrdersPage = ({ currentPage, search, status, productId }: Props) => {
  const router = useRouter();
  const {
    orders,
    loadingOrders,
    getOrders,
    setPage,
    setFilter,
    setStatus,
    setProductFilter,
    productFilter,
  } = useOrders();

  const [localFilter, setLocalFilter] = useState(search);
  const [localStatus, setLocalStatus] = useState<OrderStatus | undefined>(
    status,
  );
  const [localProductFilter, setLocalProductFilter] =
    useState<string>(productId);

  useEffect(() => {
    setPage(currentPage);
    setFilter(search);
    setLocalFilter(search);
    setStatus(status);
    setLocalStatus(status);
    setProductFilter(productId);
    getOrders(currentPage, 6, search, status, productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, search, status, productId]);

  const handleChangeStatus = (newStatus: OrderStatus) => {
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

  const handleChangeProductFilter = (newProductFilter: string) => {
    setLocalProductFilter(newProductFilter);
    const params = new URLSearchParams();
    if (newProductFilter) params.append("productId", newProductFilter);
    const queryString = params.toString();
    const url = `/pedidos/1${queryString ? `?${queryString}` : ""}`;
    router.push(url);
  };

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams();
    if (localFilter) params.append("search", localFilter);
    if (localStatus !== undefined) params.append("status", localStatus);

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
      <div className="filtersSection">
        <form
          className="searchSection"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleChangeFilter(localFilter);
          }}
        >
          <Input
            value={localFilter}
            onChange={(e) => setLocalFilter(e.target.value)}
            onBlur={() => handleChangeFilter(localFilter)}
            placeholder="Número do pedido ou email..."
            height={36}
          />
          <div
            className="searchButton"
            onClick={() => handleChangeFilter(localFilter)}
          >
            <Search />
          </div>
        </form>
        <div className="filterControls">
          <select
            value={localProductFilter}
            onChange={(e) =>
              handleChangeProductFilter(e.target.value as string)
            }
            className="filterSelect"
          >
            <option value="">Plataforma</option>
            {orders?.products?.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <select
            value={localStatus}
            onChange={(e) => {
              handleChangeStatus(e.target.value as OrderStatus);
            }}
            className="filterSelect"
          >
            <option value="all">Todos os status</option>
            <option value="processing">Pendente</option>
            <option value="completed">Finalizado</option>
            <option value="expired">Expirado</option>
            <option value="refunded">Extornado</option>
          </select>
        </div>
      </div>
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
