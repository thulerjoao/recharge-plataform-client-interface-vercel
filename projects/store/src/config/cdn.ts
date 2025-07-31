// CDN Configuration for Store
import { CDN_CONFIG, getCdnImageUrl } from "@4miga/services/cdn.config/cdn";

// Helper function for Store images
export const getStoreImageUrl = (imageName: string) => {
  return getCdnImageUrl(imageName, "store");
};

// Export CDN config
export { CDN_CONFIG };
