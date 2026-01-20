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
import { useRouter } from "next/navigation";
import LoginModal from "public/components/loginModal";
import Pix from "public/icons/Pix.svg";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  const route = useRouter();

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
      toast("Nenhum código para copiar.");
      return;
    }

    try {
      await navigator.clipboard.writeText(copyAndPaste);
      toast.success("Código PIX copiado para área de transferência");
    } catch (err) {
      toast.error("Erro ao copiar o código");
    }
  };

  const handleClick = () => {
    if (!logged) {
      setModal(true);
      setClicked(true);
      return;
    }
    if (secondExpand) {
      handleCopy();
      return;
    } else if (firstExpand) {
      handleCreateOrder();
    }
  };

  const handleCreateOrder = async () => {
    if (sessionOrder || pixLoading) {
      return;
    }
    if (!logged) {
      setModal(true);
      setClicked(true);
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

    setPixLoading(true);
    setBlockInput(true);

    if (user && rechargeBigoId !== user?.rechargeBigoId) {
      await connectionAPIPatch("/user/recharge-bigo-id", {
        rechargeBigoId,
      }).then(() => {
        setUser({ ...user, rechargeBigoId });
      });
    }
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
      .then(async (res) => {
        setQrCode(res.payment.qrCode);
        setCopyAndPaste(res.payment.qrCodetextCopyPaste);
        setOrderId(res.id);
        sessionStorage.setItem("order", JSON.stringify(res));
        setSessionOrder(res);
        setSecondExpand(true);

        try {
          await navigator.clipboard.writeText(res.payment.qrCodetextCopyPaste);
          toast.success("Código PIX copiado para área de transferência");
        } catch (err) {
          return;
        }
      })
      .catch((err) => {
        if (err.response.data.message === "Invalid userId for recharge") {
          setError("ID de usuário inválido");
          setBlockInput(false);
        } else {
          setError("Algo deu errado. Tente novamente mais tarde.");
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
      setOrderId(checkSessionOrder.id);
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
    if (logged && clicked && !sessionOrder && !pixLoading) {
      setClicked(false);
      if (firstExpand && !secondExpand) {
        handleCreateOrder();
      }
    }
  }, [logged, clicked, sessionOrder, pixLoading, firstExpand, secondExpand]);

  const handleCountDown = () => {
    if (!sessionOrder) {
      setCountdown("00:00:00");
      return;
    }

    const createdAt = new Date(sessionOrder.createdAt);
    const expirationTime = new Date(createdAt.getTime() + 3 * 60 * 60 * 1000);
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

  const handleCheckPayment = () => {
    if (!orderId) return;
    // Redireciona para a página de detalhes do pedido onde o polling será feito
    route.push(`/orders/${orderId}`);
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
                "Após o pagamento, clique no botão abaixo para acompanhar o seu pedido"
              }
            </Text>
            <div className="confirmButton">
              <Button
                onClick={() => handleCheckPayment()}
                height={40}
                rounded
                title="Acompanhar pedido"
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
