import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          href: "/home",
          tabBarLabel: "Pomodoro",
          tabBarIcon: () => (
            <Ionicons name="timer-outline" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          href: "/habits",
          tabBarLabel: "Habits",
          tabBarIcon: () => (
            <Ionicons name="checkbox-outline" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          href: "/tracker",
          tabBarLabel: "Tracker",
          tabBarIcon: () => (
            <Ionicons name="calendar-outline" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
