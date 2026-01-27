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
    if (!amountCredits) return "Bigo 0 diamantes";
    return `Bigo ${amountCredits} diamantes`;
  };

  const getDefaultPackageData = (): PackageType => ({
    name: generatePackageName(null),
    amountCredits: null,
    imgCardUrl: productPackages?.imgCardUrl || "",
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
    if (!editData) {
      throw new Error("Dados de edição não disponíveis");
    }
    return {
      ...editData,
      name: generatePackageName(editData?.amountCredits),
      imgCardUrl: productPackages?.imgCardUrl || editData?.imgCardUrl || "",
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
    if (!packageData?.id) {
      alert("Erro: ID do pacote não encontrado");
      return;
    }
    setLoading(true);
    confirm(`Deseja excluir o pacote ${packageData?.name}?`)
      ? connectionAPIDelete(`/package/${packageData.id}`, apiUrl)
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
    setErrors({});
    if (isCreatingNewPackage) {
      router.back();
    } else {
      setIsEditing(false);
      setEditData(packageData);
    }
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
    const foundIndex = param.findIndex(
      (packag: PackageType) => packag.id === id,
    );
    setIndex(foundIndex >= 0 ? foundIndex : 0);
  };

  const handleNextPackage = () => {
    if (
      typeof index !== "number" ||
      !productPackages?.packages ||
      index >= productPackages.packages.length - 1
    ) {
      return;
    }
    const nextIndex = index + 1;
    const newPackage = productPackages.packages[nextIndex];
    if (newPackage) {
      setIsEditing(false);
      setErrors({});
      setIndex(nextIndex);
      setEditData(newPackage);
      setPackageData(newPackage);
    }
  };

  const handlePreviousPackage = () => {
    if (typeof index !== "number" || !productPackages?.packages || index <= 0) {
      return;
    }
    const prevIndex = index - 1;
    const newPackage = productPackages.packages[prevIndex];
    if (newPackage) {
      setIsEditing(false);
      setErrors({});
      setIndex(prevIndex);
      setEditData(newPackage);
      setPackageData(newPackage);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const dataToSend = prepareDataForApi();
      await connectionAPIPost<PackageType>(`/package`, dataToSend, apiUrl);
      alert("Novo pacote criado com sucesso!");
      fetchProducts(store.id);
      router.back();
    } catch (err) {
      alert("Erro ao criar novo pacote");
    } finally {
      setLoading(false);
    }
  };

  const hasChanges = (): boolean => {
    if (!editData || !packageData) return false;

    const amountCreditsChanged =
      editData.amountCredits !== packageData.amountCredits;
    const basePriceChanged = editData.basePrice !== packageData.basePrice;
    const isActiveChanged = editData.isActive !== packageData.isActive;
    const isOfferChanged = editData.isOffer !== packageData.isOffer;

    return (
      amountCreditsChanged ||
      basePriceChanged ||
      isActiveChanged ||
      isOfferChanged
    );
  };

  const handleUpdate = () => {
    if (!packageData?.id) {
      alert("Erro: ID do pacote não encontrado");
      return;
    }
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    try {
      const dataToSend = prepareDataForApi();
      const hasChangesDetected = Object.keys(dataToSend).some((key) => {
        const dataValue = dataToSend[key];
        const packageValue = packageData?.[key];
        return JSON.stringify(dataValue) !== JSON.stringify(packageValue);
      });
      if (!hasChangesDetected) {
        handleCancel();
        setLoading(false);
        return;
      }
      const confirmation = confirm("Confirmar alterações?");
      if (!confirmation) {
        handleCancel();
        setLoading(false);
        return;
      }
      const data = {
        name: dataToSend.name,
        amountCredits: dataToSend.amountCredits,
        basePrice: dataToSend.basePrice,
        isActive: dataToSend.isActive,
        isOffer: dataToSend.isOffer,
      };
      connectionAPIPatch(`/package/${packageData.id}`, data, apiUrl)
        .then((res) => {
          const updatedPackage: PackageType = {
            ...packageData,
            ...data,
          };
          setPackageData(updatedPackage);
          setEditData(updatedPackage);
          if (productPackages?.packages && typeof index === "number") {
            const packageIndex = productPackages.packages.findIndex(
              (pkg: PackageType) => pkg.id === packageData.id,
            );
            if (packageIndex >= 0) {
              setIndex(packageIndex);
            }
          }
          fetchProducts(store.id);
          setIsEditing(false);
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao atualizar pacote");
          handleCancel();
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.error(err);
      alert("Erro ao preparar dados para atualização");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isCreatingNewPackage) {
      const defaultData: PackageType = {
        name: generatePackageName(null),
        amountCredits: null,
        imgCardUrl: productPackages?.imgCardUrl || "",
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
      };
      setEditData(defaultData);
      setPackageData(defaultData);
      setLoading(false);
    } else {
      const packageId = childSlug;
      const currentPackageId = packageData?.id || editData?.id;

      if (
        typeof index === "number" &&
        currentPackageId &&
        currentPackageId !== packageId &&
        productPackages?.packages
      ) {
        const currentPackage = productPackages.packages.find(
          (pkg: PackageType) => pkg.id === currentPackageId,
        );
        if (currentPackage) {
          setPackageData(currentPackage);
          setEditData(currentPackage);
          handleIndex(productPackages.packages, currentPackageId);
          setLoading(false);
          return;
        }
      }

      const localPackage = productPackages?.packages.find(
        (packag: PackageType) => packag.id === packageId,
      );
      if (localPackage) {
        setEditData(localPackage);
        setPackageData(localPackage);
        setLoading(false);
        handleIndex(productPackages.packages, packageId);
      } else {
        connectionAPIGet<ProductType>(`/product/${slug}`, apiUrl)
          .then((res) => {
            setProductPackages(res);
            const localPackage = res.packages.find(
              (packag: PackageType) => packag.id === packageId,
            );
            if (localPackage) {
              setPackageData(localPackage);
              setEditData(localPackage);
              handleIndex(res.packages, packageId);
            }
          })
          .catch((err) => {
            console.error(err);
            alert("Erro ao carregar pacote");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    products,
    childSlug,
    isCreatingNewPackage,
    slug,
    productPackages?.imgCardUrl,
    productPackages?.packages,
    setProductPackages,
  ]);

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
                    disabled={!isCreatingNewPackage && !hasChanges()}
                    isNotSelected={!isCreatingNewPackage && !hasChanges()}
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
