import { Drawer } from "expo-router/drawer";
import { ThemeContext } from "@/context/theme.context";
import { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
export default function TabsLayout() {
  const { theme } = useContext(ThemeContext);
  NavigationBar.setBackgroundColorAsync(theme.dark[400]);
  NavigationBar.setButtonStyleAsync("light");

  return (
    <>
      <Drawer
        screenOptions={{
          headerShadowVisible: false,
          headerTintColor: theme.text[500],
          headerStyle: {
            backgroundColor: theme.dark[400],
          },
        }}
      >
        <Drawer.Screen
          name="home" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Pomodoro",
            headerTitle: "",
          }}
        />
        <Drawer.Screen
          name="habits" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Habits",
            headerTitle: "Habits",
          }}
        />
        <Drawer.Screen
          name="tracker" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Tracker",
            headerTitle: "Tracker",
          }}
        />
      </Drawer>
      <StatusBar style="light" />
    </>
  );
}
