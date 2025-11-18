"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { connectionAPIPatch } from "@4miga/services/connectionAPI/connection";
import { useAuth } from "context/auth";
import React, { useMemo, useState } from "react";
import InputMask from "react-input-mask";
import Email from "../../icons/Email.svg";
import Facebook from "../../icons/Facebook.svg";
import Instagram from "../../icons/Instagram.svg";
import Tiktok from "../../icons/TikTok.svg";
import Wpp from "../../icons/Wpp.svg";
import { SocialNetworksSectionContainer } from "./style";

interface SocialNetworksErrors {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  whatsapp?: string;
  email?: string;
}

interface SocialNetworksSectionProps {
  onRefreshStore: () => Promise<void>;
}

const SocialNetworksSection: React.FC<SocialNetworksSectionProps> = ({
  onRefreshStore,
}) => {
  const { store } = useAuth();
  const [instagram, setInstagram] = useState(store?.instagramUrl || "");
  const [facebook, setFacebook] = useState(store?.facebookUrl || "");
  const [tiktok, setTiktok] = useState(store?.tiktokUrl || "");
  const [whatsapp, setWhatsapp] = useState(store?.wppNumber || "");
  const [email, setEmail] = useState(store?.email || "");
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<SocialNetworksErrors>({});

  const hasChanges = useMemo(() => {
    const initialInstagram = store?.instagramUrl || "";
    const initialFacebook = store?.facebookUrl || "";
    const initialTiktok = store?.tiktokUrl || "";
    const initialWhatsapp = store?.wppNumber || "";
    const initialEmail = store?.email || "";

    return (
      instagram !== initialInstagram ||
      facebook !== initialFacebook ||
      tiktok !== initialTiktok ||
      whatsapp !== initialWhatsapp ||
      email !== initialEmail
    );
  }, [instagram, facebook, tiktok, whatsapp, email, store]);

  const handleInputChange = (
    field: "instagram" | "facebook" | "tiktok" | "whatsapp" | "email",
    value: string,
  ) => {
    // Update field value
    switch (field) {
      case "instagram":
        setInstagram(value);
        break;
      case "facebook":
        setFacebook(value);
        break;
      case "tiktok":
        setTiktok(value);
        break;
      case "whatsapp":
        setWhatsapp(value);
        break;
      case "email":
        setEmail(value);
        break;
    }

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCancel = () => {
    setInstagram(store?.instagramUrl || "");
    setFacebook(store?.facebookUrl || "");
    setTiktok(store?.tiktokUrl || "");
    setWhatsapp(store?.wppNumber || "");
    setEmail(store?.email || "");
  };

  const validateForm = (): boolean => {
    const newErrors: SocialNetworksErrors = {};

    // Email validation (if provided)
    if (email.trim() && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido";
    }

    // Phone validation (if provided)
    if (whatsapp.trim()) {
      const phoneDigits = whatsapp.replace(/\D/g, "");
      if (phoneDigits.length !== 11) {
        newErrors.whatsapp = "Telefone deve ter 11 dígitos";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    if (!whatsapp && !email) {
      alert("A plataforma deve ter pelo menos um contato para suporte");
      return;
    }
    setIsSaving(true);
    connectionAPIPatch("/store", {
      instagramUrl: instagram ? instagram : null,
      facebookUrl: facebook ? facebook : "",
      tiktokUrl: tiktok ? tiktok : null,
      wppNumber: whatsapp ? whatsapp : null,
      email: email ? email : null,
    })
      .then(() => {
        alert("Valores salvos com sucesso!");
        onRefreshStore();
      })
      .catch((error) => {
        alert(error.message || "Erro ao salvar valores");
        console.log(error);
        handleCancel();
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <SocialNetworksSectionContainer>
      <div className="section">
        <div className="sectionHeader">
          <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
            INFORMAÇÕES DE CONTATO
          </Text>
          <Text fontName="SMALL_MEDIUM" color={Theme.colors.secondaryText}>
            Configure as informações de contato para suporte
          </Text>
        </div>

        <div className="contactGrid">
          <div className="socialItem">
            <Input
              value={email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Email para suporte"
              height={40}
              title="E-mail"
              titleIcon={<Email />}
              type="email"
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="socialItem">
            <InputMask
              mask="(99) 99999-9999"
              maskChar=""
              value={whatsapp}
              onChange={(e: any) =>
                handleInputChange("whatsapp", e.target.value)
              }
            >
              {(inputProps: any) => (
                <Input
                  {...inputProps}
                  placeholder="WhatsApp para suporte"
                  height={40}
                  title="WhatsApp"
                  titleIcon={<Wpp />}
                  type="tel"
                  className={errors.whatsapp ? "error" : ""}
                />
              )}
            </InputMask>
            {errors.whatsapp && (
              <span className="error-message">{errors.whatsapp}</span>
            )}
          </div>
        </div>
      </div>
      <div className="section">
        <div className="sectionHeader">
          <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
            REDES SOCIAIS
          </Text>
          <Text fontName="SMALL_MEDIUM" color={Theme.colors.secondaryText}>
            Configure as redes sociais da sua loja
          </Text>
        </div>

        <div className="socialGrid">
          <div className="socialItem">
            <Input
              value={instagram}
              onChange={(e) => handleInputChange("instagram", e.target.value)}
              placeholder="Digite o instagram da loja"
              height={40}
              title="Instagram"
              titleIcon={<Instagram />}
              className={errors.instagram ? "error" : ""}
            />
            {errors.instagram && (
              <span className="error-message">{errors.instagram}</span>
            )}
            <a
              href={`https://instagram.com/${instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="socialLink"
            >
              <Text
                margin="8px 0 0 16px"
                fontName="TINY"
                color={Theme.colors.secondaryText}
              >
                http://instagram.com/{instagram.replace("@", "")}
              </Text>
            </a>
          </div>

          <div className="socialItem">
            <Input
              value={facebook}
              onChange={(e) => handleInputChange("facebook", e.target.value)}
              height={40}
              title="Facebook"
              placeholder="Digite o facebook da loja"
              titleIcon={<Facebook />}
              className={errors.facebook ? "error" : ""}
            />
            {errors.facebook && (
              <span className="error-message">{errors.facebook}</span>
            )}
            <a
              href={`https://facebook.com/${facebook.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="socialLink"
            >
              <Text
                margin="8px 0 0 16px"
                fontName="TINY"
                color={Theme.colors.secondaryText}
              >
                http://facebook.com/{facebook.replace("@", "")}
              </Text>
            </a>
          </div>

          <div className="socialItem">
            <Input
              value={tiktok}
              onChange={(e) => handleInputChange("tiktok", e.target.value)}
              height={40}
              title="TikTok"
              placeholder="Digite o tiktok da loja"
              titleIcon={<Tiktok />}
              className={errors.tiktok ? "error" : ""}
            />
            {errors.tiktok && (
              <span className="error-message">{errors.tiktok}</span>
            )}
            <a
              href={`https://tiktok.com/@${tiktok.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="socialLink"
            >
              <Text
                margin="8px 0 0 16px"
                fontName="TINY"
                color={Theme.colors.secondaryText}
              >
                http://tiktok.com/{tiktok.replace("@", "")}
              </Text>
            </a>
          </div>
        </div>
      </div>

      {hasChanges && (
        <div className="actionButtons">
          <Button
            rounded
            height={32}
            width={140}
            title="Cancelar"
            onClick={handleCancel}
            isNotSelected
            disabled={isSaving}
          />
          <Button
            rounded
            height={32}
            width={140}
            title="Salvar"
            disabled={isSaving}
            loading={isSaving}
            onClick={handleSave}
          />
        </div>
      )}
    </SocialNetworksSectionContainer>
  );
};

export default SocialNetworksSection;
