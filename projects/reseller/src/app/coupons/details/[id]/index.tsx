/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import OnOff from "@4miga/design-system/components/onOff";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import {
  connectionAPIDelete,
  connectionAPIGet,
  connectionAPIPatch,
} from "@4miga/services/connectionAPI/connection";
import { apiUrl } from "@4miga/services/connectionAPI/url";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { CouponType } from "types/couponType";
import { FormErrors, validateCouponForm } from "utils/couponValidation";
import { formatDate } from "utils/formatDate";
import { formatPrice } from "utils/formatPrice";
import { CouponDetailsContainer } from "./style";
import LoadingPage from "app/loading";

interface CouponDetailsProps {
  couponId: string;
}

const CouponDetails = ({ couponId }: CouponDetailsProps) => {
  const router = useRouter();

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [coupon, setCoupon] = useState<CouponType | null>(null);
  const [editData, setEditData] = useState<CouponType>({} as CouponType);
  const [selectedDiscountType, setSelectedDiscountType] = useState<
    "percentage" | "amount"
  >("percentage");

  const getCoupon = async () => {
    await connectionAPIGet<CouponType>(`/coupon/${couponId}`, apiUrl)
      .then((res) => {
        setCoupon(res);
        setEditData(res);
        setSelectedDiscountType(
          res.discountPercentage ? "percentage" : "amount",
        );
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCoupon();
  }, []);

  const getDiscountText = (coupon: CouponType) => {
    if (coupon.discountPercentage) {
      return `${coupon.discountPercentage}%`;
    }
    if (coupon.discountAmount) {
      return `R$ ${formatPrice(Number(coupon.discountAmount))}`;
    }
    return "N/A";
  };

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({});
  };

  const handleSave = () => {
    const data = {
      title: editData.title,
      discountPercentage:
        +editData.discountPercentage === 0
          ? null
          : +editData.discountPercentage,
      discountAmount:
        +editData.discountAmount === 0 ? null : +editData.discountAmount,
      expiresAt: editData.expiresAt,
      maxUses: editData.maxUses,
      minOrderAmount: +editData.minOrderAmount,
      isActive: editData.isActive,
      isFirstPurchase: editData.isFirstPurchase,
    };

    // return console.log("data", data);

    if (
      data.title === coupon.title &&
      (data.discountPercentage === +coupon.discountPercentage ||
        data.discountAmount === +coupon.discountAmount) &&
      data.expiresAt === coupon.expiresAt &&
      data.maxUses === coupon.maxUses &&
      data.minOrderAmount === +coupon.minOrderAmount &&
      data.isActive === coupon.isActive &&
      data.isFirstPurchase === coupon.isFirstPurchase
    ) {
      return handleCancel();
    }

    const { isValid, errors } = validateCouponForm({
      title: data.title,
      discountPercentage: data.discountPercentage,
      discountAmount: data.discountAmount,
      expiresAt: data.expiresAt,
      maxUses: data.maxUses,
      minOrderAmount: data.minOrderAmount,
      selectedDiscountType: selectedDiscountType,
    });
    if (!isValid) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    connectionAPIPatch(`/coupon/${couponId}`, data, apiUrl)
      .then(async () => {
        await getCoupon();
        setIsEditing(false);
        alert("Cupom atualizado!");
      })
      .catch((err) => {
        console.log("err", err);
        if (
          err.response.data.message ===
          "Coupon with this title already exists for this store"
        ) {
          alert("Cupom já cadastrado");
        } else if (
          err.response.data.message ===
          "Fixed discount amount cannot be greater than minimum order amount"
        ) {
          alert(
            "Valor do desconto não pode ser maior que o valor mínimo do pedido",
          );
        }
        setEditData(coupon);
      })
      .finally(() => {
        setLoading(false);
      });
    setIsEditing(false);
    setErrors({});
  };

  const handleCancel = () => {
    if (coupon) {
      setEditData(coupon);
      setSelectedDiscountType(
        coupon.discountPercentage ? "percentage" : "amount",
      );
      setIsEditing(false);
      setErrors({});
    }
  };

  const handleToggleActive = () => {
    setEditData((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir este cupom?")) {
      connectionAPIDelete(`/coupon/${couponId}`, apiUrl)
        .then(() => {
          router.push("/coupons");
        })
        .catch(() => {
          alert("Algo deu errado, tente novamente");
        });
    }
  };

  const handleInputChange = (
    field: keyof CouponType,
    value: string | boolean | number,
  ) => {
    setEditData((prev) => ({ ...prev, [field]: value }));

    // Clear specific error when user types
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // if (loading) {
  //   return (
  //     <CouponDetailsContainer>
  //       <Text align="center" fontName="REGULAR_MEDIUM">
  //         Carregando...
  //       </Text>
  //     </CouponDetailsContainer>
  //   );
  // }

  // if (!coupon) {
  //   return (
  //     <CouponDetailsContainer>
  //       <Text
  //         align="center"
  //         fontName="REGULAR_MEDIUM"
  //         color={Theme.colors.refused}
  //       >
  //         Cupom não encontrado
  //       </Text>
  //       <Button
  //         title="VOLTAR"
  //         onClick={handleBack}
  //         width={120}
  //         height={40}
  //         rounded
  //         style={{
  //           backgroundColor: Theme.colors.mainHighlight,
  //           color: Theme.colors.mainlight,
  //         }}
  //       />
  //     </CouponDetailsContainer>
  //   );
  // }

  if (loading || !coupon) {
    return <LoadingPage />;
  }

  return (
    <CouponDetailsContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="DETALHES DO CUPOM" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          CUPOM
        </Text>
      </div>

      <div className="mainContent">
        <div className="headerSection">
          <div className="couponInfo">
            <div className="couponTitle">
              <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
                {coupon.title}
              </Text>
              {coupon.isFirstPurchase && (
                <span className="firstPurchaseBadge">1ª</span>
              )}
            </div>
            <div className="couponDiscount">
              <Text
                fontName="REGULAR_MEDIUM"
                color={Theme.colors.mainHighlight}
              >
                {getDiscountText(coupon)}
              </Text>
            </div>
          </div>
          <div className="statusSection">
            <div
              className={`statusBadge ${editData.isActive ? "active" : "inactive"}`}
            >
              <Text
                fontName="SMALL_MEDIUM"
                color={
                  editData.isActive
                    ? Theme.colors.approved
                    : Theme.colors.refused
                }
              >
                {editData.isActive ? "ATIVO" : "INATIVO"}
              </Text>
            </div>
            {isEditing && (
              <div className="onOff">
                <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                  Ativar/Desativar
                </Text>
                <span onClick={handleToggleActive}>
                  <OnOff onOff={editData.isActive} />
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="infoSections">
          <div className="infoSection unifiedInfoSection">
            <div className="sectionTitle">
              <Text
                fontName="REGULAR_MEDIUM"
                color={Theme.colors.mainHighlight}
              >
                INFORMAÇÕES BÁSICAS
              </Text>
            </div>
            <div className="infoGrid">
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Título:
                </Text>
                {isEditing ? (
                  <Input
                    value={editData.title || ""}
                    onChange={(e) => {
                      const value = e.target.value
                        .toUpperCase()
                        .replace(/\s/g, "");
                      handleInputChange("title", value);
                    }}
                    placeholder="Título do cupom"
                    height={32}
                    className={errors.title ? "error" : ""}
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {coupon.title}
                  </Text>
                )}
                {isEditing && errors.title && (
                  <span className="error-message">{errors.title}</span>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Influencer:
                </Text>
                <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                  {coupon.influencer.name}
                </Text>
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Tipo de desconto:
                </Text>
                {isEditing ? (
                  <select
                    value={selectedDiscountType}
                    onChange={(e) => {
                      const discountType = e.target.value as
                        | "percentage"
                        | "amount";
                      setSelectedDiscountType(discountType);

                      if (discountType === "percentage") {
                        handleInputChange("discountPercentage", undefined);
                        handleInputChange("discountAmount", undefined);
                      } else {
                        handleInputChange("discountAmount", undefined);
                        handleInputChange("discountPercentage", undefined);
                      }
                    }}
                    className="discountTypeSelect"
                  >
                    <option value="percentage">Porcentagem (%)</option>
                    <option value="amount">Valor fixo (R$)</option>
                  </select>
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {coupon.discountPercentage ? "Porcentagem" : "Valor fixo"}
                  </Text>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  {selectedDiscountType === "percentage"
                    ? "Porcentagem (%)"
                    : "Valor fixo (R$)"}
                  :
                </Text>
                {isEditing ? (
                  selectedDiscountType === "percentage" ? (
                    <Input
                      value={editData.discountPercentage || ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === ""
                            ? undefined
                            : parseInt(e.target.value);
                        if (value !== undefined && (value < 0 || value > 100)) {
                          return; // Não atualiza se estiver fora do intervalo
                        }
                        handleInputChange("discountPercentage", value);
                      }}
                      height={32}
                      type="number"
                      min="0"
                      max="100"
                      className={
                        errors.discountPercentage || errors.discountAmount
                          ? "error"
                          : ""
                      }
                    />
                  ) : (
                    <InputMask
                      mask="R$ 9999"
                      maskChar=""
                      value={editData.discountAmount || ""}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                        const value =
                          rawValue === "" ? undefined : parseInt(rawValue);
                        handleInputChange("discountAmount", value);
                      }}
                    >
                      {(inputProps: any) => (
                        <Input
                          {...inputProps}
                          placeholder="R$"
                          height={32}
                          className={
                            errors.discountPercentage || errors.discountAmount
                              ? "error"
                              : ""
                          }
                        />
                      )}
                    </InputMask>
                  )
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {getDiscountText(coupon)}
                  </Text>
                )}
                {isEditing &&
                  (errors.discountPercentage || errors.discountAmount) && (
                    <span className="error-message">
                      {errors.discountPercentage || errors.discountAmount}
                    </span>
                  )}
              </div>
            </div>

            <div className="sectionDivider"></div>

            <div className="sectionTitle">
              <Text
                fontName="REGULAR_MEDIUM"
                color={Theme.colors.mainHighlight}
              >
                CONFIGURAÇÕES
              </Text>
            </div>
            <div className="infoGrid">
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Data de expiração:
                </Text>
                {isEditing ? (
                  <InputMask
                    mask="99/99/9999"
                    maskChar=""
                    value={editData.expiresAt || ""}
                    onChange={(e) =>
                      handleInputChange("expiresAt", e.target.value)
                    }
                  >
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        placeholder="dd/mm/aaaa"
                        height={32}
                        className={errors.expiresAt ? "error" : ""}
                      />
                    )}
                  </InputMask>
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {coupon.expiresAt
                      ? formatDate(coupon.expiresAt)
                      : "Sem expiração"}
                  </Text>
                )}
                {isEditing && errors.expiresAt && (
                  <span className="error-message">{errors.expiresAt}</span>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Máximo de usos:
                </Text>
                {isEditing ? (
                  <Input
                    value={editData.maxUses || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "maxUses",
                        e.target.value === ""
                          ? undefined
                          : parseInt(e.target.value),
                      )
                    }
                    placeholder="Ilimitado"
                    height={32}
                    type="number"
                    min="0"
                    className={errors.maxUses ? "error" : ""}
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {coupon.maxUses ? coupon.maxUses : "Ilimitado"}
                  </Text>
                )}
                {isEditing && errors.maxUses && (
                  <span className="error-message">{errors.maxUses}</span>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Valor mínimo do pedido:
                </Text>
                {isEditing ? (
                  <InputMask
                    mask="R$ 9999"
                    maskChar=""
                    value={editData.minOrderAmount || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      const value =
                        rawValue === "" ? undefined : parseInt(rawValue);
                      handleInputChange("minOrderAmount", value);
                    }}
                  >
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        placeholder="R$ 0"
                        height={32}
                        className={errors.minOrderAmount ? "error" : ""}
                      />
                    )}
                  </InputMask>
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {coupon.minOrderAmount
                      ? `R$ ${formatPrice(Number(coupon.minOrderAmount))}`
                      : "Sem mínimo"}
                  </Text>
                )}
                {isEditing && errors.minOrderAmount && (
                  <span className="error-message">{errors.minOrderAmount}</span>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Cupom para primeira compra:
                </Text>
                {isEditing ? (
                  <div className="checkboxSection">
                    <input
                      type="checkbox"
                      checked={editData.isFirstPurchase || false}
                      onChange={(e) =>
                        handleInputChange("isFirstPurchase", e.target.checked)
                      }
                      className="checkbox"
                    />
                    <Text
                      fontName="SMALL_MEDIUM"
                      color={Theme.colors.mainlight}
                    >
                      Marcar se for cupom exclusivo para primeira compra
                    </Text>
                  </div>
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {coupon.isFirstPurchase ? "Sim" : "Não"}
                  </Text>
                )}
              </div>
            </div>

            <div className="actionsSection">
              {isEditing ? (
                <>
                  <Button
                    title="CANCELAR"
                    onClick={handleCancel}
                    width={120}
                    height={36}
                    rounded
                    disabled={loading}
                  />
                  <Button
                    title="SALVAR"
                    onClick={handleSave}
                    width={120}
                    height={36}
                    rounded
                    loading={loading}
                    disabled={loading}
                  />
                </>
              ) : (
                <>
                  <Button
                    title="EDITAR"
                    onClick={handleEdit}
                    width={120}
                    height={36}
                    rounded
                    disabled={loading}
                  />
                  <Button
                    title="EXCLUIR"
                    onClick={handleDelete}
                    width={120}
                    height={36}
                    rounded
                    style={{
                      backgroundColor: Theme.colors.refused,
                    }}
                    disabled={loading}
                  />
                </>
              )}
            </div>
          </div>

          <div className="infoSection">
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainHighlight}>
              ESTATÍSTICAS
            </Text>
            <div className="infoGrid">
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Vezes utilizado:
                </Text>
                <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                  {coupon.timesUsed}
                  {coupon.maxUses && ` / ${coupon.maxUses}`}
                </Text>
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Total de vendas:
                </Text>
                <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                  R$ {formatPrice(Number(coupon.totalSalesAmount))}
                </Text>
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Data de criação:
                </Text>
                <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                  {formatDate(coupon.createdAt)}
                </Text>
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Última atualização:
                </Text>
                <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                  {formatDate(coupon.updatedAt)}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CouponDetailsContainer>
  );
};

export default CouponDetails;
