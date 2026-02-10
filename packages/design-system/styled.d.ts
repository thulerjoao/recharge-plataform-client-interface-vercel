import "styled-components";
import type { ThemeColors } from "./theme/types";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeColors {}
}
