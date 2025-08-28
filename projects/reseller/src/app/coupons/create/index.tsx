"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import OnOff from "@4miga/design-system/components/onOff";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useRouter, useSearchParams } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { CreateCouponContainer } from "./style";
import { formatPrice } from "utils/formatPrice";

interface CreateCouponData {
  title: string;
  discountType: "percentage" | "amount";
  discountPercentage?: number | undefined;
  discountAmount?: number | undefined;
  expiresAt: string;
  maxUses?: number | undefined;
  minOrderAmount?: number | undefined;
  isActive: boolean;
  influencerId: string;
  isFirstPurchase: boolean;
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

// Mock data de influencers - será substituído por dados reais da API
const mockInfluencers = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Maria Santos" },
  { id: "3", name: "Pedro Costa" },
  { id: "4", name: "Ana Oliveira" },
];

const CreateCoupon = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<CreateCouponData>({
    title: "",
    discountType: "percentage",
    discountPercentage: undefined,
    discountAmount: undefined,
    expiresAt: "",
    maxUses: undefined,
    minOrderAmount: undefined,
    isActive: true,
    influencerId: "",
    isFirstPurchase: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Verifica se veio da página de cupons por influencer
  useEffect(() => {
    const influencerId = searchParams.get("influencerId");
    if (influencerId) {
      setFormData((prev) => ({ ...prev, influencerId }));
    }
  }, [searchParams]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validação do título
    if (!formData.title.trim()) {
      newErrors.title = "Título do cupom é obrigatório";
    }

    // Validação do influencer
    if (!formData.influencerId) {
      newErrors.influencerId = "Influencer é obrigatório";
    }

    // Validação do tipo de desconto
    if (formData.discountType === "percentage") {
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

    // Validação da data de expiração (se preenchida)
    if (formData.expiresAt) {
      const selectedDate = new Date(formData.expiresAt);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate <= today) {
        newErrors.expiresAt = "Data de expiração deve ser futura";
      }
    }

    // Validação do máximo de usos (se preenchido)
    if (formData.maxUses && formData.maxUses <= 0) {
      newErrors.maxUses = "Máximo de usos deve ser maior que 0";
    }

    // Validação do valor mínimo do pedido (se preenchido)
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

    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Dados do formulário:", formData);
      alert("Cupom criado! (Implementação da API será feita no próximo passo)");
    }
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

  const isFormValid =
    formData.title.trim() !== "" &&
    formData.influencerId !== "" &&
    ((formData.discountType === "percentage" &&
      formData.discountPercentage! > 0 &&
      formData.discountPercentage! <= 100) ||
      (formData.discountType === "amount" && formData.discountAmount! > 0)) &&
    Object.keys(errors).length === 0;

  return (
    <CreateCouponContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="CRIAR CUPOM" />
        </HeaderEnviroment>
      </div>
      <div className="mobile">
        <DefaultHeader backWard title="CRIAR CUPOM" />
      </div>

      <div className="mainContent">
        <div className="headerSection">
          <div className="titleSection">
            <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
              NOVO CUPOM
            </Text>
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.secondaryText}>
              {searchParams.get("influencerId")
                ? `Criando cupom para ${mockInfluencers.find((i) => i.id === searchParams.get("influencerId"))?.name}`
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
                  onChange={(e) => handleInputChange("title", e.target.value)}
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
                  value={formData.influencerId}
                  onChange={(e) =>
                    handleInputChange("influencerId", e.target.value)
                  }
                  className={`influencerSelect ${errors.influencerId ? "error" : ""}`}
                  disabled={!!searchParams.get("influencerId")}
                >
                  <option value="">Selecione o influencer</option>
                  {mockInfluencers.map((influencer) => (
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
                  value={formData.discountType}
                  onChange={(e) =>
                    handleInputChange(
                      "discountType",
                      e.target.value as "percentage" | "amount",
                    )
                  }
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
                  {formData.discountType === "percentage"
                    ? "Porcentagem (%)"
                    : "Valor"}
                  : *
                </Text>
                {formData.discountType === "percentage" ? (
                  <Input
                    value={formData.discountPercentage || ""}
                    onChange={(e) => {
                      const value =
                        e.target.value === ""
                          ? undefined
                          : parseInt(e.target.value);
                      if (value !== undefined && (value < 0 || value > 100)) {
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
              CONFIGURAÇÕES AVANÇADAS
            </Text>
            <div className="infoGrid">
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Data de expiração:
                </Text>
                <InputMask
                  mask="99/99/9999"
                  maskChar=""
                  value={formData.expiresAt}
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
