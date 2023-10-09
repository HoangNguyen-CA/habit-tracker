import React, { createContext } from "react";
import defaultTheme from "@/shared/themes/defaultTheme";
import { useState } from "react";

interface ContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ContextValue>({
  theme: defaultTheme,
  setTheme: () => {},
});

export const ThemeContextProvider = (props: { children?: React.ReactNode }) => {
  const [theme, setTheme] = useState(defaultTheme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
