export type DeviceType = "mobile" | "tablet" | "desktop";

export type UserType = {};

export interface loginParams {
  token: string;
  user: UserType;
  isChecked: Boolean;
}
