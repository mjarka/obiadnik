import "./App.css";
import Container from "@material-ui/core/Container";
import Appbar from "./Appbar";
import Products from "./Products";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "fontsource-roboto";
import Recipes from "./Recipes";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Paper } from "@material-ui/core";
import theme from "./Theme";
import Calendar from "./Calendar";
import Basket from "./Basket";
import Apollotest from "./Apollotest";
import { ApolloProvider } from "@apollo/client/react";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
export default function App() {
  const client = new ApolloClient({
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router basename={process.env.PUBLIC_URL}>
            <Container maxWidth="md" disableGutters={true}>
              <Paper elevation={3}>
                <Appbar />
                <Switch>
                  <Route exact path={["/products", "/"]}>
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
                  <Route path="/apollo">
                    <Apollotest />
                  </Route>
                </Switch>
              </Paper>
            </Container>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}
