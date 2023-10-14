import { Text as NativeText, StyleSheet } from "react-native";
import useTheme from "@/hooks/useTheme";

interface Props {
  variant?: "light" | "dark";
}

export default function Text({
  variant = "light",
  style,
  children,
  ...props
}: Props & $ElementProps<typeof NativeText>) {
  const styles = useTheme(stylesheet);
  return (
    <NativeText
      style={[styles.base, styles[`text-${variant}`], style]}
      {...props}
    >
      {children}
    </NativeText>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    base: {
      fontFamily: "Roboto_400Regular",
    },
    "text-light": {
      color: theme.text[500],
    },
    "text-dark": {
      color: theme.text[100],
    },
  });
