"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useProducts } from "contexts/products/ProductsProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageNotFound from "public/img/ImageNotFound.jpg";
import { useEffect, useState } from "react";
import { OrderType } from "types/orderType";
import { checkImageUrl } from "utils/checkImageUrl";
import { formatDate } from "utils/formatDate";
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
  const products = useProducts();
  const product = products.find(
    (item) => item.id === order.orderItem.productId,
  );
  const [isImageValid, setIsImageValid] = useState<boolean>(false);
  console.log(order);

  useEffect(() => {
    const checkImage = async () => {
      const valid = await checkImageUrl(order.orderItem.package.imgCardUrl);
      setIsImageValid(valid);
    };

    checkImage();
  }, [order.orderItem.package.imgCardUrl]);

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
                {order.orderItem.package.name.toUpperCase()}
              </Text>
              <Text
                margin="8px 0 0 0"
                align="end"
                color={Theme.colors.secondaryText}
                fontName="TINY"
                tag="h3"
              >
                {formatDate(order.createdAt)}
              </Text>
            </div>
          </div>
          <Text style={{ marginTop: "8px" }} fontName="REGULAR_MEDIUM">
            {order.orderItem.productName}
          </Text>
          <div className="secondaryRow">
            <Text fontName="SMALL_MEDIUM">Número do pedido</Text>
            <Text fontName="SMALL_MEDIUM" align="end">
              {order.orderNumber}
            </Text>
          </div>
          <div className="secondaryRow third">
            <Text fontName="SMALL_MEDIUM">ID de usuário</Text>
            <Text fontName="SMALL_MEDIUM" align="end">
              {order.orderItem.recharge.userIdForRecharge}
            </Text>
          </div>
        </section>
        <section className="secondarySection">
          <Text fontName="REGULAR_MEDIUM" tag="h2">
            Detalhes do pagamento
          </Text>
          <div className="outside">
            <span>{order.payment.name.toUpperCase() === "PIX" && <Pix />}</span>
            <div className="allInfos">
              <div className="innerContent">
                <Text fontName="SMALL_MEDIUM">{order.payment.name}</Text>
                <Text fontName="SMALL_SEMI_BOLD" align="end">
                  R$ {order.totalAmount}
                </Text>
              </div>
              <div className="innerContent">
                <Text
                  nowrap
                  fontName="TINY"
                  color={handleStatusColor(order.payment.status)}
                >
                  {handlePaymentStatus(order.payment.status)}
                </Text>
                <Text
                  align="end"
                  color={Theme.colors.secondaryText}
                  fontName="TINY"
                  tag="h3"
                >
                  {formatDate(order.payment.statusUpdatedAt)}
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
                  {order.orderItem.recharge.amountCredits} DIAMANTES
                </Text>
              </div>
              <div className="innerContent">
                <Text
                  nowrap
                  fontName="TINY"
                  color={handleStatusColor(order.orderItem.recharge.status)}
                >
                  {handleRechargeStatus(order.orderItem.recharge.status)}
                </Text>
                <Text
                  align="end"
                  color={Theme.colors.secondaryText}
                  fontName="TINY"
                  tag="h3"
                >
                  {formatDate(order.orderItem.recharge.statusUpdatedAt)}
                </Text>
              </div>
            </div>
          </div>
        </section>
      </main>
      {order.payment.status !== "PAYMENT_PENDING" ? (
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
