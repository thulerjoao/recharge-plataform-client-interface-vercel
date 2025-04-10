"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useAuth } from "contexts/auth";
import { useProducts } from "contexts/products/ProductsProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageNotFound from "public/img/ImageNotFound.jpg";
import { useEffect, useState } from "react";
import { OrderType } from "types/orderType";
import { checkImageUrl } from "utils/checkImageUrl";
import { formatDate } from "utils/formatDate";
import { formatPrice } from "utils/formatPrice";
import { formatString } from "utils/formatString";
import {
  handlePaymentStatus,
  handleRechargeStatus,
  handleStatusColor,
} from "utils/handleStatus";
import BackArrow from "../../common/icons/BackArrow.svg";
import Pix from "../common/icons/Pix.svg";
import { OrderContainer } from "./style";

const Order = () => {
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

  const [isImageValid, setIsImageValid] = useState<boolean>(false);

  useEffect(() => {
    const checkImage = async () => {
      if (order?.orderItem?.package?.imgCardUrl) {
        const valid = await checkImageUrl(order.orderItem.package.imgCardUrl);
        setIsImageValid(valid);
      }
    };
    checkImage();
  }, [order]);

  const handleBuyAgain = () => {
    sessionStorage.removeItem("qrCode");
    sessionStorage.removeItem("copyAndPaste");
    sessionStorage.removeItem("orderId");
    route.push(
      `/product/${formatString(product.name)}/${order.orderItem.package.packageId}`,
    );
  };

  const goToPayment = () => {
    sessionStorage.setItem("qrCode", order.payment.qrCode);
    sessionStorage.setItem("copyAndPaste", order.payment.qrCodetextCopyPaste);
    sessionStorage.setItem("orderId", order.orderId);
    sessionStorage.setItem(
      "userId",
      order.orderItem.recharge.userIdForRecharge,
    );
    route.push(
      `product/${formatString(order.orderItem.productName)}/${order.orderItem.package.packageId}`,
    );
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
              src={isImageValid ? product.imgCardUrl : ImageNotFound}
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
                src={
                  isImageValid
                    ? order.orderItem.package.imgCardUrl
                    : ImageNotFound
                }
                alt="imagem do card"
              />
              {/* <MiniBigo />{order.package.imgCardUrl} */}
            </span>
            <div className="allInfos">
              <div className="innerContent">
                <Text fontName="SMALL_MEDIUM">Bigo Live</Text>
                <Text fontName="SMALL_SEMI_BOLD" align="end">
                  {order && order.orderItem.recharge.amountCredits} DIAMANTES
                </Text>
              </div>
              <div className="innerContent">
                <Text
                  nowrap
                  fontName="TINY"
                  color={
                    order && handleStatusColor(order.orderItem.recharge.status)
                  }
                >
                  {order &&
                    handleRechargeStatus(order.orderItem.recharge.status)}
                </Text>
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
