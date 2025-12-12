/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import {
  connectionAPIPatch,
  connectionAPIPost,
} from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
import LoginModal from "public/components/loginModal";
import Pix from "public/icons/Pix.svg";
import React, { useEffect, useState } from "react";
import { StyleSheetManager } from "styled-components";
import { OrderType } from "types/orderType";
import { PackageType } from "types/productTypes";
import { formatPrice } from "utils/formatPrice";
import { BottomElement, PixCardContainer } from "./style";

interface Props {
  rechargeBigoId: string;
  couponTitle?: string;
  item: PackageType | null;
  // sessionOrder: OrderType | null;
  valueWithDicount?: number;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setBlockInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const PixCard = ({
  rechargeBigoId,
  item,
  valueWithDicount,
  couponTitle,
  // sessionOrder,
  setError,
  setBlockInput,
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
  const [sessionOrder, setSessionOrder] = useState<OrderType | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<string>("00:00:00");
  const { logged, user, setUser } = useAuth();

  // console.log("sessionOrder", sessionOrder);
  // console.log("item", item);

  const packageId = item ? item.id : sessionOrder?.orderItem.package.id;
  const handleGetPrice = () => {
    if (sessionOrder) {
      return sessionOrder.price;
    }
    if (item) {
      if (valueWithDicount) {
        return valueWithDicount;
      } else {
        return item.basePrice;
      }
    }
  };

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
      handleCreateOrder();
    }
  };

  const handleCreateOrder = async () => {
    if (sessionOrder) {
      return;
    }
    if (!rechargeBigoId) {
      setError("É necessário informar o ID do usuário");
      return;
    }
    if (!item) {
      setError("Pacote não encontrado");
      return;
    }
    if (user && rechargeBigoId !== user?.rechargeBigoId) {
      await connectionAPIPatch("/user/recharge-bigo-id", {
        rechargeBigoId,
      }).then(() => {
        setUser({ ...user, rechargeBigoId });
      });
    }
    setPixLoading(true);
    setBlockInput(true);
    const price = handleGetPrice();
    const paymentMethodId = item.paymentMethods[0].id;
    const body = !couponTitle
      ? {
          price,
          packageId,
          paymentMethodId,
          userIdForRecharge: rechargeBigoId,
        }
      : {
          price,
          packageId,
          paymentMethodId,
          userIdForRecharge: rechargeBigoId,
          couponTitle,
        };
    await connectionAPIPost<OrderType>("/orders", body)
      .then((res) => {
        console.log("res order creation", res);
        setQrCode(res.payment.qrCode);
        setCopyAndPaste(res.payment.qrCodetextCopyPaste);
        setOrderId(res.orderItemId);
        sessionStorage.setItem("order", JSON.stringify(res));
        setSessionOrder(res);
        setSecondExpand(true);
      })
      .catch((err) => {
        if (err.response.data.message === "Invalid userId for recharge") {
          setError("ID de usuário inválido");
          setBlockInput(false);
        }
      })
      .finally(() => {
        setPixLoading(false);
      });
  };

  //expand pix card
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

  // style efect only
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
    const checkSessionOrder = JSON.parse(sessionStorage.getItem("order"));
    setSessionOrder(checkSessionOrder);
    if (checkSessionOrder) {
      setFirstExpand(true);
      setInitialized(true);
      setSecondExpand(true);
      setQrCode(checkSessionOrder.payment.qrCode);
      setCopyAndPaste(checkSessionOrder.payment.qrCodetextCopyPaste);
      setOrderId(checkSessionOrder.orderItemId);
    }
  }, []);

  useEffect(() => {
    if (!sessionOrder) return;

    handleCountDown();
    const interval = setInterval(() => {
      handleCountDown();
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionOrder]);

  // CREATING ORDER AUTOMATICALLY
  useEffect(() => {
    if (logged && clicked) {
      handleClick();
    }
  }, [logged, clicked]);

  const handleCountDown = () => {
    if (!sessionOrder) {
      setCountdown("00:00:00");
      return;
    }

    const createdAt = new Date(sessionOrder.createdAt);
    const expirationTime = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);
    const now = new Date();
    const difference = expirationTime.getTime() - now.getTime();

    if (difference <= 0) {
      setCountdown("00:00:00");
      return;
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    setCountdown(formattedTime);
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
            R$ {formatPrice(handleGetPrice())}
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
          <img className="qrCode" src={qrCode} alt="QR Code" />
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
                // onClick={() => handleCheckOrder()}
                height={40}
                rounded
                title="Confirmar pagamento"
                disabled={orderLoading}
                loading={orderLoading}
              />
            </div>
          </>
        )}
        {sessionOrder && (
          <Text
            fontName="SMALL_MEDIUM"
            className="countDown"
            color={Theme.colors.mainlight}
          >
            Prazo para pagamento: {countdown}
          </Text>
        )}
      </BottomElement>
      {modal && <LoginModal setLoginModal={() => setModal(false)} />}
    </StyleSheetManager>
  );
};

export default PixCard;
