import { Text as NativeText, StyleSheet } from 'react-native';
import useTheme from '@/hooks/useTheme';

interface Props {
  variant?: 'light' | 'dark';
  size?: 'body' | 'h1';
}

export default function Text({
  variant = 'light',
  size = 'body',
  style,
  children,
  ...props
}: Props & $ElementProps<typeof NativeText>) {
  const styles = useTheme(stylesheet);
  return (
    <NativeText
      style={[
        styles.base,
        styles[`text-size-${size}`],
        styles[`text-${variant}`],
        style,
      ]}
      {...props}
    >
      {children}
    </NativeText>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    base: {
      fontFamily: 'Roboto_400Regular',
    },
    'text-size-body': {
      fontSize: 16,
    },
    'text-size-h1': {
      fontSize: 32,
      marginBottom: 5,
    },
    'text-light': {
      color: theme.text[500],
    },
    'text-dark': {
      color: theme.text[100],
    },
  });
