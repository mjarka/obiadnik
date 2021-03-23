import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#682D63",
    },
  },
});

export default theme;
