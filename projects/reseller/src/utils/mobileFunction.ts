import { DeviceType } from "types/device.types";

export const CurrentMobile = (): DeviceType => {
  const currentWidth = window.innerWidth;
  if (currentWidth < 768) {
    return "mobile";
  } else if (currentWidth >= 768 && currentWidth <= 1024) {
    return "tablet";
  } else {
    return "desktop";
  }
};
