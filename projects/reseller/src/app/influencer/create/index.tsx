"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import OnOff from "@4miga/design-system/components/onOff";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useState } from "react";
import InputMask from "react-input-mask";
import Icon from "../icons/icon.svg";
import { CreateInfluencerContainer } from "./style";
import { validateCPF, validateCNPJ } from "../../../utils/documentValidation";

interface CreateInfluencerData {
  name: string;
  email: string;
  phone: string;
  paymentMethod: string;
  paymentData: string;
  isActive: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  paymentMethod?: string;
  paymentData?: string;
}

const CreateInfluencer = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateInfluencerData>({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
    paymentData: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validação do nome
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    // Validação do email (se preenchido)
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Validação do telefone (se preenchido)
    if (formData.phone.trim()) {
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (phoneDigits.length !== 11) {
        newErrors.phone = "Telefone deve ter 11 dígitos";
      }
    }

    // Validação do método de pagamento
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Tipo de chave PIX é obrigatório";
    }

    // Validação da chave PIX
    if (!formData.paymentData.trim()) {
      newErrors.paymentData = "Chave PIX é obrigatória";
    } else {
      // Validação específica por tipo de chave
      const paymentData = formData.paymentData.replace(/\D/g, "");

      if (formData.paymentMethod === "CPF") {
        if (paymentData.length !== 11) {
          newErrors.paymentData = "CPF deve ter 11 dígitos";
        } else if (!validateCPF(formData.paymentData)) {
          newErrors.paymentData = "CPF inválido";
        }
      } else if (formData.paymentMethod === "CNPJ") {
        if (paymentData.length !== 14) {
          newErrors.paymentData = "CNPJ deve ter 14 dígitos";
        } else if (!validateCNPJ(formData.paymentData)) {
          newErrors.paymentData = "CNPJ inválido";
        }
      } else if (
        formData.paymentMethod === "EMAIL" &&
        !/\S+@\S+\.\S+/.test(formData.paymentData)
      ) {
        newErrors.paymentData = "Email inválido";
      } else if (
        formData.paymentMethod === "PHONE" &&
        paymentData.length !== 11
      ) {
        newErrors.paymentData = "Telefone deve ter 11 dígitos";
      } else if (
        formData.paymentMethod === "RANDOM" &&
        paymentData.length !== 32
      ) {
        newErrors.paymentData = "Chave aleatória deve ter 32 caracteres";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof CreateInfluencerData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Formulário válido:", formData);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.paymentMethod !== "" &&
    formData.paymentData.trim() !== "" &&
    Object.keys(errors).length === 0;

  return (
    <CreateInfluencerContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="ADICIONAR INFLUENCER" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          INFLUENCER
        </Text>
      </div>

      <div className="mainContent">
        <div className="headerSection">
          <div className="avatar">
            <Icon />
          </div>
          <div className="headerInfo">
            <Text fontName="LARGE_MEDIUM" color={Theme.colors.mainlight}>
              Status inicial
            </Text>
            <div className="statusBadge">
              <Text
                align="center"
                fontName="SMALL"
                color={
                  formData.isActive
                    ? Theme.colors.approved
                    : Theme.colors.refused
                }
              >
                {formData.isActive ? "Ativo" : "Inativo"}
              </Text>
            </div>
          </div>
          <div className="onOff">
            <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
              Ativar/Desativar
            </Text>
            <span
              onClick={() => {
                const newValue = !formData.isActive;
                handleInputChange("isActive", newValue);
              }}
            >
              <OnOff onOff={formData.isActive} />
            </span>
          </div>
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
                  Nome: *
                </Text>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Nome do parceiro"
                  height={32}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && (
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
                <Input
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="E-mail (opcional)"
                  height={32}
                  type="email"
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
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
                <InputMask
                  mask="(99) 99999-9999"
                  maskChar=""
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                >
                  {(inputProps: any) => (
                    <Input
                      {...inputProps}
                      placeholder="Telefone (opcional)"
                      height={32}
                      type="tel"
                      className={errors.phone ? "error" : ""}
                    />
                  )}
                </InputMask>
                {errors.phone && (
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
                  Tipo da chave PIX: *
                </Text>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => {
                    handleInputChange("paymentMethod", e.target.value);
                    handleInputChange("paymentData", "");
                  }}
                  className={`pixTypeSelect ${errors.paymentMethod ? "error" : ""}`}
                >
                  <option value="">Selecione o tipo</option>
                  <option value="CPF">CPF</option>
                  <option value="CNPJ">CNPJ</option>
                  <option value="EMAIL">E-mail</option>
                  <option value="PHONE">Telefone</option>
                  <option value="RANDOM">Chave aleatória</option>
                </select>
                {errors.paymentMethod && (
                  <span className="error-message">{errors.paymentMethod}</span>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Chave PIX: *
                </Text>
                {formData.paymentMethod === "CPF" ? (
                  <InputMask
                    mask="999.999.999-99"
                    maskChar=""
                    value={formData.paymentData}
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
                ) : formData.paymentMethod === "CNPJ" ? (
                  <InputMask
                    mask="99.999.999/9999-99"
                    maskChar=""
                    value={formData.paymentData}
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
                ) : formData.paymentMethod === "PHONE" ? (
                  <InputMask
                    mask="(99) 99999-9999"
                    maskChar=""
                    value={formData.paymentData}
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
                    value={formData.paymentData}
                    onChange={(e) =>
                      handleInputChange("paymentData", e.target.value)
                    }
                    placeholder={
                      formData.paymentMethod === "EMAIL"
                        ? "email@exemplo.com"
                        : formData.paymentMethod === "RANDOM"
                          ? "Chave aleatória de 32 caracteres"
                          : "Chave PIX"
                    }
                    height={32}
                    className={errors.paymentData ? "error" : ""}
                  />
                )}
                {errors.paymentData && (
                  <span className="error-message">{errors.paymentData}</span>
                )}
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
            isNotSelected
            style={{
              backgroundColor: Theme.colors.secondaryAction,
              color: Theme.colors.mainlight,
            }}
          />
          <Button
            title="CADASTRAR"
            onClick={handleSubmit}
            width={140}
            height={40}
            rounded
          />
        </div>
      </div>
    </CreateInfluencerContainer>
  );
};

export default CreateInfluencer;
