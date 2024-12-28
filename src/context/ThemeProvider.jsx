import React, { createContext } from "react";
import { ConfigProvider } from "antd";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const themeConfig = {
    token: {
      colorPrimary: "#1d3557", // Custom primary color
      colorItemSelectedBg: "#1d3557", // Custom selected background
      colorItemSelectedText: "#ffffff", // Custom selected text color
    },
  };

  return (
    <ThemeContext.Provider value={themeConfig}>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
