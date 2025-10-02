import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import OnOff from "@4miga/design-system/components/onOff";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIGet } from "@4miga/services/connectionAPI/connection";
import LoadingPage from "app/loading";
import { useAuth } from "context/auth";
import { useProducts } from "context/products";
import { useImageUpload } from "hooks/useImageUpload";
import { useRouter } from "next/navigation";
import PackageCard from "public/cards/packageCard/card";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useState } from "react";
import { PackageType, ProductType } from "types/productTypes";
import { apiUrl } from "utils/apiUrl";
import { formatNumber } from "utils/formatNumber";
import {
  PackageFormErrors,
  validatePackageForm,
} from "utils/packageValidation";
import CameraIcon from "../../common/icons/CameraIcon.svg";
import PixConfiguration from "./common/pixCard/pixConfiguration";
import { ConfigPackagePage } from "./style";

type Props = {
  slug: string;
  childSlug: string;
};

const SecondaryProductPage = ({ slug, childSlug }: Props) => {
  const router = useRouter();
  // const [confirmModal, setconfirmModal] = useState<boolean>(false);

  // Detectar se é modo de criação de novo pacote
  const isCreatingNewPackage = childSlug === "novo_pacote";

  const [isEditing, setIsEditing] = useState<boolean>(isCreatingNewPackage);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [packageData, setPackageData] = useState<PackageType>();
  const [editData, setEditData] = useState<PackageType>();
  const [errors, setErrors] = useState<PackageFormErrors>({});
  const { products, productPackages, setProductPackages, fetchProducts } =
    useProducts();
  const [index, setIndex] = useState<number>();
  const [updateAllPackages, setUpdateAllPackages] = useState<boolean>(false);
  const { store } = useAuth();

  // Dados padrão para novo pacote
  const getDefaultPackageData = (): PackageType => ({
    id: "temp-new-package",
    name: "",
    amountCredits: null,
    basePrice: null,
    isActive: true,
    isOffer: false,
    imgCardUrl: products.find((product: ProductType) => product.id === slug)
      .packages[0].imgCardUrl,
    storeId: store.id,
    paymentMethods: [
      {
        name: "pix",
        price: 0,
      },
    ],
  });

  const imageUpload = useImageUpload({
    endpoint: isCreatingNewPackage
      ? `/product/${slug}/packages/temp/images/card`
      : `/package/${packageData?.id}/images/card?updateAllPackages=${updateAllPackages}`,
    onSuccess: (url) => {
      setEditData((prev) => ({ ...prev, imgCardUrl: url }));
      if (!isCreatingNewPackage) {
        fetchProducts(store.id);
        setUpdateAllPackages(false);
      }
    },
    onError: (error) => {
      console.error("Card upload error:", error);
      alert("Error uploading card image. Please try again.");
      if (!isCreatingNewPackage) {
        setUpdateAllPackages(false);
      }
    },
  });

  const handleSaveImage = async () => {
    setLoadingImage(true);
    if (!imageUpload.hasChanges) return;
    if (updateAllPackages) {
      if (confirm("Deseja atualizar TODOS os pacotes?")) {
        await imageUpload.handleSave();
        setLoadingImage(false);
      } else {
        setLoadingImage(false);
        return;
      }
    } else {
      await imageUpload.handleSave();
      setLoadingImage(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({});
  };

  const handleCancel = () => {
    imageUpload.clearSelection();
    setErrors({});
    if (isCreatingNewPackage) {
      // No modo de criação, voltar para a página anterior
      router.back();
    } else {
      // No modo de edição, voltar aos dados originais
      setIsEditing(false);
      setEditData(packageData);
      setUpdateAllPackages(false);
    }
  };

  const handleSave = () => {
    // Validação para ambos os casos (criação e edição)
    const { isValid, errors: validationErrors } = validatePackageForm({
      name: editData?.name,
      amountCredits: editData?.amountCredits,
      basePrice: editData?.basePrice,
      profitMargin: editData?.paymentMethods?.[0]?.price,
    });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    if (isCreatingNewPackage) {
      // Lógica para criação de novo pacote
      // Aqui você pode implementar a chamada para a API de criação
      // Por exemplo: connectionAPIPost(`/product/${slug}/packages`, editData, apiUrl)
      console.log("Criando novo pacote:", editData);
      alert("Novo pacote criado com sucesso!");
      router.back();
    } else {
      // Lógica para edição de pacote existente
      if (packageData === editData) {
        handleCancel();
        return;
      }
      setIsEditing(false);
      // setconfirmModal(true);
    }
  };

  const handleInputChange = (
    field: string,
    value: string | number | boolean,
  ) => {
    if (field === "profitMargin") {
      setEditData((prev) => ({
        ...prev,
        paymentMethods:
          prev?.paymentMethods?.map((method, index) =>
            index === 0
              ? { ...method, price: value === "" ? 0 : (value as number) }
              : method,
          ) || [],
      }));
    } else {
      setEditData((prev) => ({ ...prev, [field]: value }));
    }
    if (errors[field as keyof PackageFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
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

  const handleNextPackage = () => {
    handleCancel();
    setIndex(index + 1);
    const newPackage = productPackages?.packages[index + 1];
    setEditData(newPackage);
    setPackageData(newPackage);
  };

  const handlePreviousPackage = () => {
    handleCancel();
    setIndex(index - 1);
    const newPackage = productPackages?.packages[index - 1];
    setEditData(newPackage);
    setPackageData(newPackage);
  };

  useEffect(() => {
    if (isCreatingNewPackage) {
      const defaultData = getDefaultPackageData();
      setEditData(defaultData);
      setPackageData(defaultData);
      setLoading(false);
    } else {
      // Lógica original para edição de pacote existente
      const packageId = editData?.id || childSlug;
      const localPackage = productPackages?.packages.find(
        (packag: PackageType) => packag.id === packageId,
      );
      if (localPackage) {
        setEditData(localPackage);
        setPackageData(localPackage);
        setLoading(false);
        handleIndex(productPackages?.packages, packageId);
      } else {
        connectionAPIGet<ProductType>(`/product/${slug}`, apiUrl)
          .then((res) => {
            setProductPackages(res);
            const localPackage = res.packages.find(
              (packag: PackageType) => packag.id === packageId,
            );
            setPackageData(localPackage);
            setEditData(localPackage);
            handleIndex(res.packages, packageId);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, childSlug, isCreatingNewPackage]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <ConfigPackagePage>
      {/* {confirmModal && <ConfirmModal setconfirmModal={setconfirmModal} />} */}
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader
            backWard
            title={
              isCreatingNewPackage ? "CRIAR NOVO PACOTE" : "CONFIGURAR PACOTE"
            }
          />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          {isCreatingNewPackage ? "CRIAR PACOTE" : "CONFIG PACOTE"}
        </Text>
      </div>
      <div className="mainContentPackage">
        <div className="headerSection">
          <div className="packageInfo">
            <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
              {isCreatingNewPackage ? "Novo Pacote" : editData?.name}
            </Text>
            <Text fontName="REGULAR_MEDIUM" color={Theme.colors.mainHighlight}>
              {formatNumber(editData?.amountCredits)} créditos
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
                {!isCreatingNewPackage && (
                  <>
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
                  </>
                )}
                <div className="cardEnviroment">
                  <PackageCard
                    bestOffer={editData?.isOffer}
                    title={
                      editData?.name || (isCreatingNewPackage ? "Título" : "")
                    }
                    imageUrl={imageUpload.previewUrl || editData?.imgCardUrl}
                    price={+editData?.basePrice}
                  />
                </div>
                {!isCreatingNewPackage && (
                  <>
                    {index !== productPackages?.packages.length - 1 ? (
                      <button
                        onClick={handleNextPackage}
                        className="navArrow rightArrow"
                        title="Próximo pacote"
                        disabled={
                          index === productPackages?.packages.length - 1
                        }
                      >
                        →
                      </button>
                    ) : (
                      <div className="disabled" />
                    )}
                  </>
                )}
              </div>
              <Button
                loading={loadingImage}
                leftElement={
                  (!imageUpload.previewUrl || isCreatingNewPackage) && (
                    <CameraIcon />
                  )
                }
                onClick={
                  !imageUpload.previewUrl || isCreatingNewPackage
                    ? imageUpload.handleButtonClick
                    : handleSaveImage
                }
                height={32}
                width={180}
                color={Theme.colors.mainlight}
                title={
                  !imageUpload.previewUrl || isCreatingNewPackage
                    ? "Atualizar imagem"
                    : "Salvar imagem"
                }
              />
              <input
                ref={imageUpload.fileInputRef}
                type="file"
                accept="image/png,image/jpg,image/jpeg"
                style={{ display: "none" }}
                onChange={imageUpload.handleFileSelect}
              />
              {imageUpload.previewUrl && !isCreatingNewPackage && (
                <div className="checkboxContainer">
                  <input
                    type="checkbox"
                    id="updateAllPackages"
                    checked={updateAllPackages}
                    onChange={(e) => setUpdateAllPackages(e.target.checked)}
                  />
                  <label htmlFor="updateAllPackages">
                    <Text
                      fontName="TINY_MEDIUM"
                      color={Theme.colors.secondaryText}
                    >
                      Aplicar para todos os pacotes
                    </Text>
                  </label>
                </div>
              )}
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
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 70) {
                        handleInputChange("name", value);
                      }
                    }}
                    placeholder="Nome do pacote"
                    height={32}
                    maxLength={70}
                    className={errors.name ? "error" : ""}
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {editData?.name}
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
                  Quantidade de créditos:
                </Text>
                {isEditing ? (
                  <Input
                    value={formatNumber(editData?.amountCredits) || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Remove caracteres não numéricos e limita a 14 caracteres
                      const numericValue = value
                        .replace(/\D/g, "")
                        .slice(0, 14);
                      handleInputChange(
                        "amountCredits",
                        numericValue === "" ? "" : parseInt(numericValue) || 0,
                      );
                    }}
                    placeholder="Quantidade de créditos (máx. 14 dígitos)"
                    height={32}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className={errors.amountCredits ? "error" : ""}
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {editData?.amountCredits}
                  </Text>
                )}
                {isEditing && errors.amountCredits && (
                  <span className="error-message">{errors.amountCredits}</span>
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
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Alterar status do pacote:
                </Text>
                {isEditing ? (
                  <div className="toggleContainer">
                    <Text
                      fontName="SMALL_MEDIUM"
                      color={Theme.colors.mainlight}
                    >
                      {editData?.isActive ? "Ativo" : "Inativo"}
                    </Text>
                    <span
                      onClick={() =>
                        handleInputChange("isActive", !editData?.isActive)
                      }
                    >
                      <OnOff onOff={editData?.isActive} />
                    </span>
                  </div>
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {editData?.isActive ? "Ativo" : "Inativo"}
                  </Text>
                )}
              </div>
            </div>
            <div className="sectionDivider" />
            <div className="sectionTitle">
              <Text
                fontName="REGULAR_MEDIUM"
                color={Theme.colors.mainHighlight}
              >
                CONFIGURAÇÕES DE PREÇO
              </Text>
            </div>
            {/* <Text fontName="REGULAR">
              Preço base - R$ {(+editData?.basePrice).toFixed(2)}
            </Text> */}
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
                    value={`R$ ${editData?.basePrice || ""}`}
                    onChange={(e) => {
                      const value = e.target.value;
                      const cleanValue = value.replace(/[^0-9.,]/g, "");
                      const dotCount = (cleanValue.match(/\./g) || []).length;
                      const commaCount = (cleanValue.match(/,/g) || []).length;

                      // Permite apenas um separador decimal (ponto ou vírgula)
                      if (
                        dotCount <= 1 &&
                        commaCount <= 1 &&
                        dotCount + commaCount <= 1
                      ) {
                        // Se tem vírgula, converte para ponto
                        let normalizedValue = cleanValue.replace(",", ".");

                        // Se tem ponto, limita a 2 casas decimais
                        if (normalizedValue.includes(".")) {
                          const [integer, decimal] = normalizedValue.split(".");
                          const limitedDecimal = decimal
                            ? decimal.slice(0, 2)
                            : "";
                          normalizedValue = `${integer}.${limitedDecimal}`;
                        }

                        handleInputChange("basePrice", normalizedValue);
                      }
                    }}
                    placeholder="Custo base (ex: 10,50 ou 10.50)"
                    height={32}
                    type="text"
                    inputMode="decimal"
                    className={errors.basePrice ? "error" : ""}
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    R$ {(+editData?.basePrice).toFixed(2)}
                  </Text>
                )}
                {isEditing && errors.basePrice && (
                  <span className="error-message">{errors.basePrice}</span>
                )}
              </div>
              <div className="infoItem">
                <Text
                  fontName="SMALL_MEDIUM"
                  color={Theme.colors.secondaryText}
                >
                  Margem de lucro:
                </Text>
                <Text margin="4px 0 0 4px" fontName="REGULAR_MEDIUM">
                  {editData?.paymentMethods?.[0]?.price} %
                </Text>
                {/* {isEditing ? (
                  <Input
                    disabled
                    value={editData?.paymentMethods?.[0]?.price || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "profitMargin",
                        e.target.value === ""
                          ? ""
                          : parseInt(e.target.value) || 0,
                      )
                    }
                    placeholder="Margem de lucro"
                    height={32}
                    type="number"
                    className={errors.profitMargin ? "error" : ""}
                  />
                ) : (
                  <Text fontName="SMALL_MEDIUM" color={Theme.colors.mainlight}>
                    {editData?.paymentMethods?.[0]?.price || 0}%
                  </Text>
                )}
                {isEditing && errors.profitMargin && (
                  <span className="error-message">{errors.profitMargin}</span>
                )} */}
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
              <PixConfiguration tax={1} totalCost={values.totalCost} />
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
                    title={isCreatingNewPackage ? "CRIAR" : "SALVAR"}
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
