import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import useTheme from "@/hooks/useTheme";

export default function TextInput({
  style,
  children,
  ...props
}: $ElementProps<typeof NativeTextInput>) {
  const styles = useTheme(stylesheet);
  return (
    <NativeTextInput style={[styles.input, style]} {...props}>
      {children}
    </NativeTextInput>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    input: {
      fontFamily: "Roboto_400Regular",
      color: theme.text[100],
      backgroundColor: theme.light[500],
      padding: 10,
    },
  });
