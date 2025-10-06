import React, { useRef, useState } from "react";
import { apiUrl } from "../utils/apiUrl";

interface UseImageUploadOptions {
  endpoint: string;
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

interface UseImageUploadReturn {
  // States
  selectedFile: File | null;
  previewUrl: string | null;
  isUploading: boolean;
  hasChanges: boolean;

  // Refs
  fileInputRef: React.RefObject<HTMLInputElement>;

  // Functions
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleButtonClick: () => void;
  handleSave: () => Promise<void>;
  handleSaveTo: (overrideEndpoint: string) => Promise<void>;
  clearSelection: () => void;
  setHasChanges: (hasChanges: boolean) => void;
}

export const useImageUpload = (
  options: UseImageUploadOptions,
): UseImageUploadReturn => {
  const { endpoint, onSuccess, onError } = options;

  // States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      const error = new Error("Please select only PNG, JPG or JPEG files");
      onError?.(error);
      return;
    }

    // Create preview URL
    const newPreviewUrl = URL.createObjectURL(file);

    // Cleanup previous preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(newPreviewUrl);
    setHasChanges(true);
  };

  // Function to open file selector
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Function to save/upload
  const handleSave = async () => {
    if (!hasChanges || !selectedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Simple axios call for file upload (bypasses connectionAPI interceptors)
      const axios = (await import("axios")).default;
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await axios.post(`${apiUrl}${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      // Assuming API returns image URL
      const uploadedUrl = response.data.url || response.data;

      onSuccess?.(uploadedUrl);
      clearSelection();
      setHasChanges(false);
    } catch (error) {
      console.error(`Error uploading image to ${endpoint}:`, error);
      onError?.(error as Error);
    } finally {
      setIsUploading(false);
    }
  };

  // Function to save/upload to a specific endpoint (override)
  const handleSaveTo = async (overrideEndpoint: string) => {
    if (!hasChanges || !selectedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const axios = (await import("axios")).default;
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await axios.post(
        `${apiUrl}${overrideEndpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
            "ngrok-skip-browser-warning": "true",
          },
        },
      );

      const uploadedUrl = response.data.url || response.data;

      onSuccess?.(uploadedUrl);
      clearSelection();
      setHasChanges(false);
    } catch (error) {
      console.error(`Error uploading image to ${overrideEndpoint}:`, error);
      onError?.(error as Error);
    } finally {
      setIsUploading(false);
    }
  };

  // Function to clear selection
  const clearSelection = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setHasChanges(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    selectedFile,
    previewUrl,
    isUploading,
    hasChanges,
    fileInputRef,
    handleFileSelect,
    handleButtonClick,
    handleSave,
    handleSaveTo,
    clearSelection,
    setHasChanges,
  };
};
