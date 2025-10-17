import { apiUrl } from "@4miga/services/connectionAPI/url";
import axios from "axios";

export const uploadBannersBatch = async (
  files: File[],
): Promise<{ success: boolean; uploadedCount: number }> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const accessToken = sessionStorage.getItem("accessToken");

  const response = await axios.post(`${apiUrl}/store/banners/batch`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
      "ngrok-skip-browser-warning": "true",
    },
  });

  return response.data;
};

export const uploadBanner = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const accessToken = sessionStorage.getItem("accessToken");

  const response = await axios.post(`${apiUrl}/store/banners`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
      "ngrok-skip-browser-warning": "true",
    },
  });

  return response.data.url;
};

export const deleteBanner = async (index: number): Promise<void> => {
  const accessToken = sessionStorage.getItem("accessToken");

  await axios.delete(`${apiUrl}/store/banners/${index}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "ngrok-skip-browser-warning": "true",
    },
  });
};

export const deleteBannersBatch = async (
  indices: number[],
): Promise<{ removedCount: number }> => {
  const accessToken = sessionStorage.getItem("accessToken");

  console.log("🔍 deleteBannersBatch - Request:", {
    url: `${apiUrl}/store/banners/batch`,
    indices,
    data: { indices },
  });

  const response = await axios.delete(`${apiUrl}/store/banners/batch`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    data: { indices },
  });

  console.log("✅ deleteBannersBatch - Response:", response.data);

  return response.data;
};
