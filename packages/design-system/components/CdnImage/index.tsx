"use client";

import { getCdnImageUrl } from "@4miga/services/cdn.config/cdn";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

interface CdnImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: string | StaticImport;
  alt: string;
  app?: "bigo" | "store";
  width: number;
  height: number;
  quality?: number;
  format?: "webp" | "avif" | "jpeg";
  placeholder?: "blur" | "empty";
  priority?: boolean;
  sizes?: string;
  fallbackSrc?: string;
  retryCount?: number;
  onError?: (error: Error) => void;
  onLoad?: () => void;
}

const detectApp = (): "bigo" | "store" | undefined => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname.includes("bigo")) {
      return "bigo";
    }
    if (hostname.includes("store")) {
      return "store";
    }
  }
  return undefined;
};

const CdnImage: React.FC<CdnImageProps> = ({
  src,
  alt,
  app,
  width,
  height,
  quality = 75,
  format = "webp",
  placeholder = "empty",
  priority = false,
  sizes,
  fallbackSrc,
  retryCount = 3,
  onError,
  onLoad,
  ...props
}: CdnImageProps) => {
  const [currentSrc, setCurrentSrc] = useState<string | StaticImport>(src);
  const [retryAttempts, setRetryAttempts] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  const currentApp = app || detectApp();

  // Determines whether to use CDN or not
  const shouldUseCdn = (imageSrc: string | StaticImport): boolean => {
    // If it's StaticImport (local image), DON'T use CDN
    if (typeof imageSrc !== "string") {
      return false;
    }

    // For Google Cloud, use CDN for all strings
    // This allows optimization via Google Cloud Storage/CDN
    return true;
  };

  // Generates the image URL
  const getOptimizedImageUrl = (
    imageSrc: string | StaticImport,
  ): string | StaticImport => {
    // If it's StaticImport, return as is
    if (typeof imageSrc !== "string") {
      return imageSrc;
    }

    // If should use CDN AND we have a valid app
    if (shouldUseCdn(imageSrc) && currentApp) {
      // If it's a complete URL, use directly (already in Google Cloud)
      if (imageSrc.startsWith("http://") || imageSrc.startsWith("https://")) {
        return imageSrc;
      }
      // If it's relative, use CDN
      return getCdnImageUrl(imageSrc, currentApp);
    }

    // If shouldn't use CDN or don't have valid app, return URL as is
    return imageSrc;
  };

  // Adds optimization parameters to CDN URL (only for strings)
  const getOptimizedUrl = (
    url: string | StaticImport,
  ): string | StaticImport => {
    // If it's StaticImport, return as is
    if (typeof url !== "string") {
      return url;
    }

    // If shouldn't use CDN or don't have valid app, return as is
    if (!shouldUseCdn(src) || !currentApp) {
      return url;
    }

    // Add optimization parameters only for CDN URLs
    const urlObj = new URL(url);
    urlObj.searchParams.set("quality", quality.toString());
    urlObj.searchParams.set("format", format);

    return urlObj.toString();
  };

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    setHasError(true);

    // If there are still retry attempts and we have fallback
    if (retryAttempts < retryCount && fallbackSrc) {
      setRetryAttempts((prev) => prev + 1);
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    } else {
      // If no more attempts or fallback, call error callback
      onError?.(new Error("Image failed to load"));
    }
  };

  const handleLoad = () => {
    setHasError(false);
    setRetryAttempts(0);
    onLoad?.();
  };

  const imageUrl = getOptimizedUrl(getOptimizedImageUrl(currentSrc));

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      placeholder={placeholder}
      priority={priority}
      sizes={sizes}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
};

export default CdnImage;
