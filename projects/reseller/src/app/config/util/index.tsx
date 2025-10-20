"use client";

import Text from "@4miga/design-system/components/Text";
import { useAuth } from "context/auth";
import DefaultHeader from "public/components/defaultHeader";
import HeaderEnviroment from "public/components/headerEnviroment";
import CarouselUpload from "../common/components/carouselUpload";
import SecondaryBannerUpload from "../common/components/secondaryBannerUpload";
import SocialNetworksSection from "../common/components/socialNetworksSection";
import { SettingsPageContainer } from "./style";

const Settings = () => {
  const { store, fetchStore } = useAuth();

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

      <div className="mainContentContainer">
        <CarouselUpload
          bannersUrl={store?.bannersUrl}
          onRefreshStore={fetchStore}
        />

        <SecondaryBannerUpload
          secondaryBannerUrl={store?.offerBannerImage}
          onRefreshStore={fetchStore}
        />

        <SocialNetworksSection onRefreshStore={fetchStore} />
      </div>
    </SettingsPageContainer>
  );
};

export default Settings;
