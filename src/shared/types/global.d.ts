export {};

import { Theme as CustomTheme } from "@/shared/types/theme.interface";

declare global {
  export interface Theme extends CustomTheme {}
}
