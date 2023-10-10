import { Text as NativeText, StyleSheet } from "react-native";

export default function Text({
  style,
  children,
  ...props
}: $ElementProps<typeof NativeText>) {
  return (
    <NativeText style={[styles.text, style]} {...props}>
      {children}
    </NativeText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto_400Regular",
  },
});
