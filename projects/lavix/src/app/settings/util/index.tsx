"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import {
  connectionAPIPatch,
  connectionAPIPost,
} from "@4miga/services/connectionAPI/connection";
import { apiUrl } from "@4miga/services/connectionAPI/url";
import { useAuth } from "contexts/auth";
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";
import EyeOff from "../../../public/icons/EyeOff.svg";
import EyeOn from "../../../public/icons/EyeOn.svg";
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
  oldPassword?: string;
  emailCode?: string;
}

const Settings = () => {
  const theme = useTheme();
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
    oldPassword: "",
    password: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
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

  const [emailVerification, setEmailVerification] = useState({
    requested: false,
    code: "",
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
        newErrors.name = "Insira um nome válido";
      } else if (!/^\S+\s+\S+/.test(formData.name.trim())) {
        newErrors.name = "Nome completo obrigatório";
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
      if (emailVerification.requested) {
        const onlyDigits = emailVerification.code.replace(/\D/g, "");
        if (onlyDigits.length !== 6) {
          newErrors.emailCode = "Código deve ter 6 dígitos";
        }
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
      const isUpdatingPassword = securityData.password.trim().length > 0;

      if (isUpdatingPassword) {
        if (!securityData.oldPassword.trim()) {
          newErrors.oldPassword = "Informe sua senha atual";
        }
        if (securityData.password.length < 6) {
          newErrors.password = "A senha deve ter no mínimo 6 caracteres";
        }
        // else if (!/[A-Z]/.test(securityData.password)) {
        //   newErrors.password =
        //     "A senha deve conter ao menos uma letra maiúscula";
        // } else if (!/[a-z]/.test(securityData.password)) {
        //   newErrors.password =
        //     "A senha deve conter ao menos uma letra minúscula";
        // } else if (!/[^a-zA-Z0-9]/.test(securityData.password)) {
        //   newErrors.password =
        //     "A senha deve conter ao menos um caractere especial";
        // }
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
      // Evitar requisições desnecessárias
      if (section === "personal") {
        const sameName = (user?.name || "") === formData.name;
        const samePhone = (user?.phone || "") === formData.phone;
        if (sameName && samePhone) {
          setIsEditing((prev) => ({ ...prev, personal: false }));
          return;
        }
      }

      if (section === "email") {
        const sameEmail = (user?.email || "") === formData.email;
        if (!emailVerification.requested && sameEmail) {
          setIsEditing((prev) => ({ ...prev, email: false }));
          return;
        }
        if (emailVerification.requested && sameEmail) {
          // Não confirmar alteração se o e-mail não mudou
          setEmailVerification({ requested: false, code: "" });
          setIsEditing((prev) => ({ ...prev, email: false }));
          return;
        }
      }

      if (section === "security") {
        const newPassword = securityData.password.trim();
        const oldPassword = securityData.oldPassword.trim();
        if (newPassword.length === 0) {
          setIsEditing((prev) => ({ ...prev, security: false }));
          return;
        }
        if (newPassword === oldPassword) {
          setErrors((prev) => ({
            ...prev,
            password: "A nova senha deve ser diferente da senha atual",
          }));
          return;
        }
      }

      if (!validateForm(section)) return;

      setIsLoading((prev) => ({ ...prev, [section]: true }));
      try {
        // TODO: Implementar chamada da API para atualizar dados por seção
        if (section === "personal") {
          const sameName = (user?.name || "") === formData.name;
          const samePhone = (user?.phone || "") === formData.phone;
          if (sameName && samePhone) {
            setIsEditing((prev) => ({ ...prev, personal: false }));
            return;
          }
          const body = {
            name: formData.name,
            phone: formData.phone,
          };
          await connectionAPIPatch(`/user`, body, apiUrl)
            .then((res) => {
              setUser(res);
              toast.success("Informações atualizadas com sucesso");
            })
            .catch((res) => {
              const errorMessage = res?.response?.data?.message || "";

              if (
                errorMessage.includes("Name must contain at least two words")
              ) {
                setErrors((prev) => ({
                  ...prev,
                  name: "Nome completo obrigatório",
                }));
              } else {
                setFormData((prev) => ({
                  ...prev,
                  name: user.name || "",
                  phone: user.phone || "",
                }));
                toast.error("Erro ao atualizar informações");
              }
            });
        }
        if (section === "email") {
          if (!emailVerification.requested) {
            const sameEmail = (user?.email || "") === formData.email;
            if (sameEmail) {
              setIsEditing((prev) => ({ ...prev, email: false }));
              return;
            }
            // STEP 1
            await connectionAPIPost(
              "/auth/request-email-change",
              { newEmail: formData.email },
              apiUrl,
            )
              .then(() => {
                setIsEditing((prev) => ({ ...prev, email: true }));
                setEmailVerification({ requested: true, code: "" });
                toast.success(
                  "Enviamos um código de confirmação para seu novo e-mail",
                );
              })
              .catch((err) => {
                if (
                  err.response.data.message === "New email is already in use"
                ) {
                  toast.error("Email já cadastrado");
                }
                toast.error("Falha ao solicitar. Tente novamente mais tarde");
              });
          } else {
            // STEP 2
            const sameEmail = (user?.email || "") === formData.email;
            if (sameEmail) {
              setEmailVerification({ requested: false, code: "" });
              setIsEditing((prev) => ({ ...prev, email: false }));
              return;
            }
            const code = emailVerification.code.replace(/\D/g, "");
            await connectionAPIPost(
              `/auth/confirm-email-change`,
              { newEmail: formData.email, code: code.toString() },
              apiUrl,
            )
              .then(() => {
                setUser({ ...user, email: formData.email });
                toast.success("Email atualizado com sucesso");
                setIsEditing((prev) => ({ ...prev, email: false }));
                setEmailVerification({ requested: false, code: "" });
              })
              .catch((err) => {
                setFormData((prev) => ({
                  ...prev,
                  email: user.email || "",
                }));
                toast.error("Falha ao confirmar. Tente novamente mais tarde");
              });
          }
        }
        if (section === "security") {
          if (securityData.password.trim().length === 0) {
            // nada para atualizar
          } else {
            await connectionAPIPost(
              "/auth/change-password",
              {
                currentPassword: securityData.oldPassword,
                newPassword: securityData.password,
                confirmPassword: securityData.password,
              },
              apiUrl,
            )
              .then(() => {
                toast.success("Senha atualizada com sucesso");
                setIsEditing((prev) => ({ ...prev, security: false }));
                setSecurityData({ oldPassword: "", password: "" });
                setShowNewPassword(false);
              })
              .catch((err) => {
                const errorMessage = err?.response?.data?.message || "";

                if (
                  errorMessage.includes(
                    "Password must be at least 6 characters",
                  )
                ) {
                  setErrors((prev) => ({
                    ...prev,
                    password: "A senha deve ter no mínimo 6 caracteres",
                  }));
                  toast.error("A senha deve ter no mínimo 6 caracteres");
                }
                // else if (errorMessage.includes("uppercase letter")) {
                //   setErrors((prev) => ({
                //     ...prev,
                //     password:
                //       "A senha deve conter ao menos uma letra maiúscula",
                //   }));
                //   toast.error("A senha deve conter ao menos uma letra maiúscula");
                // } else if (errorMessage.includes("lowercase letter")) {
                //   setErrors((prev) => ({
                //     ...prev,
                //     password:
                //       "A senha deve conter ao menos uma letra minúscula",
                //   }));
                //   toast.error("A senha deve conter ao menos uma letra minúscula");
                // } else if (errorMessage.includes("special character")) {
                //   setErrors((prev) => ({
                //     ...prev,
                //     password:
                //       "A senha deve conter ao menos um caractere especial",
                //   }));
                //   toast.error("A senha deve conter ao menos um caractere especial");
                // }
                else {
                  toast.error("Falha ao atualizar senha. Tente novamente");
                }
              })
              .finally(() => {
                setIsLoading((prev) => ({ ...prev, security: false }));
              });
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (section !== "email") {
          setIsEditing((prev) => ({ ...prev, [section]: false }));
        }
        if (section === "security") {
          setSecurityData({ oldPassword: "", password: "" });
          setShowNewPassword(false);
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
      setEmailVerification({ requested: false, code: "" });
    }
    if (section === "document" && user) {
      setFormData((prev) => ({
        ...prev,
        documentType: user.documentType || "cpf",
        documentValue: user.documentValue || "",
      }));
    }
    if (section === "security") {
      setSecurityData({ oldPassword: "", password: "" });
      setErrors((prev) => ({
        ...prev,
        password: undefined,
        oldPassword: undefined,
      }));
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

  const isPersonalUnchanged =
    (user?.name || "") === formData.name &&
    (user?.phone || "") === formData.phone;
  const isEmailUnchanged = (user?.email || "") === formData.email;
  const isEmailConfirmDisabled =
    emailVerification.code.replace(/\D/g, "").length !== 6 || isEmailUnchanged;
  const isSecurityDisabled =
    securityData.password.trim().length === 0 ||
    securityData.password.trim() === securityData.oldPassword.trim();

  const handleWhatsAppRedirect = () => {
    const phoneNumber = 5522999999999;
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    window.open(url, "_blank");
  };

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
              <Input
                id="name"
                type="text"
                height={40}
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
                  <Input
                    {...inputProps}
                    id="phone"
                    type="tel"
                    height={40}
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
                    disabled={
                      isLoading.personal ||
                      ((user?.name || "") === formData.name &&
                        (user?.phone || "") === formData.phone)
                    }
                    isNotSelected={
                      isLoading.personal ||
                      ((user?.name || "") === formData.name &&
                        (user?.phone || "") === formData.phone)
                    }
                  />
                </div>
              )}
            </div>
          </form>
        </div>
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
                  <Input
                    {...inputProps}
                    id="documentValue"
                    type="text"
                    height={40}
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
              <Input
                id="email"
                type="email"
                height={40}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing.email || emailVerification.requested}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            {emailVerification.requested && (
              <div className="input-group">
                <label htmlFor="emailCode">Código de verificação</label>
                <Input
                  id="emailCode"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  height={40}
                  placeholder="6 dígitos"
                  value={emailVerification.code}
                  onChange={(e) =>
                    setEmailVerification((prev) => ({
                      ...prev,
                      code: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  disabled={!isEditing.email}
                  className={errors.emailCode ? "error" : ""}
                />
                {errors.emailCode && (
                  <span className="error-message">{errors.emailCode}</span>
                )}
              </div>
            )}

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
                    title={
                      isLoading.email
                        ? emailVerification.requested
                          ? "Confirmando..."
                          : "Solicitando..."
                        : emailVerification.requested
                          ? "Confirmar"
                          : "Solicitar"
                    }
                    width={120}
                    height={32}
                    rounded
                    disabled={
                      isLoading.email ||
                      (!emailVerification.requested
                        ? (user?.email || "") === formData.email
                        : emailVerification.code.replace(/\D/g, "").length !==
                            6 || (user?.email || "") === formData.email)
                    }
                    isNotSelected={
                      isLoading.email ||
                      (!emailVerification.requested
                        ? (user?.email || "") === formData.email
                        : emailVerification.code.replace(/\D/g, "").length !==
                            6 || (user?.email || "") === formData.email)
                    }
                  />
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Seção: Segurança */}
        <div className="form-section">
          <Text fontName="REGULAR_SEMI_BOLD" className="section-title">
            Alterar senha
          </Text>

          <form onSubmit={handleSubmitSection("security")}>
            <div className="input-group">
              <label htmlFor="password">Nova senha</label>
              <Input
                id="password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Digite sua nova senha"
                disabled={!isEditing.security}
                value={securityData.password}
                onChange={(e) =>
                  setSecurityData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className={errors.password ? "error" : ""}
                height={40}
                rightElement={
                  showNewPassword ? (
                    <EyeOn
                      style={{
                        cursor: "pointer",
                        color: theme.background_01,
                      }}
                      onClick={() => setShowNewPassword((v) => !v)}
                    />
                  ) : (
                    <EyeOff
                      style={{
                        cursor: "pointer",
                        color: theme.background_01,
                      }}
                      onClick={() => setShowNewPassword((v) => !v)}
                    />
                  )
                }
              />
              <Text fontName="SMALL" color="secondary">
                Mínimo 6 caracteres
              </Text>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="oldPassword">Informe a senha antiga</label>
              <Input
                id="oldPassword"
                type="password"
                placeholder="******"
                disabled={!isEditing.security}
                value={securityData.oldPassword}
                onChange={(e) =>
                  setSecurityData((prev) => ({
                    ...prev,
                    oldPassword: e.target.value,
                  }))
                }
                className={errors.oldPassword ? "error" : ""}
                height={40}
              />
              {errors.oldPassword && (
                <span className="error-message">{errors.oldPassword}</span>
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
                    disabled={
                      isLoading.security ||
                      securityData.password.trim().length === 0 ||
                      securityData.password.trim() ===
                        securityData.oldPassword.trim()
                    }
                    isNotSelected={
                      isLoading.security ||
                      securityData.password.trim().length === 0 ||
                      securityData.password.trim() ===
                        securityData.oldPassword.trim()
                    }
                  />
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="support" onClick={handleWhatsAppRedirect}>
          <Text align="center" fontName="SMALL">
            Entrar em contato com suporte
          </Text>
        </div>
      </div>
    </SettingsContainer>
  );
};

export default Settings;
