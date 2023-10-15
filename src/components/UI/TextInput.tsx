import { StyleSheet } from 'react-native';
import useTheme from '@/hooks/useTheme';
import { useContext } from 'react';
import { ThemeContext } from '@/context/theme.context';
import { Isao } from 'react-native-textinput-effects';

export default function TextInput({
  label,
  ...props
}: $ElementProps<typeof Isao>) {
  const { theme } = useContext(ThemeContext);
  const styles = useTheme(stylesheet);
  return (
    <Isao
      label={label}
      // this is applied as active border and label color
      activeColor={theme.primary[700]}
      // active border height
      inputStyle={styles.input}
      labelStyle={styles.label}
      // this is applied as passive border and label color
      passiveColor={theme.text[500]}
      {...props}
    />
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    input: {
      fontFamily: 'Roboto_400Regular',
      color: theme.text[500],
    },
    label: {
      fontFamily: 'Roboto_400Regular',
      color: theme.text[500],
    },
  });
