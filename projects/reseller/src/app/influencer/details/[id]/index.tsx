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
import Icon from "../../icons/icon.svg";
import { InfluencerDetailsContainer } from "./style";

interface Influencer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  paymentMethod?: string;
  paymentData?: string;
  isActive: boolean;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface InfluencerDetailsProps {
  influencerId: string;
}

// Mock data - será substituído por dados reais da API
const mockInfluencers: Influencer[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    paymentMethod: "PIX",
    paymentData: "joao.silva@email.com",
    isActive: true,
    storeId: "store-1",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "(11) 88888-8888",
    paymentMethod: "PIX",
    paymentData: "maria.santos@email.com",
    isActive: true,
    storeId: "store-1",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro.costa@email.com",
    phone: "(11) 77777-7777",
    paymentMethod: "PIX",
    paymentData: "pedro.costa@email.com",
    isActive: false,
    storeId: "store-1",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
];

const InfluencerDetails = ({ influencerId }: InfluencerDetailsProps) => {
  const router = useRouter();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Influencer>>({});

  useEffect(() => {
    const foundInfluencer = mockInfluencers.find(
      (inf) => inf.id === influencerId,
    );
    setInfluencer(foundInfluencer || null);
    setLoading(false);
  }, [influencerId]);

  useEffect(() => {
    if (influencer) {
      setEditData({
        name: influencer.name,
        email: influencer.email,
        phone: influencer.phone,
        paymentMethod: influencer.paymentMethod,
        paymentData: influencer.paymentData,
      });
    }
  }, [influencer]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (influencer) {
      setInfluencer({
        ...influencer,
        ...editData,
        updatedAt: new Date(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (influencer) {
      setEditData({
        name: influencer.name,
        email: influencer.email,
        phone: influencer.phone,
        paymentMethod: influencer.paymentMethod,
        paymentData: influencer.paymentData,
      });
      setIsEditing(false);
    }
  };

  const handleToggleActive = () => {
    if (influencer) {
      setInfluencer({ ...influencer, isActive: !influencer.isActive });
    }
  };

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir este parceiro?")) {
      router.push("/influencer/1");
    }
  };

  const handleInputChange = (field: keyof Influencer, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <InfluencerDetailsContainer>
        <Text align="center" fontName="REGULAR_MEDIUM">
          Carregando...
        </Text>
      </InfluencerDetailsContainer>
    );
  }

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
      <div className="mobile">
        <DefaultHeader backWard title="DETALHES DO PARCEIRO" />
      </div>

      <div className="mainContent">
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
          <div className="onOff">
            <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
              Ativar/Desativar
            </Text>
            <span onClick={handleToggleActive}>
              <OnOff onOff={influencer.isActive} />
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
                  Nome:
                </Text>
                {isEditing ? (
                  <Input
                    value={editData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Nome do parceiro"
                    height={32}
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {influencer.name}
                  </Text>
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
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {influencer.email || "Não informado"}
                  </Text>
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
                  <Input
                    value={editData.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Telefone"
                    height={32}
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {influencer.phone
                      ? formatPhone(influencer.phone)
                      : "Não informado"}
                  </Text>
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
                    className="pixTypeSelect"
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
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Chave PIX:
                </Text>
                {isEditing ? (
                  <Input
                    value={editData.paymentData || ""}
                    onChange={(e) =>
                      handleInputChange("paymentData", e.target.value)
                    }
                    placeholder="Chave PIX"
                    height={32}
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {influencer.paymentData || "Não informado"}
                  </Text>
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
                // isNotSelected
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
        <span>
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
