"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import React, { useState } from "react";
import Email from "../../icons/Email.svg";
import Facebook from "../../icons/Facebook.svg";
import Instagram from "../../icons/Instagram.svg";
import Tiktok from "../../icons/TikTok.svg";
import Wpp from "../../icons/Wpp.svg";
import { SocialNetworksSectionContainer } from "./style";

interface SocialNetworksSectionProps {
  initialData?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    whatsapp?: string;
    email?: string;
  };
  onRefreshStore: () => Promise<void>;
}

const SocialNetworksSection: React.FC<SocialNetworksSectionProps> = ({
  initialData,
  onRefreshStore,
}) => {
  const [instagram, setInstagram] = useState(
    initialData?.instagram || "@4migagames",
  );
  const [facebook, setFacebook] = useState(
    initialData?.facebook || "@4migagames",
  );
  const [tiktok, setTiktok] = useState(initialData?.tiktok || "@4migagames");
  const [whatsapp, setWhatsapp] = useState(
    initialData?.whatsapp || "(11) 9 9944-9944",
  );
  const [email, setEmail] = useState(initialData?.email || "contato@4miga.com");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implementar serviço de API
      // const { updateSocialNetworks } = await import("services/socialNetworksService");
      // await updateSocialNetworks({
      //   instagram,
      //   facebook,
      //   tiktok,
      //   whatsapp,
      //   email,
      // });

      // Mock - remover quando API estiver pronta
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Salvando redes sociais:", {
        instagram,
        facebook,
        tiktok,
        whatsapp,
        email,
      });

      await onRefreshStore();
      alert("Redes sociais salvas com sucesso!");
    } catch (error: any) {
      alert(error.message || "Erro ao salvar as redes sociais");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SocialNetworksSectionContainer>
      <div className="sectionHeader">
        <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
          REDES SOCIAIS E CONTATO
        </Text>
        <Text fontName="SMALL_MEDIUM" color={Theme.colors.secondaryText}>
          Configure as informações de contato da sua loja
        </Text>
      </div>

      <div className="socialGrid">
        <div className="socialItem">
          <Input
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="@4migagames"
            height={40}
            title="Instagram"
            titleIcon={<Instagram />}
          />
          <Text
            margin="8px 0 0 16px"
            fontName="TINY"
            color={Theme.colors.secondaryText}
          >
            http://instagram.com/{instagram.replace("@", "")}
          </Text>
        </div>

        <div className="socialItem">
          <Input
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            placeholder="@4migagames"
            height={40}
            title="Facebook"
            titleIcon={<Facebook />}
          />
          <Text
            margin="8px 0 0 16px"
            fontName="TINY"
            color={Theme.colors.secondaryText}
          >
            http://facebook.com/{facebook.replace("@", "")}
          </Text>
        </div>

        <div className="socialItem">
          <Input
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
            placeholder="@4migagames"
            height={40}
            title="TikTok"
            titleIcon={<Tiktok />}
          />
          <Text
            margin="8px 0 0 16px"
            fontName="TINY"
            color={Theme.colors.secondaryText}
          >
            http://tiktok.com/@{tiktok.replace("@", "")}
          </Text>
        </div>

        <div className="socialItem">
          <Input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="(11) 9 9944-9944"
            height={40}
            title="WhatsApp"
            titleIcon={<Wpp />}
          />
        </div>

        <div className="socialItem">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contato@4miga.com"
            height={40}
            title="E-mail para suporte"
            titleIcon={<Email />}
          />
        </div>
      </div>

      <div className="actionButtons">
        <Button
          rounded
          height={32}
          width={197}
          title="Salvar alterações"
          onClick={handleSave}
          loading={isSaving}
          disabled={isSaving}
        />
      </div>
    </SocialNetworksSectionContainer>
  );
};

export default SocialNetworksSection;
