import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import OnOff from "@4miga/design-system/components/onOff";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useProducts } from "context/products/ProductsProvider";
import PackageCard from "public/cards/packageCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useState } from "react";
import { ProductType } from "types/productTypes";
import { formatString } from "utils/formatString";
import CameraIcon from "../../common/icons/CameraIcon.svg";
import ConfirmModal from "./common/confirmModal";
import PixConfiguration from "./common/pixConfiguration";
import { ConfigPackagePage } from "./style";

type Props = {
  slug: string;
  childSlug: string;
};

const SecondaryProductPage = ({ slug, childSlug }: Props) => {
  const [confirmModal, setconfirmModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState({
    packageName: "BIGO LIVE",
    credits: 30,
    isOffer: true,
    isActive: true,
    baseCost: 1.9,
    pixTax: 1,
    profitMargin: 50,
  });

  const products = useProducts();
  const product = products.find(
    (product: ProductType) => formatString(product.name) === slug,
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setconfirmModal(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      packageName: "BIGO LIVE",
      credits: 30,
      isOffer: true,
      isActive: true,
      baseCost: 1.9,
      pixTax: 1,
      profitMargin: 50,
    });
  };

  const handleInputChange = (
    field: string,
    value: string | number | boolean,
  ) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateValues = () => {
    const totalCost =
      editData.baseCost + (editData.baseCost * editData.pixTax) / 100;
    const profitValue = (totalCost * editData.profitMargin) / 100;
    const sellValue = totalCost + profitValue;

    return {
      totalCost,
      profitValue,
      sellValue,
    };
  };

  const values = calculateValues();

  return (
    <ConfigPackagePage>
      {confirmModal && <ConfirmModal setconfirmModal={setconfirmModal} />}
      <div className="desktop tablet">
        <HeaderEnviroment>
          <DefaultHeader backWard title="CONFIGURAR PACOTE" />
        </HeaderEnviroment>
      </div>
      <div className="mobile">
        <DefaultHeader backWard title="CONFIG PACOTE" />
      </div>
      <div className="mainContent">
        <div className="headerSection">
          <div className="packageInfo">
            <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
              {editData.packageName}
            </Text>
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainHighlight}>
              {editData.credits} créditos
            </Text>
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
                <span
                  onClick={() =>
                    handleInputChange("isActive", !editData.isActive)
                  }
                >
                  <OnOff onOff={editData.isActive} />
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="infoSections">
          <div className="infoSection">
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainHighlight}>
              VISUALIZAÇÃO DO PACOTE
            </Text>
            <div className="imageSection">
              <Text fontName="TINY_MEDIUM" color={Theme.colors.secondaryText}>
                A imagem deve estar no formato .png, .jpg ou .jpeg, ter uma
                resolução mínima de 480 x 480 e uma proporção de 1:1
              </Text>
              <div className="cardNavigation">
                <button
                  className="navArrow leftArrow"
                  onClick={() => {}}
                  title="Pacote anterior"
                >
                  ←
                </button>
                <div className="cardEnviroment">
                  <PackageCard
                    bestOffer={editData.isOffer}
                    title={editData.packageName}
                    imageUrl={
                      "https://4miga.games/_next/image?url=https%3A%2F%2Fi.imgur.com%2F0CEHULk.png&w=256&q=75"
                    }
                    price={editData.baseCost}
                  />
                </div>
                <button
                  className="navArrow rightArrow"
                  onClick={() => {}}
                  title="Próximo pacote"
                >
                  →
                </button>
              </div>
              <Button
                leftElement={<CameraIcon />}
                onClick={() => {}}
                height={32}
                width={180}
                color={Theme.colors.mainlight}
                title="Atualizar imagem"
              >
                Atualizar imagem
              </Button>
            </div>
          </div>
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
                  Nome do pacote:
                </Text>
                {isEditing ? (
                  <Input
                    value={editData.packageName}
                    onChange={(e) =>
                      handleInputChange("packageName", e.target.value)
                    }
                    placeholder="Nome do pacote"
                    height={32}
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {editData.packageName}
                  </Text>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Quantidade de créditos:
                </Text>
                {isEditing ? (
                  <Input
                    value={editData.credits}
                    onChange={(e) =>
                      handleInputChange(
                        "credits",
                        parseInt(e.target.value) || 0,
                      )
                    }
                    placeholder="Quantidade de créditos"
                    height={32}
                    type="number"
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {editData.credits}
                  </Text>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Definir como oferta:
                </Text>
                {isEditing ? (
                  <div className="toggleContainer">
                    <Text
                      fontName="SMALL_MEDIUM"
                      color={Theme.colors.mainlight}
                    >
                      {editData.isOffer ? "Sim" : "Não"}
                    </Text>
                    <span
                      onClick={() =>
                        handleInputChange("isOffer", !editData.isOffer)
                      }
                    >
                      <OnOff onOff={editData.isOffer} />
                    </span>
                  </div>
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {editData.isOffer ? "Sim" : "Não"}
                  </Text>
                )}
              </div>
            </div>

            <div className="sectionDivider"></div>

            <div className="sectionTitle">
              <Text
                fontName="REGULAR_MEDIUM"
                color={Theme.colors.mainHighlight}
              >
                CONFIGURAÇÕES DE PREÇO
              </Text>
            </div>
            <Text fontName="REGULAR">
              Preço base - R$ {editData.baseCost.toFixed(2)}
            </Text>
            <div className="infoGrid">
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Valor do pacote:
                </Text>
                {isEditing ? (
                  <Input
                    value={editData.baseCost}
                    onChange={(e) =>
                      handleInputChange(
                        "baseCost",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    placeholder="Custo base"
                    height={32}
                    type="number"
                    step="0.01"
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    R$ {editData.baseCost.toFixed(2)}
                  </Text>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Margem de lucro (%):
                </Text>
                {isEditing ? (
                  <Input
                    value={editData.profitMargin}
                    onChange={(e) =>
                      handleInputChange(
                        "profitMargin",
                        parseInt(e.target.value) || 0,
                      )
                    }
                    placeholder="Margem de lucro"
                    height={32}
                    type="number"
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {editData.profitMargin}%
                  </Text>
                )}
              </div>
            </div>

            <div className="sectionDivider"></div>

            <div className="sectionTitle">
              <Text
                fontName="REGULAR_MEDIUM"
                color={Theme.colors.mainHighlight}
              >
                MEIOS DE PAGAMENTO
              </Text>
            </div>
            <div className="paymentMethodsSection">
              <PixConfiguration
                tax={`${editData.pixTax}%`}
                totalCost={values.totalCost}
                profitMargin={editData.profitMargin}
                profitValue={values.profitValue}
                sellValue={values.sellValue}
              />
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
                  />
                  <Button
                    title="SALVAR"
                    onClick={handleSave}
                    width={120}
                    height={36}
                    rounded
                  />
                </>
              ) : (
                <Button
                  title="EDITAR"
                  onClick={handleEdit}
                  width={120}
                  height={36}
                  rounded
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </ConfigPackagePage>
  );
};

export default SecondaryProductPage;
