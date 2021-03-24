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
  const [products, setProducts] = useState([]);
  //
  // fetch
  //
  useEffect(() => {
    async function fetchMyAPI() {
      axios
        .get(StrapiAdress + "/recipes?isSelected=true")
        .then(function (res) {
          setRecipes(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    setProducts(
      recipes.flatMap((recipe) =>
        recipe.productsQuantity.flatMap((item) => item)
      )
    );
  }, [recipes]);

  console.log(products);
  return (
    <Container>
      Produkty do kupienia
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {/* PRODUCTS CHIPS */}

          {products.map((product) => (
            <Chip key={product.id} label={product.product.name} />
          ))}
          {/* PRODUCTS CHIPS */}
        </Grid>
      </Grid>
    </Container>
  );
}
