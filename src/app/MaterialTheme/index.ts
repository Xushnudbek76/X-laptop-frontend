import { createTheme } from "@mui/material/styles";
import { common } from "@mui/material/colors";
import shadow from "./shadow";
import typography from "./typography";

/**
 * X-LAPTOP THEME
 * Dark tech aesthetic with electric blue accent
 */
const xlaptop = {
  palette: {
    mode: "light" as const,
    background: {
      default: "#f8f9ff",
      paper: common.white,
    },
    primary: {
      contrastText: common.white,
      main: "#1a1a2e", // deep navy
    },
    secondary: {
      contrastText: common.white,
      main: "#3b82f6", // electric blue
    },
    text: {
      primary: "#1a1a2e",
      secondary: "#3b82f6",
      // @ts-ignore
      dark: common.black,
      muted: "#64748b",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "100%",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: {
          background: "#f8f9ff",
          height: "100%",
          minHeight: "100%",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none" as const,
          fontWeight: 600,
        },
      },
    },
  },
  shadow,
  typography,
};

let theme = createTheme(xlaptop);
theme = createTheme(theme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          [theme.breakpoints.up("lg")]: {
            maxWidth: "1300px",
          },
        },
      },
    },
  },
});

export default theme;
