import { apiUrl } from "@4miga/services/connectionAPI/url";
import React, { useRef, useState } from "react";

interface UseMultipleImageUploadOptions {
  endpoint: string;
  maxImages?: number;
  existingImagesCount?: number; // Número de imagens já salvas
  onSuccess?: (urls: string[]) => void;
  onError?: (error: Error) => void;
}

interface UseMultipleImageUploadReturn {
  // States
  selectedFiles: File[];
  previewUrls: string[];
  isUploading: boolean;
  hasChanges: boolean;

  // Refs
  fileInputRef: React.RefObject<HTMLInputElement>;

  // Functions
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleButtonClick: () => void;
  handleSave: () => Promise<void>;
  removeImage: (index: number) => void;
  clearSelection: () => void;
  setHasChanges: (hasChanges: boolean) => void;
}

export const useMultipleImageUpload = (
  options: UseMultipleImageUploadOptions,
): UseMultipleImageUploadReturn => {
  const {
    endpoint,
    maxImages = 5,
    existingImagesCount = 0,
    onSuccess,
    onError,
  } = options;

  // States
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const totalCurrentImages = existingImagesCount + selectedFiles.length;
    const remainingSlots = maxImages - totalCurrentImages;
    const filesArray = Array.from(files);

    // Check if already at max capacity
    if (totalCurrentImages >= maxImages) {
      const error = new Error(
        `Você já atingiu o limite de ${maxImages} imagens. Remova algumas antes de adicionar novas.`,
      );
      onError?.(error);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Check if trying to add more than max total
    if (filesArray.length > maxImages) {
      const error = new Error(
        `Você pode adicionar no máximo ${maxImages} imagens no total`,
      );
      onError?.(error);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Check if adding these files would exceed max
    if (totalCurrentImages + filesArray.length > maxImages) {
      const error = new Error(
        `Você já tem ${totalCurrentImages} imagem(s). Pode adicionar apenas mais ${remainingSlots} imagem(s).`,
      );
      onError?.(error);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Validate file types
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    let hasInvalidType = false;

    filesArray.forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        hasInvalidType = true;
        return;
      }

      newFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    if (hasInvalidType) {
      const error = new Error(
        "Por favor, selecione apenas arquivos PNG, JPG ou JPEG",
      );
      onError?.(error);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setSelectedFiles((prev) => [...prev, ...newFiles]);
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
    setHasChanges(true);

    // Clear input to allow selecting same files again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Function to open file selector
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Function to remove an image
  const removeImage = (index: number) => {
    // Cleanup preview URL
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }

    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  // Function to save/upload all images
  const handleSave = async () => {
    if (!hasChanges || selectedFiles.length === 0) return;

    setIsUploading(true);
    try {
      const formData = new FormData();

      // Append all files
      selectedFiles.forEach((file, index) => {
        formData.append(`files`, file);
      });

      // Simple axios call for file upload
      const axios = (await import("axios")).default;
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await axios.post(`${apiUrl}${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      // Assuming API returns array of image URLs
      const uploadedUrls = response.data.urls || response.data;

      onSuccess?.(uploadedUrls);
      clearSelection();
      setHasChanges(false);
    } catch (error) {
      console.error(`Error uploading images to ${endpoint}:`, error);
      onError?.(error as Error);
    } finally {
      setIsUploading(false);
    }
  };

  // Function to clear selection
  const clearSelection = () => {
    // Cleanup all preview URLs
    previewUrls.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    setSelectedFiles([]);
    setPreviewUrls([]);
    setHasChanges(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    selectedFiles,
    previewUrls,
    isUploading,
    hasChanges,
    fileInputRef,
    handleFileSelect,
    handleButtonClick,
    handleSave,
    removeImage,
    clearSelection,
    setHasChanges,
  };
};
