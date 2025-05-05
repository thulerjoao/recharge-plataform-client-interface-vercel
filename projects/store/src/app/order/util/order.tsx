"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
import { useProducts } from "contexts/products/ProductsProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BackArrow from "public/icons/BackArrow.svg";
import { useEffect, useState } from "react";
import { OrderType } from "types/orderType";
import { PackageType } from "types/productTypes";
import { apiUrl } from "utils/apiUrl";
import { formatDate } from "utils/formatDate";
import { formatPrice } from "utils/formatPrice";
import { formatString } from "utils/formatString";
import {
  handlePaymentStatus,
  handleRechargeStatus,
  handleStatusColor,
} from "utils/handleStatus";
import Pix from "../common/icons/Pix.svg";
import { OrderContainer } from "./style";

const Order = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRouter();
  const order: OrderType = JSON.parse(sessionStorage.getItem("order"));
  const { logged } = useAuth();
  useEffect(() => {
    if (!order) {
      route.replace("/home");
    }
    if (!logged) {
      sessionStorage.clear();
      route.replace("/home");
    }
  }, [order, logged, route]);

  const products = useProducts();
  const product = order
    ? products.find((item) => item.id === order.orderItem.productId)
    : null;

  const handleBuyAgain = () => {
    sessionStorage.removeItem("qrCode");
    sessionStorage.removeItem("copyAndPaste");
    sessionStorage.removeItem("orderId");
    const currentPackage = product.packages.find(
      (item: PackageType) => (item.id = order.orderItem.package.packageId),
    );
    if (currentPackage) {
      sessionStorage.setItem(
        "userId",
        order.orderItem.recharge.userIdForRecharge,
      );
      route.push(
        `/product/${formatString(product.name)}/${order.orderItem.package.packageId}`,
      );
    } else {
      sessionStorage.setItem(
        "userId",
        order.orderItem.recharge.userIdForRecharge,
      );
      route.push(`/home`);
    }
  };

  const goToPayment = () => {
    setLoading(true);
    connectionAPIGet<OrderType>(`/order/${order.orderId}/customer`, apiUrl)
      .then((res) => {
        sessionStorage.setItem("qrCode", res.payment.qrCode);
        sessionStorage.setItem("copyAndPaste", res.payment.qrCodetextCopyPaste);
        sessionStorage.setItem("orderId", res.orderId);
        sessionStorage.setItem(
          "userId",
          res.orderItem.recharge.userIdForRecharge,
        );
        route.push(
          `product/${formatString(res.orderItem.productName)}/${res.orderItem.package.packageId}`,
        );
      })
      .then(() => {});
  };

  return (
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
              src={product.imgCardUrl}
              alt="imagem do card"
            />
            <div>
              <Text align="end" fontName="REGULAR_MEDIUM" tag="h2">
                {order && order.orderItem.package.name.toUpperCase()}
              </Text>
              <Text
                margin="8px 0 0 0"
                align="end"
                color={Theme.colors.secondaryText}
                fontName="TINY"
                tag="h3"
              >
                {formatDate(order && order.createdAt)}
              </Text>
            </div>
          </div>
          <Text style={{ marginTop: "8px" }} fontName="REGULAR_MEDIUM">
            {order && order.orderItem.productName}
          </Text>
          <div className="secondaryRow">
            <Text fontName="SMALL_MEDIUM">Número do pedido</Text>
            <Text fontName="SMALL_MEDIUM" align="end">
              {order && order.orderNumber}
            </Text>
          </div>
          <div className="secondaryRow third">
            <Text fontName="SMALL_MEDIUM">ID de usuário</Text>
            <Text fontName="SMALL_MEDIUM" align="end">
              {order && order.orderItem.recharge.userIdForRecharge}
            </Text>
          </div>
        </section>
        <section className="secondarySection">
          <Text fontName="REGULAR_MEDIUM" tag="h2">
            Detalhes do pagamento
          </Text>
          <div className="outside">
            <span>
              {order && order.payment.name.toUpperCase() === "PIX" && <Pix />}
            </span>
            <div className="allInfos">
              <div className="innerContent">
                <Text fontName="SMALL_MEDIUM">
                  {order && order.payment.name}
                </Text>
                <Text fontName="SMALL_SEMI_BOLD" align="end">
                  R$ {formatPrice(order && order.totalAmount)}
                </Text>
              </div>
              <div className="innerContent">
                <Text
                  nowrap
                  fontName="TINY"
                  color={order && handleStatusColor(order.payment.status)}
                >
                  {order && handlePaymentStatus(order.payment.status)}
                </Text>
                <Text
                  align="end"
                  color={Theme.colors.secondaryText}
                  fontName="TINY"
                  tag="h3"
                >
                  {formatDate(order && order.payment.statusUpdatedAt)}
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
                src={order.orderItem.package.imgCardUrl}
                alt="imagem do card"
                height={40}
                width={40}
              />
            </span>
            <div className="allInfos">
              <div className="innerContent">
                <Text fontName="SMALL_MEDIUM">Bigo Live</Text>
                <Text fontName="SMALL_SEMI_BOLD" align="end">
                  {order && order.orderItem.recharge.amountCredits} DIAMANTES
                </Text>
              </div>
              <div className="innerContent">
                {order && order.payment.status === "PAYMENT_APPROVED" && (
                  <Text
                    nowrap
                    fontName="TINY"
                    color={
                      order &&
                      handleStatusColor(order.orderItem.recharge.status)
                    }
                  >
                    {order &&
                      handleRechargeStatus(order.orderItem.recharge.status)}
                  </Text>
                )}
                <Text
                  align="end"
                  color={Theme.colors.secondaryText}
                  fontName="TINY"
                  tag="h3"
                >
                  {order &&
                    formatDate(order.orderItem.recharge.statusUpdatedAt)}
                </Text>
              </div>
            </div>
          </div>
          {order &&
            order.payment.status === "PAYMENT_APPROVED" &&
            order.orderItem.recharge.status === "RECHARGE_PENDING" && (
              <Text margin="12px 0 -18px 0" align="center" fontName="TINY">
                O prazo para recarga é de até 24 horas
              </Text>
            )}
        </section>
      </main>
      {order && order.payment.status !== "PAYMENT_PENDING" ? (
        <Button
          margin="32px 0 0 0"
          width={228}
          rounded
          height={40}
          title="Comprar novamente"
          onClick={() => handleBuyAgain()}
        />
      ) : (
        <Button
          loading={loading}
          disabled={loading}
          margin="32px 0 0 0"
          width={248}
          rounded
          height={40}
          title="Prosseguir para pagamento"
          onClick={() => goToPayment()}
        />
      )}
    </OrderContainer>
  );
};

export default Order;
