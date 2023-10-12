import { Text as NativeText, StyleSheet } from "react-native";
import useTheme from "@/hooks/useTheme";

export default function Text({
  style,
  children,
  ...props
}: $ElementProps<typeof NativeText>) {
  const styles = useTheme(stylesheet);
  return (
    <NativeText style={[styles.text, style]} {...props}>
      {children}
    </NativeText>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    text: {
      fontFamily: "Roboto_400Regular",
      color: theme.text[500],
    },
  });
