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
import { CreateCouponContainer } from "./style";

interface CreateCouponData {
  title: string;
  discountType: "percentage" | "amount";
  discountPercentage?: number;
  discountAmount?: number;
  expiresAt: string;
  maxUses?: number;
  minOrderAmount?: number;
  isActive: boolean;
  influencerId: string;
  isFirstPurchase: boolean;
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
    discountPercentage: 0,
    discountAmount: 0,
    expiresAt: "",
    maxUses: 0,
    minOrderAmount: 0,
    isActive: true,
    influencerId: "",
    isFirstPurchase: false,
  });

  // Verifica se veio da página de cupons por influencer
  useEffect(() => {
    const influencerId = searchParams.get("influencerId");
    if (influencerId) {
      setFormData((prev) => ({ ...prev, influencerId }));
    }
  }, [searchParams]);

  const handleInputChange = (
    field: keyof CreateCouponData,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Aqui será implementada a lógica de criação
    console.log("Dados do formulário:", formData);
    alert("Cupom criado! (Implementação da API será feita no próximo passo)");
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
      formData.discountPercentage! > 0) ||
      (formData.discountType === "amount" && formData.discountAmount! > 0));

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
                />
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
                  className="influencerSelect"
                  disabled={!!searchParams.get("influencerId")}
                >
                  <option value="">Selecione o influencer</option>
                  {mockInfluencers.map((influencer) => (
                    <option key={influencer.id} value={influencer.id}>
                      {influencer.name}
                    </option>
                  ))}
                </select>
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
                    : "Valor (R$)"}
                  : *
                </Text>
                <Input
                  value={
                    formData.discountType === "percentage"
                      ? formData.discountPercentage
                      : formData.discountAmount
                  }
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    if (formData.discountType === "percentage") {
                      handleInputChange("discountPercentage", value);
                    } else {
                      handleInputChange("discountAmount", value);
                    }
                  }}
                  placeholder={
                    formData.discountType === "percentage" ? "10" : "20.00"
                  }
                  height={32}
                  type="number"
                  min="0"
                  step={formData.discountType === "percentage" ? "1" : "0.01"}
                />
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
                <Input
                  value={formData.expiresAt}
                  onChange={(e) =>
                    handleInputChange("expiresAt", e.target.value)
                  }
                  placeholder=""
                  height={32}
                  type="date"
                />
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
                    handleInputChange("maxUses", parseInt(e.target.value) || 0)
                  }
                  placeholder="Ilimitado"
                  height={32}
                  type="number"
                  min="0"
                />
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Valor mínimo do pedido (R$):
                </Text>
                <Input
                  value={formData.minOrderAmount || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "minOrderAmount",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  placeholder="Sem mínimo"
                  height={32}
                  type="number"
                  min="0"
                  step="0.01"
                />
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
            disabled={!isFormValid}
          />
        </div>
      </div>
    </CreateCouponContainer>
  );
};

export default CreateCoupon;
