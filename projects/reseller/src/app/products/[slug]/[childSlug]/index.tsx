"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import OnOff from "@4miga/design-system/components/onOff";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import {
  connectionAPIDelete,
  connectionAPIGet,
  connectionAPIPatch,
  connectionAPIPost,
} from "@4miga/services/connectionAPI/connection";
import { apiUrl } from "@4miga/services/connectionAPI/url";
import LoadingPage from "app/loading";
import { useAuth } from "context/auth";
import { useProducts } from "context/products";
import { useRouter } from "next/navigation";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useEffect, useState } from "react";
import { PackageType, ProductType } from "types/productTypes";
import { formatNumber } from "utils/formatNumber";
import {
  PackageFormErrors,
  validatePackageForm,
} from "utils/packageValidation";
import { ConfigPackagePage } from "./style";
import PackageCardCompact from "public/cards/packageCardCompact/card";

type Props = {
  slug: string;
  childSlug: string;
};

const SecondaryProductPage = ({ slug, childSlug }: Props) => {
  const router = useRouter();

  const isCreatingNewPackage = childSlug === "novo_pacote";

  const DEFAULT_CARD_IMAGE_URL = "";

  const [isEditing, setIsEditing] = useState<boolean>(isCreatingNewPackage);
  const [loading, setLoading] = useState<boolean>(true);
  const [packageData, setPackageData] = useState<PackageType>();
  const [editData, setEditData] = useState<PackageType>();
  const [errors, setErrors] = useState<PackageFormErrors>({});
  const { products, productPackages, setProductPackages, fetchProducts } =
    useProducts();
  const [index, setIndex] = useState<number>();
  const { store } = useAuth();

  const generatePackageName = (amountCredits: number | null): string => {
    if (!amountCredits) return "Bigo =0";
    return `Bigo =${amountCredits}`;
  };

  const getDefaultPackageData = (): PackageType => ({
    name: generatePackageName(null),
    amountCredits: null,
    imgCardUrl: DEFAULT_CARD_IMAGE_URL,
    isActive: true,
    isOffer: false,
    basePrice: null,
    productId: slug,
    paymentMethods: [
      {
        name: "pix",
        price: null,
      },
    ],
  });

  const prepareDataForApi = () => {
    return {
      ...editData,
      name: generatePackageName(editData?.amountCredits),
      imgCardUrl: DEFAULT_CARD_IMAGE_URL,
      basePrice: parseFloat(editData?.basePrice?.toString()) || 0,
      paymentMethods:
        editData?.paymentMethods?.map((method, index) =>
          index === 0
            ? {
                ...method,
                price: parseFloat(method.price.toString()) || 0,
              }
            : method,
        ) || [],
    };
  };

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({});
  };

  const handleDelete = () => {
    setLoading(true);
    confirm(`Deseja excluir o pacote ${packageData?.name}?`)
      ? connectionAPIDelete(`/package/${packageData?.id}`, apiUrl)
          .then(() => {
            fetchProducts(store.id);
            router.back();
          })
          .catch((err) => {
            console.error(err);
            alert("Erro ao excluir pacote");
          })
          .finally(() => {
            setLoading(false);
          })
      : setLoading(false);
  };

  const handleCancel = () => {
    setLoading(true);
    setErrors({});
    if (isCreatingNewPackage) {
      router.back();
    } else {
      setIsEditing(false);
      setEditData(packageData);
    }
    setLoading(false);
  };

  const validateForm = () => {
    const { isValid, errors: validationErrors } = validatePackageForm({
      name: generatePackageName(editData?.amountCredits),
      amountCredits: editData?.amountCredits,
      basePrice: editData?.basePrice?.toString(),
      profitMargin: editData?.paymentMethods?.[0]?.price,
    });

    if (!isValid) {
      setErrors(validationErrors);
      setLoading(false);
      return false;
    }
    return true;
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
    } else if (field === "paymentMethods[0].price") {
      const numericValue = value === "" ? 0 : (value as number);
      setEditData((prev) => ({
        ...prev,
        basePrice: numericValue,
        paymentMethods:
          prev?.paymentMethods?.map((method, index) =>
            index === 0 ? { ...method, price: numericValue } : method,
          ) || [],
      }));
    } else if (field === "amountCredits") {
      const creditsValue = value === "" ? null : (value as number);
      setEditData((prev) => ({
        ...prev,
        amountCredits: creditsValue,
        name: generatePackageName(creditsValue),
      }));
    } else {
      setEditData((prev) => ({ ...prev, [field]: value }));
    }
    if (field === "paymentMethods[0].price" && errors.basePrice) {
      setErrors((prev) => ({ ...prev, basePrice: undefined }));
    } else if (field === "amountCredits" && errors.amountCredits) {
      setErrors((prev) => ({ ...prev, amountCredits: undefined }));
    } else if (errors[field as keyof PackageFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

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

  const handleCreate = async () => {
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const dataToSend = prepareDataForApi();

    try {
      await connectionAPIPost<PackageType>(`/package`, dataToSend, apiUrl);
      alert("Novo pacote criado com sucesso!");
      fetchProducts(store.id);
      router.back();
    } catch (err) {
      alert("Erro ao criar novo pacote");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    setLoading(true);
    if (!validateForm()) return;
    const dataToSend = prepareDataForApi();
    const hasChanges = Object.keys(dataToSend).some((key) => {
      const dataValue = dataToSend[key];
      const packageValue = packageData?.[key];
      const isDifferent =
        JSON.stringify(dataValue) !== JSON.stringify(packageValue);

      if (isDifferent) {
        console.log(`Diferença encontrada em ${key}:`, {
          dataToSend: dataValue,
          packageData: packageValue,
        });
      }

      return isDifferent;
    });
    if (!hasChanges) {
      handleCancel();
      return;
    }
    const confirmation = confirm("Confirmar alterações?");
    if (!confirmation) handleCancel();
    connectionAPIPatch(`/package/${packageData?.id}`, dataToSend, apiUrl)
      .then((res) => {
        fetchProducts(store.id);
      })
      .catch((err) => {
        alert("Erro ao atualizar pacote");
        handleCancel();
      })
      .finally(() => {
        setLoading(false);
      });

    if (packageData === editData) {
      handleCancel();
      return;
    }
    setIsEditing(false);
    setLoading(false);
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

  if (!productPackages) {
    return <LoadingPage />;
  }

  return (
    <ConfigPackagePage>
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
                {editData && (
                  <div className="cardEnviroment">
                    <PackageCardCompact item={editData} selected={true} />
                  </div>
                )}
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
              {/* <div className="infoItem">
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
              </div> */}
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
                      <OnOff onOff={editData?.isActive ?? true} />
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
                    value={`R$ ${editData?.paymentMethods[0]?.price || ""}`}
                    onChange={(e) => {
                      const value = e.target.value;
                      const cleanValue = value.replace(/[^0-9.,]/g, "");
                      const dotCount = (cleanValue.match(/\./g) || []).length;
                      const commaCount = (cleanValue.match(/,/g) || []).length;
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

                        handleInputChange(
                          "paymentMethods[0].price",
                          normalizedValue,
                        );
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
            </div>
            {/* 
            <div className="sectionDivider" />

            <div className="sectionTitle">
              <Text
                fontName="REGULAR_MEDIUM"
                color={Theme.colors.mainHighlight}
              >
                MEIOS DE PAGAMENTO
              </Text>
            </div>
            <div className="paymentMethodsSection">
              <PixConfiguration totalCost={editData?.basePrice} />
            </div> */}
            <div className="actionsSection">
              {isEditing ? (
                <>
                  <Button
                    title="CANCELAR"
                    onClick={handleCancel}
                    width={120}
                    height={36}
                    rounded
                    loading={loading}
                  />
                  <Button
                    title={isCreatingNewPackage ? "CRIAR" : "SALVAR"}
                    onClick={() => {
                      if (isCreatingNewPackage) {
                        handleCreate();
                      } else {
                        handleUpdate();
                      }
                    }}
                    width={120}
                    height={36}
                    rounded
                    loading={loading}
                  />
                </>
              ) : (
                <>
                  <Button
                    title="EDITAR"
                    onClick={handleEdit}
                    width={120}
                    height={36}
                    rounded
                    loading={loading}
                  />
                  <Button
                    title="EXCLUIR"
                    onClick={handleDelete}
                    width={120}
                    height={36}
                    rounded
                    loading={loading}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ConfigPackagePage>
  );
};

export default SecondaryProductPage;
