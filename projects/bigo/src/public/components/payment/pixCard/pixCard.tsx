/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import {
  connectionAPIGet,
  connectionAPIPost,
} from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
import { useRouter } from "next/navigation";
import LoginModal from "public/components/loginModal";
import Pix from "public/icons/Pix.svg";
import React, { useEffect, useState } from "react";
import { StyleSheetManager } from "styled-components";
import { OrderType } from "types/orderType";
import { PixPaymentResponse } from "types/paymentType";
import { apiUrl } from "utils/apiUrl";
import { formatPrice } from "utils/formatPrice";
import { BottomElement, PixCardContainer } from "./style";

interface Props {
  userId: string;
  packageId: string;
  paymentMethodName: string;
  price: number;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const PixCard = ({
  userId,
  packageId,
  paymentMethodName,
  price,
  setError,
}: Props) => {
  const [initialized, setInitialized] = useState<boolean>(true);
  const [firstExpand, setFirstExpand] = useState<boolean>(true);
  const [secondExpand, setSecondExpand] = useState<boolean>(false);
  const [isRounded, setIsRounded] = useState<boolean>(true);
  const [pixLoading, setPixLoading] = useState<boolean>(false);
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<string>(undefined);
  const [copyAndPaste, setCopyAndPaste] = useState<string>(undefined);
  const [orderId, setOrderId] = useState<string>(undefined);
  const [modal, setModal] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const { logged } = useAuth();
  const route = useRouter();

  const handleFirstExpand = () => {
    if (typeof qrCode === "string" && typeof copyAndPaste === "string") {
      setInitialized(true);
      setSecondExpand(true);
    }
    if (!initialized) {
      setInitialized(true);
    }
    setFirstExpand(!firstExpand);
  };

  useEffect(() => {
    if (firstExpand === false) {
      setTimeout(() => {
        setIsRounded(true);
      }, 400);
    } else {
      setIsRounded(false);
    }
  }, [firstExpand]);

  useEffect(() => {
    if (logged) {
      const orderId = sessionStorage.getItem("orderId");
      if (orderId) {
        setPixLoading(true);
        connectionAPIGet<OrderType>(`/order/${orderId}/customer`, apiUrl)
          .then((res) => {
            if (res.payment.status === "PAYMENT_APPROVED") {
              sessionStorage.removeItem("orderId");
              sessionStorage.removeItem("qrCode");
              sessionStorage.removeItem("copyAndPaste");
              setFirstExpand(true);
              setInitialized(true);
            } else {
              setOrderId(orderId);
              const qrCode = sessionStorage.getItem("qrCode");
              if (qrCode) setQrCode(qrCode);
              const copyAndPaste = sessionStorage.getItem("copyAndPaste");
              if (copyAndPaste) setCopyAndPaste(copyAndPaste);
              if (qrCode && copyAndPaste && orderId) {
                setFirstExpand(true);
                setInitialized(true);
                setSecondExpand(true);
              }
            }
            setPixLoading(false);
          })
          .catch(() => {
            sessionStorage.removeItem("orderId");
            sessionStorage.removeItem("qrCode");
            sessionStorage.removeItem("copyAndPaste");
            setPixLoading(false);
          });
      } else {
        setFirstExpand(true);
        setInitialized(true);
      }
    }
  }, [logged]);

  const handleCopy = async () => {
    if (!copyAndPaste) {
      alert("Nenhum código para copiar.");
      return;
    }

    try {
      await navigator.clipboard.writeText(copyAndPaste);
      alert("Código copiado para área de transferência");
    } catch (err) {
      alert("Erro ao copiar o código.");
    }
  };

  const handleClick = () => {
    setClicked(true);
    if (secondExpand) {
      handleCopy();
      return;
    } else if (firstExpand) {
      if (userId) {
        if (!logged) return setModal(true);
        setPixLoading(true);
        const body = {
          userIdForRecharge: userId,
          packageId,
          paymentMethodName,
          price,
        };
        connectionAPIPost<PixPaymentResponse>("/order", body, apiUrl)
          .then((res) => {
            setQrCode(res.qrCode);
            setCopyAndPaste(res.qrCodetextCopyPaste);
            setOrderId(res.orderId);
            sessionStorage.setItem("qrCode", res.qrCode);
            sessionStorage.setItem("copyAndPaste", res.qrCodetextCopyPaste);
            sessionStorage.setItem("orderId", res.orderId);
            setPixLoading(false);
            setSecondExpand(true);
          })
          .catch((error) => {
            const message = error.response.data.message[0];
            setPixLoading(false);
            handleResponse(message);
          });
      } else {
        setError("ID de usuário inválido");
        setPixLoading(false);
      }
    }
  };

  useEffect(() => {
    if (logged && clicked) {
      handleClick();
    }
  }, [logged, clicked]);

  const handleCheckOrder = () => {
    setOrderLoading(true);
    connectionAPIGet<OrderType>(`/order/${orderId}/customer`, apiUrl)
      .then((res) => {
        sessionStorage.setItem("order", JSON.stringify(res));
        route.push("/order");
      })
      .catch((error) => {
        console.log(error);
        setError("Erro ao verificar o pedido");
        setOrderLoading(false);
      });
  };

  useEffect(() => {
    if (!qrCode || !copyAndPaste || !orderId) return;

    const interval = setInterval(() => {
      connectionAPIGet<OrderType>(`/order/${orderId}/customer`, apiUrl)
        .then((res) => {
          if (res.payment.status === "PAYMENT_APPROVED") {
            sessionStorage.setItem("order", JSON.stringify(res));
            route.push("/order");
            clearInterval(interval);
          } else {
            return;
          }
        })
        .catch(() => {
          clearInterval(interval);
        });
    }, 30000);

    return () => clearInterval(interval);
  }, [qrCode, copyAndPaste, orderId, setError, route]);

  // Package with id: e5866dd3-e5f9-4392-9296-87f4f10af5b1 not found
  // userIdForRecharge must be longer than or equal to 1 characters
  // userIdForRecharge must be a string
  // "Invalid UUID: 'e5866dd3-e5f9-4392-9296-87f4f10af5b'"
  // "paymentMethodName must be one of the following values: PIX"
  // "price is not equal to package payment method selling price"
  // price must be a number conforming to the specified constraints
  // "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server."
  // "Something went wrong. Please try again later."

  const handleResponse = (text: string) => {
    if (
      text.toLowerCase() === "useridforrecharge must be a string" ||
      text.toLowerCase() ===
        "useridforrecharge must be longer than or equal to 1 characters"
    ) {
      setError("ID de usuário inválido");
    } else if (
      text.toLowerCase() === `invalid uuid: '${packageId.toLowerCase()}'` ||
      text.toLowerCase() ===
        `package with id: ${packageId.toLowerCase()} not found`
    ) {
      setError("Pacote indisponível");
    } else if (
      text.toLowerCase() ===
      "paymentmethodname must be one of the following values: pix"
    ) {
      setError("Método de pagamento indisponível");
    } else if (
      text.toLowerCase() ===
        "price is not equal to package payment method selling price" ||
      text.toLowerCase() ===
        "price must be a number conforming to the specified constraints"
    ) {
      setError("Valor de pacote desatualizado");
    } else {
      setError("Algo deu errado. Tente novamente mais tarde.");
    }
  };

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) =>
        prop !== "firstExpand" &&
        prop !== "isRounded" &&
        prop !== "secondExpand" &&
        prop !== "initialized"
      }
    >
      <PixCardContainer
        onClick={() => handleFirstExpand()}
        firstExpand={firstExpand}
        isRounded={isRounded}
        secondExpand={secondExpand}
        initialized={initialized}
      >
        <div className="pixText">
          <span>
            <Pix />
          </span>
          <Text fontName="REGULAR_MEDIUM" color={Theme.colors.secondaryAction}>
            Pix
          </Text>
        </div>
        <span className="value">
          <Text
            fontName="REGULAR_SEMI_BOLD"
            color={Theme.colors.secondaryAction}
          >
            R$ {formatPrice(price)}
          </Text>
        </span>
      </PixCardContainer>
      <BottomElement
        initialized={initialized}
        secondExpand={secondExpand}
        firstExpand={firstExpand}
        isRounded={isRounded}
      >
        <div className="pixCode">
          <input value={copyAndPaste}></input>
        </div>
        <div className="bottomButton">
          <Button
            onClick={() => handleClick()}
            loading={pixLoading}
            disabled={pixLoading}
            height={40}
            rounded
            title={secondExpand ? "Copiar código Pix" : "Gerar pedido"}
          />
        </div>
        <div className="pixImage">
          <Text margin="24px 0 0 0" align="center" fontName="SMALL_MEDIUM">
            {`Por gentileza, utilize a opção "Copiar e Colar" do PIX em seu
            aplicativo bancário`}
          </Text>
          <img
            className="qrCode"
            src={`data:image/png;base64, ${qrCode}`}
            alt="QR Code"
          />
        </div>
        {qrCode && (
          <>
            <Text margin="24px 0 0 0" align="center" fontName="SMALL_MEDIUM">
              {
                "Após o pagamento, clique no botão abaixo para confirmar o andamento do seu pedido"
              }
            </Text>
            <div className="confirmButton">
              <Button
                onClick={() => handleCheckOrder()}
                height={40}
                rounded
                title="Confirmar pagamento"
                disabled={orderLoading}
                loading={orderLoading}
              />
            </div>
          </>
        )}
      </BottomElement>
      {modal && <LoginModal setLoginModal={() => setModal(false)} />}
    </StyleSheetManager>
  );
};

export default PixCard;
