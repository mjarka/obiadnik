import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { groupBy } from "lodash";
export default function BasketCategories(props) {
  const products = props.recipes;
  //

  //
  // Take only products from recipes
  //
  const productsArray = products.flatMap((recipe) =>
    recipe.productsQuantity.map((item) => ({
      recipeIndex: products.indexOf(recipe),
      productIndex: recipe.productsQuantity.indexOf(item),
      recipeId: recipe.id,
      productName: item.product.name,
      productId: item.id,
      productCategory: item.product.category.name,
      isTaken: item.isTaken,
      productUnit: item.product.unit.name,
      productValue: item.value,
    }))
  );
  // group products by category name

  const grouped = groupBy(productsArray, (product) => product.productCategory);
  // Prepare array of HTML to display with dynamic category name and products

  const items = [];
  for (const [key, value] of Object.entries(grouped)) {
    items.push(
      <>
        <List
          dense
          disablePadding={true}
          subheader={<ListSubheader>{key}</ListSubheader>}
        ></List>
        {value.map((product) => (
          <ListItem key={product.productId} role={undefined} button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                checked={product.isTaken}
                onClick={() =>
                  props.onChange(
                    product.productId,
                    product.recipeId,
                    product.isTaken,
                    product.recipeIndex,
                    product.productIndex
                  )
                }
              />
            </ListItemIcon>
            <ListItemText
              id={product.productId}
              primary={product.productName}
              secondary={product.productValue + " " + product.productUnit}
            />
          </ListItem>
        ))}
      </>
    );
  }
  return (
    <Grid item xs={12} sm={12}>
      {items}
    </Grid>
  );
}
