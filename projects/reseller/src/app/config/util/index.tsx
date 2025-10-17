"use client";

import Button from "@4miga/design-system/components/button";
import Input from "@4miga/design-system/components/input";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useAuth } from "context/auth";
import { useImageUpload } from "hooks/useImageUpload";
import Image from "next/image";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import { useState } from "react";
import CarouselUpload from "../common/components/carouselUpload";
import Camera from "../common/icons/Camera.svg";
import Email from "../common/icons/Email.svg";
import Facebook from "../common/icons/Facebook.svg";
import Instagram from "../common/icons/Instagram.svg";
import Tiktok from "../common/icons/TikTok.svg";
import Wpp from "../common/icons/Wpp.svg";
import Logo from "../common/temp/Logo.png";
import SecondaryBanner from "../common/temp/SeconderyBanner.png";
import { SettingsPageContainer } from "./style";

const Settings = () => {
  const [instagram, setInstagram] = useState("@4migagames");
  const [facebook, setFacebook] = useState("@4migagames");
  const [tiktok, setTiktok] = useState("@4migagames");
  const [whatsapp, setWhatsapp] = useState("(11) 9 9944-9944");
  const [email, setEmail] = useState("contato@4miga.com");
  const [secondaryBannerUrl, setSecondaryBannerUrl] = useState<string>(
    SecondaryBanner.src,
  );
  const [logoUrl, setLogoUrl] = useState<string>(Logo.src);
  const { store, fetchStore } = useAuth();

  const secondaryBannerUpload = useImageUpload({
    endpoint: "/store/banners/secondary",
    onSuccess: (url) => {
      setSecondaryBannerUrl(url);
      alert("Banner inferior atualizado com sucesso!");
    },
    onError: (error) => {
      console.error("Secondary banner upload error:", error);
      alert("Erro ao fazer upload do banner inferior.");
    },
  });

  // const logoUpload = useImageUpload({
  //   endpoint: `/store/${store.id}/logo`,
  //   onSuccess: (url) => {
  //     setLogoUrl(url);
  //     alert("Logo atualizado com sucesso!");
  //   },
  //   onError: (error) => {
  //     console.error("Logo upload error:", error);
  //     alert("Erro ao fazer upload do logo.");
  //   },
  // });

  const handleSaveSocialNetworks = () => {
    alert("Redes sociais salvas! (Mock - implementar com API)");
  };

  const handleSaveSecondaryBanner = async () => {
    if (secondaryBannerUpload.hasChanges) {
      await secondaryBannerUpload.handleSave();
    }
  };

  // const handleSaveLogo = async () => {
  //   if (logoUpload.hasChanges) {
  //     await logoUpload.handleSave();
  //   }
  // };

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

        <div className="infoSection">
          <div className="sectionHeader">
            <Text fontName="LARGE_SEMI_BOLD" color={Theme.colors.mainlight}>
              BANNER INFERIOR PÁGINA HOME
            </Text>
            <Text fontName="SMALL_MEDIUM" color={Theme.colors.secondaryText}>
              A imagem deve estar no formato .png, .jpg ou .jpeg, ter uma
              resolução mínima de 1280 x 540 e uma proporção de 21:9
            </Text>
          </div>

          <div className="bannerImagePreview">
            <Image
              src={secondaryBannerUpload.previewUrl || secondaryBannerUrl}
              alt="banner inferior"
              width={1280}
              height={540}
            />
          </div>

          <div className="imageActionButtons">
            {/* <Button
              style={{ color: "white" }}
              isNotSelected
              height={32}
              rounded
              leftElement={<Close />}
              title="Remover imagem"
              onClick={secondaryBannerUpload.clearSelection}
              disabled={!secondaryBannerUpload.previewUrl}
            /> */}
            <Button
              height={32}
              rounded
              leftElement={<Camera />}
              title="Atualizar imagem"
              onClick={secondaryBannerUpload.handleButtonClick}
            />
          </div>

          <input
            ref={secondaryBannerUpload.fileInputRef}
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            style={{ display: "none" }}
            onChange={secondaryBannerUpload.handleFileSelect}
          />

          {secondaryBannerUpload.hasChanges && (
            <div className="saveChangesSection">
              <Button
                rounded
                height={36}
                width={180}
                title="Salvar alterações"
                onClick={handleSaveSecondaryBanner}
                loading={secondaryBannerUpload.isUploading}
                disabled={secondaryBannerUpload.isUploading}
              />
            </div>
          )}
        </div>

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
