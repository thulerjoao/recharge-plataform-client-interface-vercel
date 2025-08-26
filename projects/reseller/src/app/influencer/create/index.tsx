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
import Icon from "../icons/icon.svg";
import { CreateInfluencerContainer } from "./style";

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

  const [isActive, setIsActive] = useState(true);

  const handleInputChange = (
    field: keyof CreateInfluencerData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    //implement on submit
  };

  const handleCancel = () => {
    router.back();
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.paymentMethod !== "" &&
    formData.paymentData.trim() !== "";

  return (
    <CreateInfluencerContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="ADICIONAR PARCEIRO" />
        </HeaderEnviroment>
      </div>
      <div className="mobile">
        <DefaultHeader backWard title="ADICIONAR PARCEIRO" />
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
                color={isActive ? Theme.colors.approved : Theme.colors.refused}
              >
                {isActive ? "Ativo" : "Inativo"}
              </Text>
            </div>
          </div>
          <div className="onOff">
            <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
              Ativar/Desativar
            </Text>
            <span onClick={() => setIsActive(!isActive)}>
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
                />
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
                />
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Telefone:
                </Text>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Telefone (opcional)"
                  height={32}
                  type="tel"
                />
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
                  onChange={(e) =>
                    handleInputChange("paymentMethod", e.target.value)
                  }
                  className="pixTypeSelect"
                >
                  <option value="CPF">CPF</option>
                  <option value="CNPJ">CNPJ</option>
                  <option value="EMAIL">E-mail</option>
                  <option value="PHONE">Telefone</option>
                  <option value="RANDOM">Chave aleatória</option>
                </select>
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Chave PIX: *
                </Text>
                <Input
                  value={formData.paymentData}
                  onChange={(e) =>
                    handleInputChange("paymentData", e.target.value)
                  }
                  placeholder="Chave PIX"
                  height={32}
                />
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
            title="CADASTRAR"
            onClick={handleSubmit}
            width={140}
            height={40}
            rounded
            disabled={!isFormValid}
          />
        </div>
      </div>
    </CreateInfluencerContainer>
  );
};

export default CreateInfluencer;
