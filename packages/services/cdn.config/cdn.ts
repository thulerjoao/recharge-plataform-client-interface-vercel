// Shared CDN Configuration
const BASE_URL =
  process.env.NEXT_PUBLIC_CDN_URL ||
  "https://storage.googleapis.com/frontend-cdn-assets";

export const CDN_CONFIG = {
  baseUrl: BASE_URL,
  bigo: {
    images: `${BASE_URL}/bigo`,
  },
  store: {
    images: `${BASE_URL}/store`,
  },
};

// Helper function to get CDN URL for images
export const getCdnImageUrl = (imageName: string, app: "bigo" | "store") => {
  return `${CDN_CONFIG[app].images}/${imageName}`;
};
