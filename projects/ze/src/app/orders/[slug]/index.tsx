"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
import { useProducts } from "contexts/products/ProductsProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingDots from "public/components/loadingDots";
import BackArrow from "public/icons/BackArrow.svg";
import Pix from "public/icons/PixBig.svg";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { OrderType } from "types/orderType";
import { formatDate } from "utils/formatDate";
import { formatPrice } from "utils/formatPrice";
import { useConfirm } from "utils/confirm";
import {
  handlePaymentStatus,
  handleRechargeStatus,
  handleStatusColor,
} from "utils/handleStatus";
import { OrderContainer } from "./style";

const Order = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderType | null>(
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("order") || "null")
      : null,
  );
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const route = useRouter();
  const { logged } = useAuth();
  const { confirm, ConfirmComponent } = useConfirm();

  useEffect(() => {
    if (!order) {
      route.replace("/orders");
    }
    if (!logged) {
      sessionStorage.clear();
      route.replace("/home");
    }
  }, [order, logged, route]);

  const { product } = useProducts();

  const handleBuyAgain = () => {
    if (!order?.orderItem?.package?.packageId) return;
    sessionStorage.removeItem("order");
    const packageId = order.orderItem.package.packageId;

    route.push(`/product?package=${packageId}`);
  };

  const goToPayment = async () => {
    if (!order || order.orderStatus === "EXPIRED") {
      return;
    }

    const confirmed = await confirm(
      "Não nos responsabilizamos por pagamentos duplicados. \nRealize somente se estiver pendente.",
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    await connectionAPIGet<OrderType>(
      `/bravive/check-payment/${order.id}`,
    ).then((res) => {
      if (
        res.payment?.status === "PAYMENT_PENDING" &&
        res.orderStatus !== "EXPIRED"
      ) {
        sessionStorage.setItem("order", JSON.stringify(res));
        route.push(`/product?package=${res.orderItem?.package?.packageId}`);
      } else {
        return;
      }
    });
    setLoading(false);
  };

  // Simple polling to check payment and recharge status
  useEffect(() => {
    if (!order?.id) return;

    // Check if we need to poll
    const needsPolling =
      order.payment?.status === "PAYMENT_PENDING" ||
      (order.payment?.status === "PAYMENT_APPROVED" &&
        order.orderStatus !== "COMPLETED");

    if (!needsPolling) {
      // Clear interval if it exists and no longer needs polling
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const orderId = order.id;

    const checkPayment = async () => {
      try {
        const res = await connectionAPIGet<OrderType>(`/orders/${orderId}`);
        // Only update if still polling (status might have changed)
        const stillNeedsPolling =
          res.payment?.status === "PAYMENT_PENDING" ||
          (res.payment?.status === "PAYMENT_APPROVED" &&
            res.orderStatus !== "COMPLETED");

        setOrder(res);
        sessionStorage.setItem("order", JSON.stringify(res));

        // Stop polling if completed
        if (!stillNeedsPolling && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } catch (err) {
        /* empty */
      }
    };

    // First check immediately
    checkPayment();
    intervalRef.current = setInterval(() => {
      checkPayment();
    }, 15000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [order?.id, order?.payment?.status, order?.orderStatus]);

  return (
    <>
      <OrderContainer>
        <div className="topMessage">
          <span onClick={() => route.back()}>
            <BackArrow />
          </span>
          <Text tag="h1" align="center" fontName="REGULAR_SEMI_BOLD">
            DETALHES DO PEDIDO
          </Text>
        </div>
        <main>
          <section className="fisrtSection">
            <div className="fisrtRow">
              <Image
                height={72}
                width={72}
                src={product?.imgCardUrl || ""}
                alt="imagem do card"
                quality={75}
              />
              <div>
                <Text align="end" fontName="REGULAR_MEDIUM" tag="h2">
                  {order?.orderItem?.package?.name?.toUpperCase()}
                </Text>
                <Text
                  margin="8px 0 0 0"
                  align="end"
                  color={theme.text_03}
                  fontName="TINY"
                  tag="h3"
                >
                  {formatDate(order?.createdAt)}
                </Text>
              </div>
            </div>
            <Text style={{ marginTop: "8px" }} fontName="REGULAR_MEDIUM">
              {order?.orderItem?.productName}
            </Text>
            <div className="secondaryRow">
              <Text fontName="SMALL_MEDIUM">Número do pedido</Text>
              <Text fontName="SMALL_MEDIUM" align="end">
                {order?.orderNumber}
              </Text>
            </div>
            <div className="secondaryRow third">
              <Text fontName="SMALL_MEDIUM">ID de usuário</Text>
              <Text fontName="SMALL_MEDIUM" align="end">
                {order?.orderItem?.recharge?.userIdForRecharge}
              </Text>
            </div>
          </section>
          <section className="secondarySection">
            <Text fontName="REGULAR_MEDIUM" tag="h2">
              Detalhes do pagamento
            </Text>
            <div className="outside">
              <span>
                {order?.payment?.name?.toUpperCase() === "PIX" && <Pix />}
              </span>
              <div className="allInfos">
                <div className="innerContent">
                  <Text fontName="SMALL_MEDIUM">{order?.payment?.name}</Text>
                  <Text fontName="SMALL_SEMI_BOLD" align="end">
                    R$ {formatPrice(order?.price)}
                  </Text>
                </div>
                <div className="innerContent">
                  <Text
                    nowrap
                    fontName="TINY"
                    color={handleStatusColor(order?.payment?.status)}
                  >
                    {handlePaymentStatus(order?.payment?.status)}
                    {/* {order?.payment?.status === "PAYMENT_PENDING" && (
                      
                    )} */}
                  </Text>
                  <Text
                    align="end"
                    color={theme.text_03}
                    fontName="TINY"
                    tag="h3"
                  >
                    {formatDate(order?.payment?.statusUpdatedAt)}
                  </Text>
                </div>
              </div>
            </div>
          </section>
          <section className="thirdSection">
            <Text fontName="REGULAR_MEDIUM" tag="h2">
              Detalhes da recarga
            </Text>
            <div className="outside">
              <span>
                <Image
                  height={40}
                  width={40}
                  src={order?.orderItem?.package?.imgCardUrl}
                  alt="imagem do card"
                  quality={75}
                />
              </span>
              <div className="allInfos">
                <div className="innerContent">
                  <Text fontName="SMALL_MEDIUM">Bigo Live</Text>
                  <Text fontName="SMALL_SEMI_BOLD" align="end">
                    {order?.orderItem?.recharge?.amountCredits} DIAMANTES
                  </Text>
                </div>
                <div className="innerContent">
                  {order?.payment?.status === "PAYMENT_APPROVED" && (
                    <Text
                      nowrap
                      fontName="TINY"
                      color={handleStatusColor(
                        order?.orderItem?.recharge?.status,
                      )}
                    >
                      {handleRechargeStatus(order?.orderItem?.recharge?.status)}
                    </Text>
                  )}
                  <Text
                    align="end"
                    color={theme.text_03}
                    fontName="TINY"
                    tag="h3"
                  >
                    {formatDate(order?.orderItem?.recharge?.statusUpdatedAt)}
                  </Text>
                </div>
              </div>
            </div>
            {(order?.orderStatus === "CREATED" ||
              order?.orderStatus === "PROCESSING") && (
              <Text
                color={theme.pending}
                margin="12px 0 -18px 0"
                align="center"
                fontName="TINY"
              >
                Aguarde enquanto processamos seu pedido{<LoadingDots />}
              </Text>
            )}
          </section>
        </main>
        {/* {order?.orderStatus === "COMPLETED" && (
          <Button
            margin="32px 0 0 0"
            width={228}
            rounded
            height={40}
            title="Repetir pedido"
            onClick={() => handleBuyAgain()}
          />
        )} */}
        {order?.payment?.status === "PAYMENT_PENDING" &&
        order?.orderStatus === "CREATED" ? (
          // <Button
          //   loading={loading}
          //   disabled={loading}
          //   margin="32px 0 0 0"
          //   width={248}
          //   rounded
          //   height={38}
          //   title="Realizar pagamento"
          //   onClick={() => goToPayment()}
          // />
          <div className="paymentPendingContainer">
            <Text nowrap color={theme.text_03} align="start" fontName="TINY">
              Ainda nao realizou o pagamento?
            </Text>
            <Text
              nowrap
              color={theme.mainColor}
              underline
              pointer
              fontName="TINY"
              align="start"
              onClick={() => goToPayment()}
            >
              Pagar agora
            </Text>
          </div>
        ) : (
          <Button
            margin="32px 0 0 0"
            width={228}
            rounded
            height={40}
            title="Repetir pedido"
            onClick={() => handleBuyAgain()}
          />
        )}
        {ConfirmComponent}
      </OrderContainer>
    </>
  );
};

export default Order;
