import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import OnOff from "@4miga/design-system/components/onOff";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import { usePackages } from "context/packages";
import PackageCard from "public/cards/packageCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useState } from "react";
import { PackageType, ProductType } from "types/productTypes";
import { apiUrl } from "utils/apiUrl";
import CameraIcon from "../../common/icons/CameraIcon.svg";
import ConfirmModal from "./common/confirmModal";
import PixConfiguration from "./common/pixCard/pixConfiguration";
import { ConfigPackagePage } from "./style";
import { useRouter } from "next/navigation";
import LoadingPage from "app/loading";

type Props = {
  slug: string;
  childSlug: string;
};

const SecondaryProductPage = ({ slug, childSlug }: Props) => {
  const route = useRouter();
  const [confirmModal, setconfirmModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [packageData, setPackageData] = useState<PackageType>();
  const [editData, setEditData] = useState<PackageType>();
  const { productPackages, setProductPackages } = usePackages();
  const [index, setIndex] = useState<number>();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(packageData);
  };

  const handleSave = () => {
    if (packageData === editData) {
      handleCancel();
      return;
    }
    setIsEditing(false);
    setconfirmModal(true);
  };

  const handleInputChange = (
    field: string,
    value: string | number | boolean,
  ) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateValues = () => {
    const totalCost =
      +editData?.basePrice +
      (+editData?.basePrice * editData?.paymentMethods[0].price) / 100;
    const profitValue =
      (totalCost * (editData?.paymentMethods[0].price - +editData?.basePrice)) /
      100;
    const sellValue = totalCost + profitValue;

    return {
      totalCost,
      profitValue,
      sellValue,
    };
  };

  const values = calculateValues();

  const handleIndex = (param: PackageType[], id: string) => {
    setIndex(param.findIndex((packag: PackageType) => packag.id === id));
  };

  useEffect(() => {
    const localPackage = productPackages?.packages.find(
      (packag: PackageType) => packag.id === childSlug,
    );
    if (localPackage) {
      setEditData(localPackage);
      setPackageData(localPackage);
      setLoading(false);
      handleIndex(productPackages?.packages, childSlug);
    } else {
      connectionAPIGet<ProductType>(`/product/${slug}`, apiUrl)
        .then((res) => {
          setProductPackages(res);
          const localPackage = res.packages.find(
            (packag: PackageType) => packag.id === childSlug,
          );
          setPackageData(localPackage);
          setEditData(localPackage);
          handleIndex(res.packages, childSlug);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNextPackage = () => {
    setIndex(index + 1);
    const newPackage = productPackages?.packages[index + 1];
    setEditData(newPackage);
    setPackageData(newPackage);
  };

  const handlePreviousPackage = () => {
    setIndex(index - 1);
    const newPackage = productPackages?.packages[index - 1];
    setEditData(newPackage);
    setPackageData(newPackage);
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <ConfigPackagePage>
      {confirmModal && <ConfirmModal setconfirmModal={setconfirmModal} />}
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="CONFIGURAR PACOTE" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          CONFIG PACOTE
        </Text>
      </div>
      <div className="mainContentPackage">
        <div className="headerSection">
          <div className="packageInfo">
            <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
              {editData?.name}
            </Text>
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainHighlight}>
              {editData?.amountCredits} créditos
            </Text>
          </div>
          <div className="statusSection">
            <div
              className={`statusBadge ${editData?.isActive ? "active" : "inactive"}`}
            >
              <Text
                fontName="SMALL_MEDIUM"
                color={
                  editData?.isActive
                    ? Theme.colors.approved
                    : Theme.colors.refused
                }
              >
                {editData?.isActive ? "ATIVO" : "INATIVO"}
              </Text>
            </div>
            {isEditing && (
              <div className="onOff">
                <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                  Ativar/Desativar
                </Text>
                <span
                  onClick={() =>
                    handleInputChange("isActive", !editData?.isActive)
                  }
                >
                  <OnOff onOff={editData?.isActive} />
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
                {index !== 0 ? (
                  <button
                    onClick={handlePreviousPackage}
                    className="navArrow leftArrow"
                    title="Pacote anterior"
                    disabled={index === 0}
                  >
                    ←
                  </button>
                ) : (
                  <div className="disabled" />
                )}
                <div className="cardEnviroment">
                  <PackageCard
                    bestOffer={editData?.isOffer}
                    title={editData?.name}
                    imageUrl={editData?.imgCardUrl}
                    price={+editData?.basePrice}
                  />
                </div>
                {index !== productPackages?.packages.length - 1 ? (
                  <button
                    onClick={handleNextPackage}
                    className="navArrow rightArrow"
                    title="Próximo pacote"
                    disabled={index === productPackages?.packages.length - 1}
                  >
                    →
                  </button>
                ) : (
                  <div className="disabled" />
                )}
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
                    value={editData?.name}
                    onChange={(e) =>
                      handleInputChange("packageName", e.target.value)
                    }
                    placeholder="Nome do pacote"
                    height={32}
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {editData?.name}
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
                    value={editData?.amountCredits}
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
                    {editData?.amountCredits}
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
                      {editData?.isOffer ? "Sim" : "Não"}
                    </Text>
                    <span
                      onClick={() =>
                        handleInputChange("isOffer", !editData?.isOffer)
                      }
                    >
                      <OnOff onOff={editData?.isOffer} />
                    </span>
                  </div>
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {editData?.isOffer ? "Sim" : "Não"}
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
              Preço base - R$ {(+editData?.basePrice).toFixed(2)}
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
                    value={editData?.basePrice}
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
                    R$ {(+editData?.basePrice).toFixed(2)}
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
                    value={editData?.basePrice}
                    // value={editData.profitMargin}
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
                    {editData?.basePrice}%{/* {editData.profitMargin}% */}
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
                tax={`${1}%`}
                totalCost={values.totalCost}
                profitMargin={values.profitValue}
                // profitMargin={editData.profitMargin}
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
