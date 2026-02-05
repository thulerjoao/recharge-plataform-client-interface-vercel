"use client";

import LoadingPage from "app/loading";
import Text from "@4miga/design-system/components/Text";
import { useOrders } from "context/orders";
import { useRouter } from "next/navigation";
import CustomerCard from "public/cards/customerCard";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import Pagination from "public/components/pagination";
import {
  connectionAPIDelete,
  connectionAPIGet,
} from "@4miga/services/connectionAPI/connection";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useConfirm } from "utils/confirm";
import { OrderType } from "types/orderType";
import type { CustomerCardDisplayData } from "public/cards/customerCard";
import type { StoreUserType, StoreUsersResponseType } from "types/customerType";
import { CustomerOrdersContainer } from "./style";
import OrderCardBigo from "public/cards/orderCardBigo/card";

function getDisplayData(user: StoreUserType): CustomerCardDisplayData {
  const d = user.deletedUserData;
  if (d) {
    return {
      name: d.name?.trim() ?? "—",
      email: d.email ?? "—",
      phone: d.phone ?? "—",
      documentValue: d.documentValue ?? "—",
    };
  }
  return {
    name: user.name?.trim() ?? "—",
    email: user.email ?? "—",
    phone: user.phone ?? "—",
    documentValue: user.documentValue ?? "—",
  };
}

interface Props {
  currentPage: number;
  customerEmail: string;
}

const LIMIT = 6;
const CUSTOMER_ORDERS_DISPLAY_KEY = "customerOrdersDisplay";

type CustomerWithId = CustomerCardDisplayData & { id?: string };

const DELETE_CONFIRM_MESSAGE = "Tem certeza que deseja excluir este usuário?";

const CustomerOrdersPage = ({ currentPage, customerEmail }: Props) => {
  const router = useRouter();
  const { orders, loadingOrders, getOrders } = useOrders();
  const { confirm, ConfirmComponent } = useConfirm();
  const [customer, setCustomer] = useState<CustomerWithId | null>(null);

  const fetchCustomer = useCallback(async (email: string) => {
    if (!email.trim()) return;
    try {
      const res = await connectionAPIGet<StoreUsersResponseType>(
        `/user?search=${encodeURIComponent(email)}&limit=1&page=1&status=active`,
      );
      const user = res?.data?.[0];
      if (user) {
        setCustomer({ ...getDisplayData(user), id: user.id });
      } else {
        setCustomer({
          name: "—",
          email,
          phone: "—",
          documentValue: "—",
        });
      }
    } catch {
      setCustomer({
        name: "—",
        email,
        phone: "—",
        documentValue: "—",
      });
    }
  }, []);

  useEffect(() => {
    if (!customerEmail.trim()) return;
    try {
      const stored = sessionStorage.getItem(CUSTOMER_ORDERS_DISPLAY_KEY);
      if (stored) {
        const data = JSON.parse(stored) as CustomerWithId;
        if (data.email === customerEmail) {
          setCustomer(data);
          sessionStorage.removeItem(CUSTOMER_ORDERS_DISPLAY_KEY);
          return;
        }
      }
    } catch {
      // ignore invalid stored data
    }
    fetchCustomer(customerEmail);
  }, [customerEmail, fetchCustomer]);

  useEffect(() => {
    if (customerEmail.trim()) {
      getOrders(currentPage, LIMIT, customerEmail.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, customerEmail]);

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams();
    params.append("page", newPage.toString());
    if (customerEmail) params.append("email", customerEmail);
    router.push(`/customers/orders?${params.toString()}`);
  };

  const handleDeleteCustomer = useCallback(async () => {
    if (!customer?.id) return;
    try {
      await connectionAPIDelete(`/user/${customer.id}`);
      router.push("/customers");
    } catch {
      toast.error("Erro ao excluír usuário");
    }
  }, [customer?.id, router]);

  if (!customerEmail.trim()) {
    return (
      <CustomerOrdersContainer>
        <div className="centerContainer">
          <div className="desktop">
            <HeaderEnviroment>
              <DefaultHeader backWard title="PEDIDOS DO CLIENTE" />
            </HeaderEnviroment>
          </div>
          <div className="emptyState">
            <Text align="center" fontName="REGULAR_MEDIUM" color="#666">
              Informe o email do cliente para ver os pedidos.
            </Text>
          </div>
        </div>
      </CustomerOrdersContainer>
    );
  }

  if (loadingOrders) {
    return <LoadingPage />;
  }

  return (
    <CustomerOrdersContainer>
      <div className="centerContainer">
        <div className="desktop">
          <HeaderEnviroment>
            <DefaultHeader backWard title="DETALHES DO CLIENTE" />
          </HeaderEnviroment>
        </div>
        <div className="mobile mobileHeader">
          <Text align="center" fontName="LARGE_SEMI_BOLD">
            CLIENTE
          </Text>
        </div>

        <section className="customerCardSection">
          {customer ? (
            <CustomerCard
              displayData={customer}
              deleteAction={
                customer.id
                  ? {
                      confirmMessage: DELETE_CONFIRM_MESSAGE,
                      confirm,
                      onConfirm: handleDeleteCustomer,
                    }
                  : undefined
              }
            />
          ) : null}
        </section>

        {ConfirmComponent}

        <section className="cards">
          {orders?.data?.length === 0 && (
            <div className="emptyState">
              <Text align="center" fontName="REGULAR_MEDIUM" color="#666">
                Nenhum pedido encontrado para este cliente.
              </Text>
            </div>
          )}
          {orders?.data?.map((order: OrderType) => (
            <div className="orderCardContainer" key={order.id}>
              <OrderCardBigo order={order} />
            </div>
          ))}
        </section>

        {orders?.data?.length !== 0 && orders !== undefined && (
          <Pagination
            page={orders.page}
            setPage={navigateToPage}
            totalPages={orders.totalPages}
          />
        )}
      </div>
    </CustomerOrdersContainer>
  );
};

export default CustomerOrdersPage;
