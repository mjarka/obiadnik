import React, { useEffect, useState } from "react";
import { Chip, Container, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import StrapiAdress from "./StrapiAdress";

export default function Calendar() {
  //
  // Styles overrides
  //
  const useStyles = makeStyles((theme) => ({
    divider: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    chip: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));
  const classes = useStyles();

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
        .get(StrapiAdress + "/recipes")
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

  //
  // Handlers
  //
  const handleRecipeChip = (recipe) => {
    const index = recipes.indexOf(recipe);
    console.log(index);
    // 1. Make a shallow copy of the items
    let items = [...recipes];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[index] };
    // 3. Replace the property you're intested in
    item.isSelected = !item.isSelected;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[index] = item;
    console.log(items);
    // 5. Set the state to our new copy
    setRecipes(items);
    console.log(recipes);

    // axios send to database
    const isSelected = !!item.isSelected;
    axios
      .put(StrapiAdress + "/recipes/" + recipe.id, { isSelected })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <Container>
      Zaznacz przepisy do kupienia
      <Grid container spacing={3} className={classes.divider}>
        <Grid item xs={12} sm={12}>
          {/* Recipes CHIPS */}
          {recipes.map((recipe) => (
            <Chip
              key={recipe.id}
              label={recipe.name}
              color={recipe.isSelected ? "secondary" : ""}
              onClick={() => handleRecipeChip(recipe)}
            />
          ))}
          {/* Recipes CHIPS */}
        </Grid>
      </Grid>
    </Container>
  );
}
