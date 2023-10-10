import { ThemeContextProvider } from "@/context/theme.context";
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
      <Slot />
    </ThemeContextProvider>
  );
}

// import * as SplashScreen from "expo-splash-screen";
// import { useCallback } from "react";
// import { View } from "react-native";

// const onLayoutRootView = useCallback(async () => {
//   if (fontsLoaded || fontError) {
//     await SplashScreen.hideAsync();
//   }
// }, [fontsLoaded, fontError]);

// {
//   fontsLoaded;
// }
