import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";

import { Slot } from "expo-router";

/*
const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};
*/

const myDefaultTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    // text: "#fff",
    // background: "#e74c3c",
    // primary: "#e74c3c",
    // card: "#e74c3c",
    // border: "#e74c3c",
    // notification: "#e74c3c",
  },
};

const myDarkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={myDefaultTheme}>
      <Slot />
    </ThemeProvider>
  );
}
