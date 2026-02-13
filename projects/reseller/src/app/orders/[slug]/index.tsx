"use client";

import Text from "@4miga/design-system/components/Text";
import { useTheme } from "styled-components";
import {
  connectionAPIGet,
  connectionAPIPost,
} from "@4miga/services/connectionAPI/connection";
import Image from "next/image";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { OrderType } from "types/orderType";
import { useConfirm } from "utils/confirm";
import { formatDate } from "utils/formatDate";
import { formatPhone } from "utils/formatPhone";
import { formatPrice } from "utils/formatPrice";
import {
  handlePaymentStatus,
  handleRechargeStatus,
  handleStatusColor,
} from "utils/handleStatus";
import Pix from "../common/icons/Pix.svg";
import { SalesInnerPageContainer } from "./style";

const OrdersInnerPage = ({ slug }: { slug: string }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderType>();
  const { confirm, ConfirmComponent } = useConfirm();
  useEffect(() => {
    connectionAPIGet<OrderType>(`/orders/${slug}`)
      .then((res) => {
        setOrder(res);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  const handleGetOrder = () => {
    setLoading(true);
    const sessionOrder = JSON.parse(sessionStorage.getItem("order") || "null");
    if (sessionOrder) {
      setOrder(sessionOrder);
      return;
    } else {
      connectionAPIGet<OrderType>(`/orders/${slug}`)
        .then((res) => {
          setOrder(res);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleMarkAsCompleted = async (orderNumber: string) => {
    const confirmation = await confirm("Deseja realmente concluir o pedido?");
    if (!confirmation) {
      return;
    }
    setLoading(true);
    connectionAPIPost<OrderType>(`/orders/${orderNumber}/manual-complete`, {})
      .then((res) => {
        setOrder(res);
        toast.success("Pedido finalizado");
      })
      .catch(() => {
        toast.error("Erro ao finalizar pedido");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <SalesInnerPageContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="DETALHES DA VENDA" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          PEDIDO
        </Text>
      </div>
      <main>
        <section className="top">
          <div className="leftTop">
            <Image
              width={164}
              height={164}
              src={order?.orderItem.package.imgCardUrl || ""}
              alt="Card do jogo"
            />
            <Text nowrap margin="24px 0 0 0" fontName="SMALL_MEDIUM">
              Número do pedido
            </Text>
            <Text nowrap fontName="SMALL_MEDIUM">
              ID de usuário
            </Text>
            <Text nowrap fontName="SMALL_MEDIUM">
              Cupom
            </Text>
            <Text nowrap fontName="SMALL_MEDIUM">
              Nome
            </Text>
            <Text nowrap fontName="SMALL_MEDIUM">
              E-mail
            </Text>
            <Text nowrap fontName="SMALL_MEDIUM">
              Telefone
            </Text>
          </div>
          <div className="rightTop">
            <Text tag="h2" align="end" fontName="REGULAR_MEDIUM">
              {order?.orderItem.package.name}
            </Text>
            <Text tag="h3" align="end" fontName="TINY" color={theme.text_03}>
              {formatDate(order?.createdAt)}
            </Text>
            <Text align="end" fontName="SMALL_MEDIUM">
              {order?.orderNumber}
            </Text>
            <Text align="end" fontName="SMALL_MEDIUM">
              {order?.orderItem.recharge.userIdForRecharge || "-"}
            </Text>
            <Text align="end" fontName="SMALL_MEDIUM">
              {order?.couponUsages.length > 0
                ? order?.couponUsages[0].coupon.title
                : "-"}
            </Text>
            <Text align="end" fontName="SMALL_MEDIUM">
              {order?.user?.name || "-"}
            </Text>
            <Text align="end" fontName="SMALL_MEDIUM">
              {order?.user?.email || "-"}
            </Text>
            <Text align="end" fontName="SMALL_MEDIUM">
              {formatPhone(order?.user?.phone || "")}
            </Text>
          </div>
        </section>
        <Text margin="24px 0 16px 0" fontName="REGULAR_MEDIUM">
          Detalhes do pagamento
        </Text>
        <section className="medium">
          <span>
            <Pix />
          </span>
          <section>
            <div className="leftMedium">
              <Text fontName="SMALL_MEDIUM">Pix</Text>
              <Text
                fontName="TINY"
                color={
                  order?.orderStatus === "EXPIRED"
                    ? theme.refused
                    : handleStatusColor(order?.payment.status)
                }
              >
                {order?.orderStatus === "EXPIRED"
                  ? "Pagamento cancelado"
                  : handlePaymentStatus(order?.payment.status)}
              </Text>
            </div>
            <div className="rightMedium">
              <Text align="end" fontName="SMALL_SEMI_BOLD">
                R$ {formatPrice(order?.price || 0)}
              </Text>
              <Text align="end" fontName="TINY" color={theme.text_03}>
                {formatDate(order?.payment.statusUpdatedAt || "")}
              </Text>
            </div>
          </section>
        </section>
        <Text margin="24px 0 16px 0" fontName="REGULAR_MEDIUM">
          Detalhes da recarga
        </Text>
        <section className="bottom">
          <Image
            width={64}
            height={64}
            src={order?.orderItem.package.imgCardUrl || ""}
            alt="Imagem do pacote"
          />
          <section>
            <div className="leftMedium">
              <Text fontName="SMALL_MEDIUM">Bigo Live</Text>
              {order?.payment?.status === "PAYMENT_APPROVED" && (
                <Text
                  fontName="TINY"
                  color={handleStatusColor(order?.orderItem.recharge.status)}
                >
                  {handleRechargeStatus(order?.orderItem.recharge.status)}
                </Text>
              )}
            </div>
            <div className="rightMedium">
              <Text align="end" fontName="SMALL_SEMI_BOLD">
                {order?.orderItem.recharge.amountCredits}
              </Text>
              <Text align="end" fontName="TINY" color={theme.text_03}>
                {formatDate(order?.orderItem.recharge.statusUpdatedAt || "")}
              </Text>
            </div>
          </section>
        </section>
        {order?.orderStatus !== "COMPLETED" && (
          <Text
            fontName="TINY_MEDIUM"
            color={theme.mainColor}
            underline
            pointer
            align="center"
            margin="12px 0 0 0"
            onClick={() => handleMarkAsCompleted(order?.orderNumber || "")}
          >
            Marcar pedido como concluído (emergência)
          </Text>
        )}
      </main>
      {ConfirmComponent}
    </SalesInnerPageContainer>
  );
};

export default OrdersInnerPage;
