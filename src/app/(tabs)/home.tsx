import { StyleSheet } from "react-native";

import useTheme from "@/hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import Countdown from "@/components/Countdown/Countdown.container";

export default function Home() {
  const styles = useTheme(stylesheet);

  return (
    <SafeAreaView style={styles.container}>
      <Countdown />
    </SafeAreaView>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
