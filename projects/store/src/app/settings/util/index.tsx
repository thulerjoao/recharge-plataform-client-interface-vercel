"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { connectionAPIPatch } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "contexts/auth";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { apiUrl } from "utils/apiUrl";
import { SettingsContainer } from "./style";

interface FormData {
  name: string;
  email: string;
  phone: string;
  documentType: "cpf" | "cnpj";
  documentValue: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  documentValue?: string;
  password?: string;
  confirmPassword?: string;
}

const Settings = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    documentType: "cpf",
    documentValue: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [securityData, setSecurityData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState({
    personal: false,
    email: false,
    document: false,
    security: false,
  });
  const [isEditing, setIsEditing] = useState({
    personal: false,
    email: false,
    document: false,
    security: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        documentType: user.documentType || "cpf",
        documentValue: user.documentValue || "",
      });
    }
  }, [user]);

  const validateForm = (
    section: "personal" | "email" | "document" | "security",
  ): boolean => {
    const newErrors: FormErrors = {};

    if (section === "personal") {
      if (!formData.name.trim()) {
        newErrors.name = "Nome é obrigatório";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Telefone é obrigatório";
      }
    }

    if (section === "email") {
      if (!formData.email.trim()) {
        newErrors.email = "Email é obrigatório";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email inválido";
      }
    }

    if (section === "document") {
      if (!formData.documentValue.trim()) {
        newErrors.documentValue = "Documento é obrigatório";
      } else if (
        formData.documentType === "cpf" &&
        !/^\d{11}$/.test(formData.documentValue.replace(/\D/g, ""))
      ) {
        newErrors.documentValue = "CPF inválido";
      } else if (
        formData.documentType === "cnpj" &&
        !/^\d{14}$/.test(formData.documentValue.replace(/\D/g, ""))
      ) {
        newErrors.documentValue = "CNPJ inválido";
      }
    }

    if (section === "security") {
      if (securityData.password && securityData.password.length < 8) {
        newErrors.password = "Mínimo 8 caracteres";
      }
      if (securityData.password !== securityData.confirmPassword) {
        newErrors.confirmPassword = "Senhas não conferem";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmitSection =
    (section: "personal" | "email" | "document" | "security") =>
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm(section)) return;

      setIsLoading((prev) => ({ ...prev, [section]: true }));
      try {
        // TODO: Implementar chamada da API para atualizar dados por seção
        if (section === "personal") {
          connectionAPIPatch(
            `/user/${user.id}`,
            {
              name: formData.name,
              phone: formData.phone,
            },
            apiUrl,
          )
            .then((res) => {
              console.log(res);
              setUser(res);
              alert("Informações atualizadas com sucesso");
            })
            .catch((res) => {
              setFormData((prev) => ({
                ...prev,
                name: user.name || "",
                phone: user.phone || "",
              }));
              alert("Erro ao atualizar informações");
            });
        }
        if (section === "email") {
          console.log("Atualizar email:", {
            email: formData.email,
          });
        }
        if (section === "document") {
          console.log("Atualizar documento:", {
            documentType: formData.documentType,
            documentValue: formData.documentValue,
          });
        }
        if (section === "security") {
          console.log("Atualizar senha:", { password: securityData.password });
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsEditing((prev) => ({ ...prev, [section]: false }));
        if (section === "security") {
          setSecurityData({ password: "", confirmPassword: "" });
        }
      } catch (error) {
        console.error(`Erro ao atualizar ${section}:`, error);
      } finally {
        setIsLoading((prev) => ({ ...prev, [section]: false }));
      }
    };

  const handleCancel = (
    section: "personal" | "email" | "document" | "security",
  ) => {
    if (section === "personal" && user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        phone: user.phone || "",
      }));
    }
    if (section === "email" && user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
      }));
    }
    if (section === "document" && user) {
      setFormData((prev) => ({
        ...prev,
        documentType: user.documentType || "cpf",
        documentValue: user.documentValue || "",
      }));
    }
    if (section === "security") {
      setSecurityData({ password: "", confirmPassword: "" });
    }
    setErrors((prev) => ({
      ...prev,
      name: undefined,
      email: undefined,
      phone: undefined,
      documentValue: undefined,
      password: undefined,
      confirmPassword: undefined,
    }));
    setIsEditing((prev) => ({ ...prev, [section]: false }));
  };

  const startEditing = (
    section: "personal" | "email" | "document" | "security",
  ) => {
    const sections: Array<"personal" | "email" | "document" | "security"> = [
      "personal",
      "email",
      "document",
      "security",
    ];
    sections.forEach((s) => {
      if (s !== section && isEditing[s]) {
        handleCancel(s);
      }
    });
    setIsEditing((prev) => ({ ...prev, [section]: true }));
  };

  const formatDocument = (value: string, type: "cpf" | "cnpj") => {
    const numbers = value.replace(/\D/g, "");
    let limited: string;
    if (type === "cpf") {
      limited = numbers.slice(0, 11);
    } else {
      limited = numbers.slice(0, 14);
    }
    if (type === "cpf") {
      return limited.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return limited.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5",
    );
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  if (!user) {
    return (
      <SettingsContainer>
        <Text fontName="SMALL">Carregando...</Text>
      </SettingsContainer>
    );
  }

  return (
    <SettingsContainer>
      <div className="settings-header">
        <Text fontName="LARGE_SEMI_BOLD">Configurações</Text>
        <Text fontName="SMALL" color="secondary">
          Gerencie suas informações pessoais e preferências
        </Text>
      </div>

      <div className="settings-form">
        {/* Seção: Informações Pessoais */}
        <div className="form-section">
          <Text fontName="REGULAR_SEMI_BOLD" className="section-title">
            Informações Pessoais
          </Text>

          <form onSubmit={handleSubmitSection("personal")}>
            <div className="input-group">
              <label htmlFor="name">Nome completo</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={!isEditing.personal}
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="phone">Telefone</label>
              <InputMask
                mask="(99) 99999-9999"
                maskChar=""
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing.personal}
              >
                {(inputProps: React.ComponentPropsWithoutRef<"input">) => (
                  <input
                    {...inputProps}
                    id="phone"
                    type="tel"
                    className={errors.phone ? "error" : ""}
                    placeholder="(11) 99999-9999"
                    disabled={!isEditing.personal}
                    tabIndex={isEditing.personal ? 0 : -1}
                  />
                )}
              </InputMask>
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            <div className="form-actions">
              {!isEditing.personal ? (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    startEditing("personal");
                  }}
                  title="Editar informações"
                  width={200}
                  height={32}
                  rounded
                />
              ) : (
                <div className="action-buttons">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleCancel("personal");
                    }}
                    title="Cancelar"
                    width={120}
                    height={32}
                    rounded
                  />
                  <Button
                    type="submit"
                    title={isLoading.personal ? "Salvando..." : "Salvar"}
                    width={120}
                    height={32}
                    rounded
                    disabled={isLoading.personal}
                  />
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Seção: Documento */}
        <div className="form-section">
          <Text fontName="REGULAR_SEMI_BOLD" className="section-title">
            Documento
          </Text>

          <form onSubmit={handleSubmitSection("document")}>
            <div className="input-group">
              <label htmlFor="documentType">Tipo de documento</label>
              <select
                id="documentType"
                value={formData.documentType}
                onChange={(e) =>
                  handleInputChange(
                    "documentType",
                    e.target.value as "cpf" | "cnpj",
                  )
                }
                disabled={!isEditing.document}
              >
                <option value="cpf">CPF</option>
                <option value="cnpj">CNPJ</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="documentValue">
                {formData.documentType === "cpf" ? "CPF" : "CNPJ"}
              </label>
              <InputMask
                mask={
                  formData.documentType === "cpf"
                    ? "999.999.999-99"
                    : "99.999.999/9999-99"
                }
                maskChar=""
                value={formData.documentValue}
                onChange={(e) =>
                  handleInputChange("documentValue", e.target.value)
                }
                disabled={!isEditing.document}
              >
                {(inputProps: React.ComponentPropsWithoutRef<"input">) => (
                  <input
                    {...inputProps}
                    id="documentValue"
                    type="text"
                    className={errors.documentValue ? "error" : ""}
                    placeholder={
                      formData.documentType === "cpf"
                        ? "000.000.000-00"
                        : "00.000.000/0000-00"
                    }
                    disabled={!isEditing.document}
                    tabIndex={isEditing.document ? 0 : -1}
                  />
                )}
              </InputMask>
              {errors.documentValue && (
                <span className="error-message">{errors.documentValue}</span>
              )}
            </div>

            {/* <div className="form-actions">
              {!isEditing.document ? (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    startEditing("document");
                  }}
                  title="Editar informações"
                  width={200}
                  height={32}
                  disabled
                  isNotSelected
                  rounded
                />
              ) : (
                <div className="action-buttons">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleCancel("document");
                    }}
                    title="Cancelar"
                    width={120}
                    height={32}
                    rounded
                  />
                  <Button
                    type="submit"
                    title={isLoading.document ? "Salvando..." : "Salvar"}
                    width={120}
                    height={32}
                    disabled={isLoading.document}
                    rounded
                  />
                </div>
              )}
            </div> */}
          </form>
        </div>

        {/* Seção: Email */}
        <div className="form-section">
          <Text fontName="REGULAR_SEMI_BOLD" className="section-title">
            Contato
          </Text>

          <form onSubmit={handleSubmitSection("email")}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing.email}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-actions">
              {!isEditing.email ? (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    startEditing("email");
                  }}
                  title="Editar informações"
                  width={200}
                  height={32}
                  rounded
                />
              ) : (
                <div className="action-buttons">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleCancel("email");
                    }}
                    title="Cancelar"
                    width={120}
                    height={32}
                    rounded
                  />
                  <Button
                    type="submit"
                    title={isLoading.email ? "Salvando..." : "Salvar"}
                    width={120}
                    height={32}
                    rounded
                    disabled={isLoading.email}
                  />
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Seção: Segurança */}
        <div className="form-section">
          <Text fontName="REGULAR_SEMI_BOLD" className="section-title">
            Segurança
          </Text>

          <form onSubmit={handleSubmitSection("security")}>
            <div className="input-group">
              <label htmlFor="password">Nova senha</label>
              <input
                id="password"
                type="password"
                placeholder="Deixe em branco para manter a atual"
                disabled={!isEditing.security}
                value={securityData.password}
                onChange={(e) =>
                  setSecurityData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className={errors.password ? "error" : ""}
              />
              <Text fontName="SMALL" color="secondary">
                Mínimo 8 caracteres
              </Text>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmar nova senha</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirme a nova senha"
                disabled={!isEditing.security}
                value={securityData.confirmPassword}
                onChange={(e) =>
                  setSecurityData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="form-actions">
              {!isEditing.security ? (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    startEditing("security");
                  }}
                  title="Editar informações"
                  width={200}
                  height={32}
                  rounded
                />
              ) : (
                <div className="action-buttons">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleCancel("security");
                    }}
                    title="Cancelar"
                    width={120}
                    height={32}
                    rounded
                  />
                  <Button
                    type="submit"
                    title={isLoading.security ? "Salvando..." : "Salvar"}
                    width={120}
                    height={32}
                    rounded
                    disabled={isLoading.security}
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </SettingsContainer>
  );
};

export default Settings;
