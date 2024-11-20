"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DeviceType } from "types/device.types";

interface DeviceContextProps {
  device: DeviceType;
  handleDeviceWidth: () => void;
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [device, setDevice] = useState<DeviceType>(null);

  const handleDeviceWidth = () => {
    const currentWidth = window.innerWidth;
    if (currentWidth < 768) {
      setDevice("mobile");
    } else if (currentWidth >= 768 && currentWidth <= 1024) {
      setDevice("tablet");
    } else {
      setDevice("desktop");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleDeviceWidth();
      window.addEventListener("resize", handleDeviceWidth);

      return () => {
        window.removeEventListener("resize", handleDeviceWidth);
      };
    }
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        device,
        handleDeviceWidth,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = (): DeviceContextProps => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
};
