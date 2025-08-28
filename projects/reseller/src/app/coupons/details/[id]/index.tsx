"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import OnOff from "@4miga/design-system/components/onOff";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { CouponDetailsContainer } from "./style";

interface Coupon {
  id: string;
  title: string;
  discountPercentage?: number;
  discountAmount?: number;
  expiresAt?: Date;
  timesUsed: number;
  totalSalesAmount: number;
  maxUses?: number;
  minOrderAmount?: number;
  isActive: boolean;
  influencerId: string;
  influencerName: string;
  isFirstPurchase: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CouponDetailsProps {
  couponId: string;
}

interface EditCouponData {
  title?: string;
  discountPercentage?: number;
  discountAmount?: number;
  expiresAt?: string;
  maxUses?: number;
  minOrderAmount?: number;
  isActive?: boolean;
  isFirstPurchase?: boolean;
}

interface FormErrors {
  title?: string;
  discountPercentage?: string;
  discountAmount?: string;
  expiresAt?: string;
  maxUses?: string;
  minOrderAmount?: string;
}

// Mock data - será substituído por dados reais da API
const mockCoupons: Coupon[] = [
  {
    id: "1",
    title: "DESCONTO10",
    discountPercentage: 10,
    timesUsed: 25,
    totalSalesAmount: 1250.0,
    maxUses: 100,
    minOrderAmount: 50.0,
    isActive: true,
    influencerId: "1",
    influencerName: "João Silva",
    isFirstPurchase: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "PRIMEIRACOMPRA",
    discountAmount: 20.0,
    timesUsed: 15,
    totalSalesAmount: 800.0,
    maxUses: 50,
    minOrderAmount: 100.0,
    isActive: true,
    influencerId: "2",
    influencerName: "Maria Santos",
    isFirstPurchase: true,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    title: "SUPERDESCONTO",
    discountPercentage: 25,
    timesUsed: 8,
    totalSalesAmount: 400.0,
    maxUses: 30,
    minOrderAmount: 75.0,
    isActive: false,
    influencerId: "3",
    influencerName: "Pedro Costa",
    isFirstPurchase: false,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "4",
    title: "BLACKFRIDAY",
    discountPercentage: 30,
    timesUsed: 45,
    totalSalesAmount: 2200.0,
    maxUses: 200,
    minOrderAmount: 80.0,
    isActive: true,
    influencerId: "1",
    influencerName: "João Silva",
    isFirstPurchase: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "5",
    title: "FREESHIPPING",
    discountAmount: 15.0,
    timesUsed: 32,
    totalSalesAmount: 1200.0,
    maxUses: 150,
    minOrderAmount: 60.0,
    isActive: true,
    influencerId: "4",
    influencerName: "Ana Oliveira",
    isFirstPurchase: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "6",
    title: "WELCOME20",
    discountPercentage: 20,
    timesUsed: 18,
    totalSalesAmount: 900.0,
    maxUses: 80,
    minOrderAmount: 40.0,
    isActive: true,
    influencerId: "2",
    influencerName: "Maria Santos",
    isFirstPurchase: true,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
  },
];

const CouponDetails = ({ couponId }: CouponDetailsProps) => {
  console.log("CouponDetails: Componente renderizado com couponId:", couponId);
  const router = useRouter();
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<EditCouponData>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedDiscountType, setSelectedDiscountType] = useState<
    "percentage" | "amount"
  >("percentage");

