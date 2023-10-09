import { ThemeContextProvider } from "@/context/theme.context";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeContextProvider>
      <Slot />
    </ThemeContextProvider>
  );
}
