/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import OnOff from "@4miga/design-system/components/onOff";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import {
  connectionAPIGet,
  connectionAPIDelete,
  connectionAPIPatch,
} from "@4miga/services/connectionAPI/connection";

import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { InfluencerType } from "types/influencerType";
import { apiUrl } from "utils/apiUrl";
import { formatDate } from "utils/formatDate";
import { formatPrice } from "utils/formatPrice";
import {
  FormErrors,
  validateInfluencerForm,
} from "../../../../utils/influencerValidation";
import Icon from "../../icons/icon.svg";
import { InfluencerDetailsContainer } from "./style";

// interface Influencer {
//   id: string;
//   name: string;
//   email?: string;
//   phone?: string;
//   paymentMethod?: string;
//   paymentData?: string;
//   isActive: boolean;
//   storeId: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface InfluencerMonthlySales {
//   id: string;
//   influencerId: string;
//   month: number;
//   year: number;
//   totalSales: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

interface InfluencerDetailsProps {
  influencerId: string;
}

const InfluencerDetails = ({ influencerId }: InfluencerDetailsProps) => {
  const router = useRouter();

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [influencer, setInfluencer] = useState<InfluencerType>();
  const [editData, setEditData] = useState<Partial<InfluencerType>>();

  const getInfluencer = async () => {
    await connectionAPIGet<InfluencerType>(
      `/influencer/${influencerId}`,
      apiUrl,
    )
      .then((res) => {
        setInfluencer(res);
        setEditData(res);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getInfluencer();
  }, []);

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const getMonthName = (month: number) => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return months[month - 1];
  };

  const getCurrentMonthSales = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() retorna 0-11
    const currentYear = currentDate.getFullYear();

    return influencer.monthlySales.find(
      (sale) => sale.month === currentMonth && sale.year === currentYear,
    );
  };

  const getPreviousMonthsSales = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    return influencer.monthlySales
      .filter((sale) => {
        if (sale.year < currentYear) return true;
        if (sale.year === currentYear && sale.month < currentMonth) return true;
        return false;
      })
      .sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
      });
  };

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const data = {
      name: editData.name,
      email: editData.email,
      phone: editData.phone,
      paymentMethod: editData.paymentMethod,
      paymentData: editData.paymentData,
      isActive: editData.isActive,
    };
    setLoading(true);
    connectionAPIPatch(`/influencer/${influencerId}`, data, apiUrl)
      .then(async () => {
        await getInfluencer();
        setIsEditing(false);
        alert("Parceiro atualizado!");
      })
      .catch((err) => {
        console.log("err", err);
        if (
          err.response.data.message ===
          "Influencer with this name already exists for this store"
        ) {
          alert("Nome já cadastrado");
        } else {
          alert("Erro ao salvar");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    if (influencer) {
      setEditData(influencer);
      setIsEditing(false);
      setErrors({}); // Clear errors when canceling
    }
  };

  const handleToggleActive = () => {
    setEditData((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir este parceiro?")) {
      connectionAPIDelete(`/influencer/${influencerId}`, apiUrl)
        .then(() => {
          router.push("/parceiros/1");
        })
        .catch((err) => {
          alert("Algo deu errado, tente novamente");
        });
    }
  };

  const handleInputChange = (field: keyof InfluencerType, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));

    // Clear specific error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Clear payment data when payment method changes
    if (field === "paymentMethod") {
      setEditData((prev) => ({ ...prev, paymentData: "" }));
      // Also clear payment data error if it exists
      if (errors.paymentData) {
        setErrors((prev) => ({ ...prev, paymentData: undefined }));
      }
    }
  };

  // const validateForm = (): boolean => {
  //   const { isValid, errors: validationErrors } = validateInfluencerForm({
  //     name: editData.name || "",
  //     email: editData.email || "",
  //     phone: editData.phone || "",
  //     paymentMethod: editData.paymentMethod || "",
  //     paymentData: editData.paymentData || "",
  //   });

  //   setErrors(validationErrors);
  //   return isValid;
  // };

  if (!influencer) {
    return (
      <InfluencerDetailsContainer>
        <Text
          align="center"
          fontName="REGULAR_MEDIUM"
          color={Theme.colors.mainlight}
          margin="0 0 16px 0"
        >
          Parceiro não encontrado
        </Text>
        <Button
          title="VOLTAR"
          onClick={handleBack}
          width={120}
          height={40}
          rounded
        />
      </InfluencerDetailsContainer>
    );
  }

  return (
    <InfluencerDetailsContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="DETALHES DO PARCEIRO" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text nowrap align="center" fontName="LARGE_SEMI_BOLD">
          DETALHES PARCEIRO
        </Text>
      </div>

      <div className="influencerMainContent">
        <div className="headerSection">
          <div className="avatar">
            <Icon />
          </div>
          <div className="headerInfo">
            <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
              {influencer.name}
            </Text>
            <div
              className={`statusBadge ${influencer.isActive ? "active" : "inactive"}`}
            >
              <Text
                align="center"
                fontName="SMALL_MEDIUM"
                color={
                  influencer.isActive
                    ? Theme.colors.approved
                    : Theme.colors.refused
                }
              >
                {influencer.isActive ? "ATIVO" : "INATIVO"}
              </Text>
            </div>
          </div>
          {isEditing && (
            <div className="onOff">
              <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                Ativar/Desativar
              </Text>
              <span onClick={handleToggleActive}>
                <OnOff onOff={influencer.isActive} />
              </span>
            </div>
          )}
        </div>

        <div className="infoSections">
          <div className="infoSection">
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainHighlight}>
              INFORMAÇÕES DE CONTATO
            </Text>
            <div className="infoGrid">
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Nome:
                </Text>
                {isEditing ? (
                  <Input
                    value={editData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Nome do parceiro"
                    height={32}
                    className={errors.name ? "error" : ""}
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {influencer.name}
                  </Text>
                )}
                {isEditing && errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  E-mail:
                </Text>
                {isEditing ? (
                  <Input
                    value={editData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="E-mail"
                    height={32}
                    className={errors.email ? "error" : ""}
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {influencer.email || "Não informado"}
                  </Text>
                )}
                {isEditing && errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Telefone:
                </Text>
                {isEditing ? (
                  <InputMask
                    mask="(99) 99999-9999"
                    maskChar=""
                    value={editData.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  >
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        placeholder="(11) 99999-9999"
                        height={32}
                        className={errors.phone ? "error" : ""}
                      />
                    )}
                  </InputMask>
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {influencer.phone
                      ? formatPhone(influencer.phone)
                      : "Não informado"}
                  </Text>
                )}
                {isEditing && errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>
            </div>
          </div>

          <div className="infoSection">
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainHighlight}>
              INFORMAÇÕES DE PAGAMENTO
            </Text>
            <div className="infoGrid">
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Tipo da chave PIX:
                </Text>
                {isEditing ? (
                  <select
                    value={editData.paymentMethod || ""}
                    onChange={(e) =>
                      handleInputChange("paymentMethod", e.target.value)
                    }
                    className={`pixTypeSelect ${errors.paymentMethod ? "error" : ""}`}
                  >
                    <option value="CPF">CPF</option>
                    <option value="CNPJ">CNPJ</option>
                    <option value="EMAIL">E-mail</option>
                    <option value="PHONE">Telefone</option>
                    <option value="RANDOM">Chave aleatória</option>
                  </select>
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {influencer.paymentMethod || "Não informado"}
                  </Text>
                )}
                {isEditing && errors.paymentMethod && (
                  <span className="error-message">{errors.paymentMethod}</span>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Chave PIX:
                </Text>
                {isEditing ? (
                  editData.paymentMethod === "CPF" ? (
                    <InputMask
                      mask="999.999.999-99"
                      maskChar=""
                      value={editData.paymentData || ""}
                      onChange={(e) =>
                        handleInputChange("paymentData", e.target.value)
                      }
                    >
                      {(inputProps: any) => (
                        <Input
                          {...inputProps}
                          placeholder="000.000.000-00"
                          height={32}
                          className={errors.paymentData ? "error" : ""}
                        />
                      )}
                    </InputMask>
                  ) : editData.paymentMethod === "CNPJ" ? (
                    <InputMask
                      mask="99.999.999/9999-99"
                      maskChar=""
                      value={editData.paymentData || ""}
                      onChange={(e) =>
                        handleInputChange("paymentData", e.target.value)
                      }
                    >
                      {(inputProps: any) => (
                        <Input
                          {...inputProps}
                          placeholder="00.000.000/0000-00"
                          height={32}
                          className={errors.paymentData ? "error" : ""}
                        />
                      )}
                    </InputMask>
                  ) : editData.paymentMethod === "PHONE" ? (
                    <InputMask
                      mask="(99) 99999-9999"
                      maskChar=""
                      value={editData.paymentData || ""}
                      onChange={(e) =>
                        handleInputChange("paymentData", e.target.value)
                      }
                    >
                      {(inputProps: any) => (
                        <Input
                          {...inputProps}
                          placeholder="(11) 99999-9999"
                          height={32}
                          className={errors.paymentData ? "error" : ""}
                        />
                      )}
                    </InputMask>
                  ) : (
                    <Input
                      value={editData.paymentData || ""}
                      onChange={(e) =>
                        handleInputChange("paymentData", e.target.value)
                      }
                      placeholder={
                        editData.paymentMethod === "EMAIL"
                          ? "email@exemplo.com"
                          : editData.paymentMethod === "RANDOM"
                            ? "Chave aleatória de 32 caracteres"
                            : "Chave PIX"
                      }
                      height={32}
                      className={errors.paymentData ? "error" : ""}
                    />
                  )
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {influencer.paymentData || "Não informado"}
                  </Text>
                )}
                {isEditing && errors.paymentData && (
                  <span className="error-message">{errors.paymentData}</span>
                )}
              </div>
            </div>
          </div>

          <div className="infoSection">
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainHighlight}>
              INFORMAÇÕES DO SISTEMA
            </Text>
            <div className="infoGrid">
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  ID do parceiro:
                </Text>
                <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                  {influencer.id}
                </Text>
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  ID da loja:
                </Text>
                <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                  {influencer.storeId}
                </Text>
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Data de cadastro:
                </Text>
                <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                  {formatDate(influencer.createdAt)}
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
                  {formatDate(influencer.updatedAt)}
                </Text>
              </div>
            </div>
          </div>

          <div className="infoSection">
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainHighlight}>
              VENDAS
            </Text>
            <div className="salesContent">
              {/* Vendas do mês atual */}
              <div className="currentMonthSales">
                <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainlight}>
                  Mês Atual
                </Text>
                {getCurrentMonthSales() ? (
                  <div className="salesAmount">
                    <Text
                      fontName="LARGE_SEMI_BOLD"
                      color={Theme.colors.approved}
                    >
                      R${" "}
                      {formatPrice(Number(getCurrentMonthSales()!.totalSales))}
                    </Text>
                    <Text
                      fontName="SMALL_MEDIUM"
                      color={Theme.colors.secondaryText}
                    >
                      {getMonthName(getCurrentMonthSales()!.month)}{" "}
                      {getCurrentMonthSales()!.year}
                    </Text>
                  </div>
                ) : (
                  <div className="noSales">
                    <Text
                      fontName="REGULAR_MEDIUM"
                      color={Theme.colors.secondaryText}
                    >
                      Nenhuma venda registrada este mês
                    </Text>
                  </div>
                )}
              </div>

              {/* Vendas dos meses anteriores */}
              {/* <div className="previousMonthsSales">
                <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainlight}>
                  Meses Anteriores
                </Text>
                {getPreviousMonthsSales().length > 0 ? (
                  <div className="salesList">
                    {getPreviousMonthsSales().map((sale) => (
                      <div key={sale.id} className="salesItem">
                        <div className="salesInfo">
                          <Text
                            fontName="SMALL_MEDIUM"
                            color={Theme.colors.mainlight}
                          >
                            {getMonthName(sale.month)} {sale.year}
                          </Text>
                          <Text
                            fontName="REGULAR_MEDIUM"
                            color={Theme.colors.approved}
                          >
                            R$ {formatPrice(Number(sale.totalSales))}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="noSales">
                    <Text
                      fontName="REGULAR_MEDIUM"
                      color={Theme.colors.secondaryText}
                    >
                      Nenhuma venda registrada em meses anteriores
                    </Text>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </div>

        <div className="actionsSection">
          {isEditing ? (
            <>
              <Button
                title="CANCELAR"
                onClick={handleCancel}
                width={120}
                height={40}
                rounded
                disabled={loading}
                // isNotSelected
              />
              <Button
                title="SALVAR"
                onClick={handleSave}
                width={120}
                height={40}
                disabled={loading}
                loading={loading}
                rounded
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
        <span
          onClick={() => router.push(`/coupons/influencer/${influencer.id}`)}
        >
          <Text
            color={Theme.colors.secondaryAction}
            pointer
            underline
            align="center"
            fontName="REGULAR_MEDIUM"
          >
            Visualizar todos os cupons
          </Text>
        </span>
      </div>
    </InfluencerDetailsContainer>
  );
};

export default InfluencerDetails;
