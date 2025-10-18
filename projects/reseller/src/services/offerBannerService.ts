import { apiUrl } from "@4miga/services/connectionAPI/url";
import axios from "axios";

export const deleteOfferBanner = async (): Promise<void> => {
  const accessToken = sessionStorage.getItem("accessToken");

  await axios.delete(`${apiUrl}/store/offer-banner`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "ngrok-skip-browser-warning": "true",
    },
  });
};
