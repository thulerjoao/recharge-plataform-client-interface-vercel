// CDN Configuration for Bigo
import { CDN_CONFIG, getCdnImageUrl } from "@4miga/services/cdn.config/cdn";

// Helper function for Bigo images
export const getBigoImageUrl = (imageName: string) => {
  return getCdnImageUrl(imageName, "bigo");
};

// Export CDN config
export { CDN_CONFIG };
