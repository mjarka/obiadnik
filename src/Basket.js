import React, { useEffect, useState } from "react";
import { Chip, Container, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import StrapiAdress from "./StrapiAdress";
export default function Basket() {
  //
  // States
  //
  const [recipes, setRecipes] = useState([]);
  //
  // fetch
  //
  useEffect(() => {
    async function fetchMyAPI() {
      axios
        .get(StrapiAdress + "/recipes?isSelected=true")
        .then(function (res) {
          setRecipes(res.data);
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchMyAPI();
  }, []);
  console.log(recipes);

  const recipesProducts = recipes.map((recipe) =>
    recipe.productsQuantity.map((product) => product.product)
  );

  console.log(recipesProducts);
  return (
    <Container>
      Produkty do kupienia
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}></Grid>
      </Grid>
    </Container>
  );
}
