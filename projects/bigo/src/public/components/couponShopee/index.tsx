import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useEffect, useRef, useState } from "react";
import CouponCard from "./cards/couponCard";
import CouponIcon from "./icons/Coupon.svg";
import { CouponContainer } from "./style";

interface Props {
  coupon: string;
  setCoupon: (coupon: string) => void;
}

const CouponShopee = ({ coupon, setCoupon }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <CouponContainer ref={containerRef} isOpen={isOpen}>
      <section
        className="couponClosedContent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="iconContainer">
          <CouponIcon
            width={32}
            height={32}
            style={{ color: Theme.colors.mainHighlight }}
          />
          <Text
            align="center"
            fontName="SMALL_MEDIUM"
            color={Theme.colors.secondaryAction}
          >
            Cupom de desconto
          </Text>
        </div>
        <div className="couponText">
          <Text
            align="center"
            fontName="SMALL_MEDIUM"
            color={Theme.colors.secondaryText}
          >
            Selecione ou insira o código
          </Text>
        </div>
      </section>

      <section className={`couponOpenContent ${isOpen ? "open" : ""}`}>
        <div className="applyCoupon">
          <Input
            height={36}
            placeholder="Insira o cupom"
            value={coupon.replace(/\s/g, "")}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Space") {
                e.preventDefault();
                return false;
              }
            }}
            onChange={(e) => {
              const valueWithoutSpaces = e.target.value.replace(/\s/g, "");
              setCoupon(valueWithoutSpaces);
            }}
          />
          <Button
            title="Aplicar"
            // onClick={() => handleApplyCoupon()}
            width={200}
            height={28}
            // loading={couponLoading}
            // disabled={couponLoading}
          ></Button>
        </div>
        <div className="couponList">
          <CouponCard
            coupon={{
              valid: true,
              discountAmount: 10.5,
              finalAmount: 89.5,
              coupon: {
                id: "mock-coupon-1",
                title: "Desconto de 10%",
                discountPercentage: 10,
                discountAmount: null,
                isFirstPurchase: false,
              },
            }}
            selected={false}
            onClick={() => console.log("Cupom selecionado")}
          />
          <CouponCard
            coupon={{
              valid: true,
              discountAmount: 20.0,
              finalAmount: 80.0,
              coupon: {
                id: "mock-coupon-2",
                title: "Cupom Primeira Compra",
                discountPercentage: null,
                discountAmount: 20.0,
                isFirstPurchase: true,
              },
            }}
            selected={true}
            onClick={() => console.log("Cupom selecionado")}
          />
        </div>
      </section>
    </CouponContainer>
  );
};

export default CouponShopee;
