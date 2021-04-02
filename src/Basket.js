import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import StrapiAdress from "./StrapiAdress";
import BasketRecipes from "./BasketRecipes";
import BasketCategories from "./BasketCategories";

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
  const [recipes, setRecipes] = useState([]);
  const [units, setUnits] = useState([]);
  const [isCategoryView, setIscategoryView] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  //
  // Pass units to child component to display unit and value
  //
  const itemUnit = (itemUnit) => {
    return units
      .filter((units) => units.id === itemUnit)
      .map((unit) => unit.name);
  };

  //
  // Pass sate changing function to child props
  //
  function handleRecipeChange(newValue) {
    setRecipes(newValue);
  }

  //
  // fetch
  //
  useEffect(() => {
    async function fetchMyAPI() {
      axios
        .get(StrapiAdress + "/recipes?isSelected=true")
        .then(function (res) {
          setRecipes(res.data);
          setIsFetched(true);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get(StrapiAdress + "/units")
        .then(function (res) {
          setUnits(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchMyAPI();
  }, []);

  return (
    <Container>
      {/* Check if recipes is empty - print string */}
      <Typography variant="h5" gutterBottom className={classes.section}>
        {isFetched
          ? !recipes.length
            ? "Nie ma żadnych produktów - znaznacz przepisy w kalendarzu"
            : "Produkty do kupienia"
          : "Poczekaj chwilkę..."}
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => setIscategoryView(!isCategoryView)}
      >
        {isCategoryView ? "Włącz widok kategorii" : "Włącz widok przepisów"}
      </Button>
      <Grid container spacing={3}>
        {isCategoryView ? (
          <BasketRecipes
            recipes={recipes}
            itemUnit={itemUnit}
            onChange={handleRecipeChange}
          />
        ) : (
          <BasketCategories recipes={recipes} />
        )}
      </Grid>
    </Container>
  );
}
