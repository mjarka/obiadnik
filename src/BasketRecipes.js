import React from "react";
import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import StrapiAdress from "./StrapiAdress";

import axios from "axios";

export default function BasketRecipes(props) {
  const handleCheckbox = (index, id, recipe) => {
    // 1. Make a shallow copy of the items
    let tempRecipes = [...props.recipes];
    // // 2. Make a shallow copy of the item you want to mutate
    let tempRecipe = { ...tempRecipes[index] };
    // // 3. Replace the property you're intested in
    tempRecipe.productsQuantity[id].isTaken = !tempRecipe.productsQuantity[id]
      .isTaken;
    // // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    tempRecipes[index] = tempRecipe;
    // 5. Set the state to our new copy

    props.onChange(tempRecipes);

    axios.put(StrapiAdress + "/recipes/" + recipe.id, recipe).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  return (
    <Grid item xs={12} sm={12}>
      {props.recipes.map((recipe) => (
        <>
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
                    handleCheckbox(
                      props.recipes.indexOf(recipe),
                      recipe.productsQuantity.indexOf(item),
                      recipe
                    )
                  }
                />
              </ListItemIcon>
              <ListItemText
                id={item.id}
                primary={item.product.name}
                secondary={item.value + " " + props.itemUnit(item.product.unit)}
              />
            </ListItem>
          ))}
        </>
      ))}
    </Grid>
  );
}
