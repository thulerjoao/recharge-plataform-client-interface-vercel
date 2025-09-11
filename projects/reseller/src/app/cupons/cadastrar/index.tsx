"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import OnOff from "@4miga/design-system/components/onOff";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import {
  connectionAPIGet,
  connectionAPIPost,
} from "@4miga/services/connectionAPI/connection";
import { useRouter, useSearchParams } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { InfluencerNameIdType } from "types/influencerType";
import { apiUrl } from "utils/apiUrl";
import { CreateCouponContainer } from "./style";

interface CreateCouponData {
  title: string;
  influencerId: string;
  discountPercentage?: number | null;
  discountAmount?: number | null;
  expiresAt?: string;
  maxUses?: number;
  minOrderAmount?: number;
  isActive?: boolean;
  isFirstPurchase?: boolean;
}

interface FormErrors {
  title?: string;
  influencerId?: string;
  discountPercentage?: string;
  discountAmount?: string;
  expiresAt?: string;
  maxUses?: string;
  minOrderAmount?: string;
}

const CreateCoupon = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [discountType, setDiscountType] = useState<"percentage" | "amount">(
    "percentage",
  );
  const [influencersList, setInfluencersList] = useState<
    InfluencerNameIdType[]
  >([]);
  const [selectedInfluencer, setSelectedInfluencer] =
    useState<InfluencerNameIdType | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<CreateCouponData>({
    title: "",
    influencerId: selectedInfluencer?.id || "",
    discountPercentage: null,
    discountAmount: null,
    expiresAt: "",
    maxUses: undefined,
    minOrderAmount: undefined,
    isActive: true,
    isFirstPurchase: false,
  });

  useEffect(() => {
    connectionAPIGet<InfluencerNameIdType[]>(`/influencer/name-id-list`, apiUrl)
      .then((res) => {
        setInfluencersList(res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    const influencerId = searchParams.get("influencerId");
    if (influencerId) {
      console.log("influencerId", influencerId);
      const influencer = influencersList.find((i) => i.id === influencerId);
      setSelectedInfluencer(influencer);
      if (influencer) {
        setFormData((prev) => ({ ...prev, influencerId: influencer.id }));
      }
    }
  }, [influencersList, searchParams]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Título do cupom é obrigatório";
    } else if (formData.title.includes(" ")) {
      newErrors.title = "Título do cupom não pode conter espaços";
    }

    if (!formData.influencerId) {
      newErrors.influencerId = "Influencer é obrigatório";
    }

    // Validation based on discount type
    if (discountType === "percentage") {
      if (!formData.discountPercentage || formData.discountPercentage <= 0) {
        newErrors.discountPercentage = "Porcentagem deve ser maior que 0";
      } else if (formData.discountPercentage > 100) {
        newErrors.discountPercentage =
          "Porcentagem não pode ser maior que 100%";
      }
    } else {
      if (!formData.discountAmount || formData.discountAmount <= 0) {
        newErrors.discountAmount = "Valor deve ser maior que 0";
      }
    }

    if (formData.expiresAt) {
      const selectedDate = new Date(formData.expiresAt);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate <= today) {
        newErrors.expiresAt = "Data de expiração deve ser futura";
      }
    }

    if (formData.maxUses && formData.maxUses <= 0) {
      newErrors.maxUses = "Máximo de usos deve ser maior que 0";
    }

    if (formData.minOrderAmount && formData.minOrderAmount < 0) {
      newErrors.minOrderAmount = "Valor mínimo não pode ser negativo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof CreateCouponData,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    await connectionAPIPost<CreateCouponData>(`/coupon`, formData, apiUrl)
      .then(() => {
        router.push(`/cupons/parceiros/${formData.influencerId}`);
        alert("Cupom criado com sucesso");
      })
      .catch((err) => {
        console.log("error", err);
        if (
          err.response.data.message ===
          "Coupon with this title already exists for this store"
        ) {
          alert("Título de cupom já cadastrado");
        } else {
          alert("Erro ao criar cupom, tente novamente");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCancel = () => {
    // Se veio de uma página específica, volta para ela
    const influencerId = searchParams.get("influencerId");
    if (influencerId) {
      router.push(`/coupons/influencer/${influencerId}`);
    } else {
      router.back();
    }
  };

  return (
    <CreateCouponContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="CRIAR CUPOM" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          CRIAR CUPOM
        </Text>
      </div>

      <div className="mainContent">
        <div className="headerSection">
          <div className="titleSection">
            <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
              NOVO CUPOM
            </Text>
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.secondaryText}>
              {searchParams.get("influencerId")
                ? `Criando cupom para ${selectedInfluencer?.name}`
                : "Configure as informações do cupom"}
            </Text>
          </div>
          <div className="statusSection">
            <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
              Status inicial
            </Text>
            <span
              onClick={() => handleInputChange("isActive", !formData.isActive)}
            >
              <OnOff onOff={formData.isActive} />
              <Text
                margin="8px 0px -8px 0px"
                align="center"
                fontName="SMALL_MEDIUM"
                color={
                  formData.isActive
                    ? Theme.colors.approved
                    : Theme.colors.refused
                }
              >
                {formData.isActive ? "Ativo" : "Inativo"}
              </Text>
            </span>
          </div>
        </div>

        <div className="infoSections">
          <div className="infoSection">
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainHighlight}>
              INFORMAÇÕES BÁSICAS
            </Text>
            <div className="infoGrid">
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Título do cupom: *
                </Text>
                <Input
                  value={formData.title}
                  onChange={(e) => {
                    const value = e.target.value
                      .toUpperCase()
                      .replace(/\s/g, ""); // Remove todos os espaços
                    handleInputChange("title", value);
                  }}
                  placeholder="Ex: DESCONTO10"
                  height={32}
                  className={errors.title ? "error" : ""}
                />
                {errors.title && (
                  <span className="error-message">{errors.title}</span>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Influencer: *
                </Text>
                <select
                  value={selectedInfluencer?.id || ""}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const selectedInfluencerData = influencersList.find(
                      (influencer) => influencer.id === selectedId,
                    );
                    setSelectedInfluencer(selectedInfluencerData || null);
                    handleInputChange("influencerId", selectedId);
                  }}
                  className={`influencerSelect ${errors.influencerId ? "error" : ""}`}
                  disabled={searchParams.get("influencerId") !== null}
                >
                  <option value="">Selecione o influencer</option>
                  {influencersList.map((influencer) => (
                    <option key={influencer.id} value={influencer.id}>
                      {influencer.name}
                    </option>
                  ))}
                </select>
                {errors.influencerId && (
                  <span className="error-message">{errors.influencerId}</span>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Tipo de desconto: *
                </Text>
                <select
                  value={discountType}
                  onChange={(e) => {
                    const newType = e.target.value as "percentage" | "amount";
                    setDiscountType(newType);
                    // Clear the opposite field when switching types
                    if (newType === "percentage") {
                      handleInputChange("discountAmount", null);
                    } else {
                      handleInputChange("discountPercentage", null);
                    }
                  }}
                  className="discountTypeSelect"
                >
                  <option value="percentage">Porcentagem (%)</option>
                  <option value="amount">Valor fixo (R$)</option>
                </select>
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  {discountType === "percentage" ? "Porcentagem (%)" : "Valor"}:
                  *
                </Text>
                {discountType === "percentage" ? (
                  <Input
                    value={formData.discountPercentage || ""}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? null : parseInt(e.target.value);
                      if (value !== null && (value < 0 || value > 100)) {
                        return;
                      }
                      handleInputChange("discountPercentage", value);
                    }}
                    placeholder="0"
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
                    value={formData.discountAmount || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, "");
                      const value = rawValue === "" ? null : parseInt(rawValue);
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
                )}
                {(errors.discountPercentage || errors.discountAmount) && (
                  <span className="error-message">
                    {errors.discountPercentage || errors.discountAmount}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="infoSection">
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainHighlight}>
              CONFIGURAÇÕES OPCIONAIS
            </Text>
            <div className="infoGrid">
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Data de expiração:
                </Text>
                <input
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) =>
                    handleInputChange("expiresAt", e.target.value)
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className={`dateInput ${errors.expiresAt ? "error" : ""}`}
                  onKeyDown={(e) => {
                    // Allow only navigation keys and prevent typing
                    const allowedKeys = [
                      "Tab",
                      "Enter",
                      "Escape",
                      "ArrowUp",
                      "ArrowDown",
                      "ArrowLeft",
                      "ArrowRight",
                    ];
                    if (
                      !allowedKeys.includes(e.key) &&
                      !e.ctrlKey &&
                      !e.metaKey
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onInput={(e) => {
                    // Prevent manual input
                    e.preventDefault();
                  }}
                />
                {errors.expiresAt && (
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
                <Input
                  value={formData.maxUses || ""}
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
                {errors.maxUses && (
                  <span className="error-message">{errors.maxUses}</span>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Valor mínimo do pedido (R$):
                </Text>
                <InputMask
                  mask="R$ 9999"
                  maskChar=""
                  value={formData.minOrderAmount || ""}
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
                {errors.minOrderAmount && (
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
                <div className="checkboxSection">
                  <input
                    type="checkbox"
                    checked={formData.isFirstPurchase}
                    onChange={(e) =>
                      handleInputChange("isFirstPurchase", e.target.checked)
                    }
                    className="checkbox"
                  />
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    Marcar se for cupom exclusivo para primeira compra
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="actionsSection">
          <Button
            disabled={isLoading}
            title="CANCELAR"
            onClick={handleCancel}
            width={140}
            height={40}
            rounded
            style={{
              backgroundColor: Theme.colors.secondaryAction,
              color: Theme.colors.mainlight,
            }}
          />
          <Button
            loading={isLoading}
            disabled={isLoading}
            title="CRIAR CUPOM"
            onClick={handleSubmit}
            width={140}
            height={40}
            rounded
          />
        </div>
      </div>
    </CreateCouponContainer>
  );
};

export default CreateCoupon;
