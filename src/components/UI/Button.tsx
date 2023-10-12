import React from "react";
import {
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Text } from "@/components/UI";
import useTheme from "@/hooks/useTheme";

interface Props {
  onPress: () => void;
  children: React.ReactNode;
  variant?: "light" | "dark";
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function StyledButton({ variant = "light", ...props }: Props) {
  const styles = useTheme(stylesheet);
  return (
    <Pressable
      style={[styles.core, styles[`variant-${variant}`], props.containerStyle]}
      onPress={props.onPress}
    >
      <Text style={[styles.text, styles[`text-${variant}`], props.textStyle]}>
        {props.children}
      </Text>
    </Pressable>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    core: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 15,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      flexShrink: 1,
      fontSize: 20,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
    },
    "variant-light": {
      backgroundColor: theme.light[900],
    },
    "variant-dark": {
      backgroundColor: theme.light[500],
    },
    text: {
      textTransform: "uppercase",
    },
    "text-light": {
      color: theme.dark[300],
    },
    "text-dark": {
      color: theme.light[300],
    },
  });
