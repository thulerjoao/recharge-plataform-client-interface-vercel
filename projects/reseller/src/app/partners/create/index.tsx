"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import OnOff from "@4miga/design-system/components/onOff";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPost } from "@4miga/services/connectionAPI/connection";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useState } from "react";
import InputMask from "react-input-mask";
import { apiUrl } from "@4miga/services/connectionAPI/url";
import { PixKeyInput } from "../../../public/components/PixKeyInput";
import {
  FormErrors,
  validateInfluencerForm,
} from "../../../utils/influencerValidation";
import Icon from "../(common)/icons/icon.svg";
import { CreateInfluencerContainer } from "./style";
import LoadingPage from "app/loading";

interface CreateInfluencerData {
  name: string;
  email: string;
  phone: string;
  paymentMethod: string;
  paymentData: string;
  isActive: boolean;
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
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    field: keyof CreateInfluencerData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Clear PIX key when payment method changes
    if (field === "paymentMethod") {
      setFormData((prev) => ({ ...prev, paymentData: "" }));
      if (errors.paymentData) {
        setErrors((prev) => ({ ...prev, paymentData: undefined }));
      }
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async () => {
    const { isValid, errors: validationErrors } =
      validateInfluencerForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    await connectionAPIPost("/influencer", formData, apiUrl)
      .then(() => {
        router.push("/parceiros");
        alert("Parceiro cadastrado com sucesso");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        if (
          error.response.data.message ===
          "Influencer with this name already exists for this store"
        ) {
          alert("Parceiro já cadastrado");
        } else {
          alert("Algo deu errado, tente novamente");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CreateInfluencerContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="ADICIONAR PARCEIRO" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          ADIC. PARCEIRO
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
                <PixKeyInput
                  paymentMethod={formData.paymentMethod}
                  value={formData.paymentData}
                  onChange={(value) => handleInputChange("paymentData", value)}
                  error={errors.paymentData}
                />
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
            disabled={isLoading}
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
            loading={isLoading}
            disabled={isLoading}
          />
        </div>
      </div>
    </CreateInfluencerContainer>
  );
};

export default CreateInfluencer;
