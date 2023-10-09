import { ThemeContext } from "@/context/theme.context";
import { useContext, useMemo } from "react";

export default function useTheme<T>(styleSheet: (_: Theme) => T) {
  const { theme } = useContext(ThemeContext);
  const styles = useMemo(() => styleSheet(theme), [theme]);
  return styles;
}
