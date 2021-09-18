import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";

export default function BasketRecipes(props) {
  const [recipesList, setRecipesList] = useState();

  const handleCheckbox = (index, id, recipe) => {};

  useEffect(() => {
    setRecipesList(
      props.recipes.map((recipe) => (
        <div key={recipe.id}>
          <List
            dense
            disablePadding={true}
            subheader={<ListSubheader>{recipe.name}</ListSubheader>}
          ></List>

          {recipe.productsQuantity.map((item) => (
            <ListItem key={item.id} role={undefined} button>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                  checked={item.isTaken}
                  onClick={() =>
                    props.onChange(
                      item.id,
                      recipe.id,
                      item.isTaken,
                      props.recipes.indexOf(recipe),
                      recipe.productsQuantity.indexOf(item)
                    )
                  }
                />
              </ListItemIcon>
              <ListItemText
                id={item.id}
                primary={item.product.name}
                secondary={item.value + " " + item.product.unit.name}
              />
            </ListItem>
          ))}
        </div>
      ))
    );
  }, [props.recipes]);

  return (
    <Grid item xs={12} sm={12}>
      {recipesList}
    </Grid>
  );
}
