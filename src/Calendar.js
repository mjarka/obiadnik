import React, { useEffect, useState } from "react";
import { Chip, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useQuery, useMutation } from "@apollo/client";
import * as Constants from "./constants";

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
    section: {
      margin: theme.spacing(3, 1, 1),
    },
  }));
  const classes = useStyles();

  //
  // States
  //

  //
  // fetch
  //
  const { loading, error, data, refetch } = useQuery(Constants.calendar, {});
  const [updateCalendar] = useMutation(Constants.updateCalendar);

  if (loading) return "Loading...";
  // if (error) return `Error! ${error}`;

  //
  // Handlers
  //
  const handleRecipeChip = (recipe) => {
    console.log(recipe);
    updateCalendar({
      variables: {
        recipeId: recipe.id,
        isSelected: !recipe.isSelected,
      },
    });
    // refetch();
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom className={classes.section}>
        Zaznacz przepisy do kupienia
      </Typography>

      <Grid container spacing={3} className={classes.divider}>
        <Grid item xs={12} sm={12}>
          {/* Recipes CHIPS */}
          {data.recipes.map((recipe) => (
            <Chip
              className={classes.chip}
              key={recipe.id}
              variant={recipe.isSelected ? "default" : "outlined"}
              label={recipe.name}
              color={recipe.isSelected ? "primary" : "default"}
              onClick={() => handleRecipeChip(recipe)}
            />
          ))}
          {/* Recipes CHIPS */}
        </Grid>
      </Grid>
    </Container>
  );
}
