import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Timer from "@/components/Timer";

export default function App() {
  const handleFinish = () => {
    console.log("finish");
  };
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Timer seconds={10000} onFinish={handleFinish} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
