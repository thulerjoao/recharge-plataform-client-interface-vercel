"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useAuth } from "context/auth";
import Image from "next/image";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useState } from "react";
import CarouselUpload from "../common/components/carouselUpload";
import SecondaryBannerUpload from "../common/components/secondaryBannerUpload";
import Email from "../common/icons/Email.svg";
import Facebook from "../common/icons/Facebook.svg";
import Instagram from "../common/icons/Instagram.svg";
import Tiktok from "../common/icons/TikTok.svg";
import Wpp from "../common/icons/Wpp.svg";
import { SettingsPageContainer } from "./style";

const Settings = () => {
  const [instagram, setInstagram] = useState("@4migagames");
  const [facebook, setFacebook] = useState("@4migagames");
  const [tiktok, setTiktok] = useState("@4migagames");
  const [whatsapp, setWhatsapp] = useState("(11) 9 9944-9944");
  const [email, setEmail] = useState("contato@4miga.com");
  const { store, fetchStore } = useAuth();

  const handleSaveSocialNetworks = () => {
    alert("Redes sociais salvas! (Mock - implementar com API)");
  };

  return (
    <SettingsPageContainer>
      <div className="desktop">
        <HeaderEnviroment>
          <DefaultHeader backWard title="CONFIGURAÇÕES" />
        </HeaderEnviroment>
      </div>
      <div className="mobile mobileHeader">
        <Text align="center" fontName="LARGE_SEMI_BOLD">
          CONFIGURAÇÕES
        </Text>
      </div>

      <div className="mainContent">
        <CarouselUpload
          bannersUrl={store?.bannersUrl}
          onRefreshStore={fetchStore}
        />

        <SecondaryBannerUpload
          secondaryBannerUrl={store?.offerBannerImage}
          onRefreshStore={fetchStore}
        />

        {/* <div className="infoSection">
          <div className="sectionHeader">
            <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
              LOGO
            </Text>
            <Text fontName="SMALL_MEDIUM" color={Theme.colors.secondaryText}>
              O logo deve estar no formato .png e ter uma resolução mínima de
              720 x 480
            </Text>
          </div>

          <div className="logoImagePreview">
            <Image
              src={logoUpload.previewUrl || logoUrl}
              alt="logo"
              width={720}
              height={480}
            />
          </div>

          <div className="imageActionButtons">
            <Button
              style={{ color: "white" }}
              isNotSelected
              height={32}
              rounded
              leftElement={<Close />}
              title="Remover imagem"
              onClick={logoUpload.clearSelection}
              disabled={!logoUpload.previewUrl}
            />
            <Button
              height={32}
              rounded
              leftElement={<Camera />}
              title="Atualizar imagem"
              onClick={logoUpload.handleButtonClick}
            />
          </div>

          <input
            ref={logoUpload.fileInputRef}
            type="file"
            accept="image/png"
            style={{ display: "none" }}
            onChange={logoUpload.handleFileSelect}
          />

          {logoUpload.hasChanges && (
            <div className="saveChangesSection">
              <Button
                rounded
                height={36}
                width={180}
                title="Salvar alterações"
                onClick={handleSaveLogo}
                loading={logoUpload.isUploading}
                disabled={logoUpload.isUploading}
              />
            </div>
          )}
        </div> */}
        <div className="infoSection">
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
              onClick={handleSaveSocialNetworks}
            />
          </div>
        </div>
      </div>
    </SettingsPageContainer>
  );
};

export default Settings;
