import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useEffect, useRef } from "react";
import { CouponValidationResponse } from "types/couponType";
import CouponIcon from "./icons/Coupon.svg";
import { CouponContainer } from "./style";

interface Props {
  coupon: string;
  setCoupon: (coupon: string) => void;
  couponLoading: boolean;
  blockInput: boolean;
  handleApplyCoupon: (couponValue?: string) => void;
  couponError: string;
  setCouponError: (couponError: string) => void;
  couponSuccess: string;
  openCoupon: boolean;
  setOpenCoupon: (openCoupon: boolean) => void;
  couponApplied: CouponValidationResponse | null;
}

const Coupon = ({
  coupon,
  setCoupon,
  couponLoading,
  blockInput,
  couponError,
  setCouponError,
  couponSuccess,
  handleApplyCoupon,
  openCoupon,
  setOpenCoupon,
  couponApplied,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenCoupon(false);
      }
    };

    if (openCoupon) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCoupon]);

  useEffect(() => {
    if (couponApplied?.valid) setCoupon("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponApplied]);

  useEffect(() => {
    if (blockInput && openCoupon) {
      setOpenCoupon(false);
    }
  }, [blockInput, openCoupon, setOpenCoupon]);

  useEffect(() => {
    if (openCoupon && !blockInput) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [openCoupon, blockInput]);

  return (
    <CouponContainer ref={containerRef} openCoupon={openCoupon}>
      <section
        className="couponClosedContent"
        onClick={() => {
          if (!blockInput) {
            setOpenCoupon(!openCoupon);
          }
        }}
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
            {couponApplied?.valid
              ? couponApplied.coupon.title
              : blockInput
                ? "Nenhum cupom foi aplicado"
                : "Selecione ou insira o código"}
          </Text>
        </div>
      </section>

      <section className={`couponOpenContent ${openCoupon ? "open" : ""}`}>
        <form
          className="applyCoupon"
          onSubmit={(e) => {
            e.preventDefault();
            handleApplyCoupon();
          }}
        >
          <Input
            ref={inputRef}
            height={36}
            placeholder="Insira o cupom"
            value={coupon?.replace(/\s/g, "")}
            onKeyDown={(e) => {
              if (!blockInput && (e.key === " " || e.key === "Space")) {
                e.preventDefault();
                return false;
              }
            }}
            onChange={(e) => {
              if (!blockInput) {
                const valueWithoutSpaces = e.target.value.replace(/\s/g, "");
                setCoupon(valueWithoutSpaces);
                setCouponError("");
              }
            }}
          />
          <Button
            title="Aplicar"
            onClick={() => handleApplyCoupon()}
            width={200}
            height={28}
            loading={couponLoading}
            disabled={
              couponLoading ||
              blockInput ||
              (couponApplied?.valid
                ? couponApplied?.coupon?.title.toUpperCase() ===
                  coupon?.toUpperCase()
                : false)
            }
            isNotSelected={
              blockInput ||
              (couponApplied?.valid
                ? couponApplied?.coupon?.title.toUpperCase() ===
                  coupon?.toUpperCase()
                : false)
            }
          ></Button>
        </form>
      </section>
      {couponError && (
        <div className="couponErrorMessage">
          <Text
            align="center"
            fontName="TINY_MEDIUM"
            color={Theme.colors.pending}
            margin="2px 0 -16.5px 0"
          >
            {couponError}
          </Text>
        </div>
      )}
      {couponSuccess && (
        <div className="couponSuccessMessage">
          <Text
            align="center"
            fontName="TINY_MEDIUM"
            color={Theme.colors.approved}
            margin="2px 0 -16.5px 0"
          >
            {couponSuccess}
          </Text>
        </div>
      )}
    </CouponContainer>
  );
};

export default Coupon;
