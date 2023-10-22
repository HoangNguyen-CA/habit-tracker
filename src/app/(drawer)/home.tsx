import { StyleSheet } from "react-native";

import useTheme from "@/hooks/useTheme";
import Countdown from "@/components/Countdown/Countdown.container";

export default function Home() {
  const styles = useTheme(stylesheet);

  return <Countdown />;
}

const stylesheet = (theme: Theme) => StyleSheet.create({});
