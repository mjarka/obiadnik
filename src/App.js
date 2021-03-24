import "./App.css";
import Container from "@material-ui/core/Container";
import Appbar from "./Appbar";
import Products from "./Products";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Recipes from "./Recipes";
import { ThemeProvider } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import theme from "./Theme";
import Calendar from "./Calendar";
import Basket from "./Basket";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router basename={process.env.PUBLIC_URL>
          <Container maxWidth="md" disableGutters="true">
            <Paper elevation={3}>
              <Appbar />
              <Switch>
                <Route path="/products">
                  <Products />
                </Route>

                <Route path="/recipes">
                  <Recipes />
                </Route>
                <Route path="/calendar">
                  <Calendar />
                </Route>
                <Route path="/basket">
                  <Basket />
                </Route>
              </Switch>
            </Paper>
          </Container>
        </Router>
      </ThemeProvider>
    </>
  );
}