  useEffect(() => {
    console.log("CouponDetails: couponId recebido:", couponId);
    // Simula um delay de carregamento para mostrar o estado de loading
    const timer = setTimeout(() => {
      const foundCoupon = mockCoupons.find((c) => c.id === couponId);
      console.log("CouponDetails: cupom encontrado:", foundCoupon);

      if (!foundCoupon) {
        console.log(
          "CouponDetails: Cupom não encontrado, redirecionando para /coupons",
        );
        router.push("/coupons/1");
        return;
      }

      setCoupon(foundCoupon);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [couponId, router]);

  useEffect(() => {
    if (coupon) {
      setEditData({
        title: coupon.title,
        discountPercentage: coupon.discountPercentage,
        discountAmount: coupon.discountAmount,
        expiresAt: coupon.expiresAt
          ? coupon.expiresAt.toISOString().split("T")[0]
          : "",
        maxUses: coupon.maxUses,
        minOrderAmount: coupon.minOrderAmount,
        isActive: coupon.isActive,
        isFirstPurchase: coupon.isFirstPurchase,
      });

      // Define o tipo inicial baseado no cupom
      if (coupon.discountPercentage !== undefined) {
        setSelectedDiscountType("percentage");
      } else if (coupon.discountAmount !== undefined) {
        setSelectedDiscountType("amount");
      }
    }
  }, [coupon]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validação do título
    if (!editData.title?.trim()) {
      newErrors.title = "Título do cupom é obrigatório";
    }

    // Validação do tipo de desconto
    if (editData.discountPercentage !== undefined) {
      if (!editData.discountPercentage || editData.discountPercentage <= 0) {
        newErrors.discountPercentage = "Porcentagem deve ser maior que 0";
      } else if (editData.discountPercentage > 100) {
        newErrors.discountPercentage =
          "Porcentagem não pode ser maior que 100%";
      }
    } else if (editData.discountAmount !== undefined) {
      if (!editData.discountAmount || editData.discountAmount <= 0) {
        newErrors.discountAmount = "Valor deve ser maior que 0";
      }
    } else {
      // Se nenhum dos dois está definido, é obrigatório ter pelo menos um
      if (coupon.discountPercentage !== undefined) {
        newErrors.discountPercentage = "Porcentagem é obrigatória";
      } else if (coupon.discountAmount !== undefined) {
        newErrors.discountAmount = "Valor é obrigatório";
      }
    }

    // Validação da data de expiração (se preenchida)
    if (editData.expiresAt) {
      const selectedDate = new Date(editData.expiresAt);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate <= today) {
        newErrors.expiresAt = "Data de expiração deve ser futura";
      }
    }

    // Validação do máximo de usos (se preenchido)
    if (editData.maxUses && editData.maxUses <= 0) {
      newErrors.maxUses = "Máximo de usos deve ser maior que 0";
    }

    // Validação do valor mínimo do pedido (se preenchida)
    if (editData.minOrderAmount && editData.minOrderAmount < 0) {
      newErrors.minOrderAmount = "Valor mínimo não pode ser negativo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getDiscountText = (coupon: Coupon) => {
    if (coupon.discountPercentage) {
      return `${coupon.discountPercentage}%`;
    }
    if (coupon.discountAmount) {
      return formatCurrency(coupon.discountAmount);
    }
    return "N/A";
  };

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({}); // Clear errors when starting to edit
  };

  const handleSave = () => {
    console.log("Tentando salvar, editData:", editData);
    const isValid = validateForm();
    console.log("Validação passou?", isValid);
    console.log("Erros atuais:", errors);

    if (isValid && coupon) {
      setCoupon({
        ...coupon,
        ...editData,
        expiresAt: editData.expiresAt
          ? new Date(editData.expiresAt)
          : undefined,
        updatedAt: new Date(),
      });
      setIsEditing(false);
      setErrors({}); // Clear errors after successful save
    } else {
      console.log("Validação falhou, não salvando");
    }
  };

  const handleCancel = () => {
    if (coupon) {
      setEditData({
        title: coupon.title,
        discountPercentage: coupon.discountPercentage,
        discountAmount: coupon.discountAmount,
        expiresAt: coupon.expiresAt
          ? coupon.expiresAt.toISOString().split("T")[0]
          : "",
        maxUses: coupon.maxUses,
        minOrderAmount: coupon.minOrderAmount,
        isActive: coupon.isActive,
        isFirstPurchase: coupon.isFirstPurchase,
      });
      setIsEditing(false);
      setErrors({}); // Clear errors when canceling
    }
  };

  const handleToggleActive = () => {
    if (coupon) {
      setCoupon({ ...coupon, isActive: !coupon.isActive });
    }
  };

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir este cupom?")) {
      router.push("/coupons/1");
    }
  };

  const handleInputChange = (
    field: keyof Coupon,
    value: string | number | boolean,
  ) => {
    setEditData((prev) => ({ ...prev, [field]: value }));

    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (loading) {
    return (
      <CouponDetailsContainer>
        <Text align="center" fontName="REGULAR_MEDIUM">
          Carregando...
        </Text>
      </CouponDetailsContainer>
    );
  }

  if (!coupon) {
    return (
      <CouponDetailsContainer>
        <Text
          align="center"
          fontName="REGULAR_MEDIUM"
          color={Theme.colors.refused}
        >
          Cupom não encontrado
        </Text>
        <Button
          title="VOLTAR"
          onClick={handleBack}
          width={120}
          height={40}
          rounded
          style={{
            backgroundColor: Theme.colors.mainHighlight,
            color: Theme.colors.mainlight,
          }}
        />
      </CouponDetailsContainer>
    );
  }

  return (
    <CouponDetailsContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="DETALHES DO CUPOM" />
        </HeaderEnviroment>
      </div>
      <div className="mobile">
        <DefaultHeader backWard title="DETALHES DO CUPOM" />
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
              className={`statusBadge ${coupon.isActive ? "active" : "inactive"}`}
            >
              <Text
                fontName="SMALL_MEDIUM"
                color={
                  coupon.isActive ? Theme.colors.approved : Theme.colors.refused
                }
              >
                {coupon.isActive ? "ATIVO" : "INATIVO"}
              </Text>
            </div>
            <div className="onOff">
              <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                Ativar/Desativar
              </Text>
              <span onClick={handleToggleActive}>
                <OnOff onOff={coupon.isActive} />
              </span>
            </div>
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
                  Título:
                </Text>
                {isEditing ? (
                  <Input
                    value={editData.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
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
                  {coupon.influencerName}
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
                  {editData.discountPercentage !== undefined
                    ? "Porcentagem (%)"
                    : editData.discountAmount !== undefined
                      ? "Valor (R$)"
                      : coupon.discountPercentage
                        ? "Porcentagem (%)"
                        : "Valor (R$)"}
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
          </div>

          <div className="infoSection">
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainHighlight}>
              CONFIGURAÇÕES
            </Text>
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
                      ? formatCurrency(coupon.minOrderAmount)
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
                  {formatCurrency(coupon.totalSalesAmount)}
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

        <div className="actionsSection">
          {isEditing ? (
            <>
              <Button
                title="SALVAR"
                onClick={handleSave}
                width={120}
                height={40}
                rounded
              />
              <Button
                title="CANCELAR"
                onClick={handleCancel}
                width={120}
                height={40}
                rounded
                isNotSelected
              />
            </>
          ) : (
            <>
              <Button
                title="EDITAR"
                onClick={handleEdit}
                width={120}
                height={40}
                rounded
              />
              <Button
                title="EXCLUIR"
                onClick={handleDelete}
                width={120}
                height={40}
                rounded
                style={{
                  backgroundColor: Theme.colors.refused,
                }}
              />
            </>
          )}
        </div>
      </div>
    </CouponDetailsContainer>
  );
};

export default CouponDetails;
