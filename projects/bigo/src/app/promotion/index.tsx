"use client";

import Button from "@4miga/design-system/components/button";
import Text from "@4miga/design-system/components/Text";
import { Theme } from "@4miga/design-system/theme/theme";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PromotionContainer, VideoWrapper } from "./style";

const VIDEO_URL =
  "https://storage.googleapis.com/4miga-images/videos/promotion-01/1768517223536-promotion1.mp4";

const Promotion = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Timeout de 30 segundos para evitar ficar preso
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.error("Timeout ao carregar vídeo");
        setIsLoading(false);
        setHasError(true);
        setErrorMessage(
          "O vídeo está demorando muito para carregar. Verifique sua conexão.",
        );
      }
    }, 30000);

    // Múltiplos eventos para garantir que funcione em diferentes navegadores
    const handleCanPlay = () => {
      console.log("Vídeo pode ser reproduzido");
      setIsLoading(false);
      clearTimeout(timeoutId);
    };

    const handleLoadedMetadata = () => {
      console.log("Metadata carregado");
      // Em mobile, às vezes onCanPlay não dispara, então usamos este como fallback
      if (video.readyState >= 2) {
        // HAVE_CURRENT_DATA ou superior
        setIsLoading(false);
        clearTimeout(timeoutId);
      }
    };

    const handleLoadedData = () => {
      console.log("Dados do vídeo carregados");
      setIsLoading(false);
      clearTimeout(timeoutId);
    };

    const handleError = (e: Event) => {
      console.error("Erro ao carregar vídeo:", e);
      const videoError = video.error;
      let errorMsg = "Erro ao carregar o vídeo.";

      if (videoError) {
        switch (videoError.code) {
          case videoError.MEDIA_ERR_ABORTED:
            errorMsg = "Carregamento do vídeo foi interrompido.";
            break;
          case videoError.MEDIA_ERR_NETWORK:
            errorMsg = "Erro de rede. Verifique sua conexão e tente novamente.";
            break;
          case videoError.MEDIA_ERR_DECODE:
            errorMsg =
              "Erro ao decodificar o vídeo. O arquivo pode estar corrompido.";
            break;
          case videoError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMsg =
              "Formato de vídeo não suportado ou arquivo muito grande para este dispositivo.";
            break;
        }
      }

      setIsLoading(false);
      setHasError(true);
      setErrorMessage(errorMsg);
      clearTimeout(timeoutId);
    };

    const handleStalled = () => {
      console.warn("Carregamento do vídeo parou");
      // Não definir erro imediatamente, pode ser apenas uma pausa temporária
    };

    const handleWaiting = () => {
      console.log("Vídeo aguardando dados");
    };

    // Adicionar event listeners
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);
    video.addEventListener("stalled", handleStalled);
    video.addEventListener("waiting", handleWaiting);

    // Tentar carregar o vídeo
    video.load();

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("waiting", handleWaiting);
    };
  }, [isLoading]);

  // Detectar se é mobile para ajustar preload
  const isMobile =
    typeof window !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  return (
    <PromotionContainer>
      <div className="header">
        <Text
          tag="h1"
          align="center"
          fontName="LARGE_SEMI_BOLD"
          color={Theme.colors.mainlight}
          margin="0 0 8px 0"
        >
          Aprenda a recarregar
        </Text>
      </div>
      <VideoWrapper>
        {isLoading && (
          <div className="video-loading">
            <Text
              tag="p"
              align="center"
              fontName="REGULAR"
              color={Theme.colors.secondaryText}
            >
              Carregando vídeo...
            </Text>
          </div>
        )}

        {hasError ? (
          <div className="video-error">
            <Text
              tag="p"
              align="center"
              fontName="REGULAR"
              color={Theme.colors.refused}
            >
              Erro ao carregar vídeo
            </Text>
            <Button
              title="Tentar novamente"
              height={36}
              width={150}
              margin="16px 0 0 0"
              rounded
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                setErrorMessage("");
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }}
            />
          </div>
        ) : (
          <video
            ref={videoRef}
            controls
            playsInline // Importante para iOS
            preload={isMobile ? "none" : "metadata"} // Em mobile, não pré-carrega para economizar dados
            style={{ display: isLoading ? "none" : "block" }}
          >
            <source src={VIDEO_URL} type="video/mp4" />
            Seu navegador não suporta a tag de vídeo.
          </video>
        )}
      </VideoWrapper>
      <Button
        title="Compre agora!"
        height={40}
        width={200}
        margin="8px 0 0 0"
        rounded
        onClick={() => router.push("/home")}
      />
    </PromotionContainer>
  );
};

export default Promotion;
