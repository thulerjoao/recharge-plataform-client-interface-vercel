import { getDevice } from "./getDevice";

export const invisibleCardsCalc = (prop: any[]): number => {
  const device = getDevice();
  if (device !== "mobile") {
    const amount = 3 - (prop.length % 3);
    return amount;
  }
};
