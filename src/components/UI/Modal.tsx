import {
  Modal as NativeModal,
  StyleSheet,
  View,
  Pressable,
} from "react-native";

import useTheme from "@/hooks/useTheme";

interface Props {
  close: () => void;
}

export default function StyledModal({
  animationType = "fade",
  close,
  onRequestClose,
  style,
  children,
  ...props
}: Props & $ElementProps<typeof NativeModal>) {
  const styles = useTheme(stylesheet);
  return (
    <NativeModal
      transparent={true}
      animationType={animationType}
      onRequestClose={close}
      {...props}
    >
      <Pressable style={styles.backdrop} onPress={close}>
        <Pressable style={[styles.modalContainer, style]}>{children}</Pressable>
      </Pressable>
    </NativeModal>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    modalContainer: {
      height: "100%",
      width: "100%",
      backgroundColor: theme.light[500],
      padding: 15,
      borderRadius: 4,
      elevation: 5,
    },

    backdrop: {
      backgroundColor: `${theme.dark[500]}aa`,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
