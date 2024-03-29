import { ThemeContextProvider } from "@/context/theme.context";
import { HabitContextProvider } from "@/context/habit.context";
import { Slot } from "expo-router";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { RobotoMono_400Regular } from "@expo-google-fonts/roboto-mono";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    RobotoMono_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeContextProvider>
      <HabitContextProvider>
        <Slot />
      </HabitContextProvider>
    </ThemeContextProvider>
  );
}
