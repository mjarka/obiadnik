import React, { useState, useEffect } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import BasketRecipes from "./BasketRecipes";
import BasketCategories from "./BasketCategories";
import * as Constants from "./constants";
import { useQuery, useMutation } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  section: {
    margin: theme.spacing(3, 1, 1),
  },
}));

export default function Basket() {
  const classes = useStyles();
  //
  // States
  //
  const [units, setUnits] = useState([]);
  const [isCategoryView, setIscategoryView] = useState(false);
  //
  // Pass units to child component to display unit and value
  //
  const itemUnit = (itemUnit) => {
    return units
      .filter((units) => units.id === itemUnit)
      .map((unit) => unit.name);
  };

  //
  // fetch
  //
  const { loading, error, data, refetch } = useQuery(Constants.productsQuery);
  const [updateCheckbox] = useMutation(Constants.updateCheckbox);
  useEffect(() => {
    refetch();
  }, []);
  if (loading) return "Loading...";
  if (error) return `Error! ${error}`;

  //
  // Pass sate changing function to child props
  //
  const handleRecipeChange = async (
    productId,
    recipeId,
    isTaken,
    recipeIndex,
    productIndex
  ) => {
    // WORKING CATEGORIES FETCH
    const changedProduct = { id: productId, isTaken: !isTaken };
    const productsArray = data.recipes[recipeIndex].productsQuantity.map(
      (product) => ({
        id: product.id,
        isTaken: product.isTaken,
      })
    );
    productsArray[productIndex] = changedProduct;
    await updateCheckbox({
      variables: {
        recipeId: recipeId,
        productIds: productsArray,
      },
    });
    await refetch();
  };

  return (
    <Container>
      {/* Check if recipes is empty - print string */}
      <Typography
        variant="h5"
        gutterBottom
        className={classes.section}
      ></Typography>
      <Button
        color="primary"
        variant="contained"
        onClick={() => setIscategoryView(!isCategoryView)}
      >
        {isCategoryView ? "Włącz widok kategorii" : "Włącz widok przepisów"}
      </Button>
      <Grid container spacing={3}>
        {isCategoryView ? (
          <BasketRecipes
            recipes={data.recipes}
            itemUnit={itemUnit}
            onChange={handleRecipeChange}
          />
        ) : (
          <BasketCategories
            recipes={data.recipes}
            onChange={handleRecipeChange}
          />
        )}
      </Grid>
    </Container>
  );
}
