import { createMuiTheme } from "@material-ui/core";

const Theme = createMuiTheme({
  palette: {
    background: {
      main: "#0F0F0F",
      light: "#1F1F1F",
    },
    primary: {
      main: "rgb(19,211,142, 0.7)",
    },
    secondary: {
      main: "#fff",
      dark: "#2A2A2A",
    },
    text: {
      secondary: "#9A9494",
    },
  },
  overrides: {
    // in this object you can override css classes
    MuiTableHead: {
      // overriding of MuiTableHead
      root: {
        //overriding root
        background: "#2A2A2A",
      },
    },
  },
});

export default Theme;
