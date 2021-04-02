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
import axios from "axios";
import StrapiAdress from "./StrapiAdress";
import * as Constants from "./constants";

import { groupBy } from "lodash";

export default function BasketCategories(props) {
  //
  // States
  //
  const [products, setProducts] = useState([]);

  //
  // Fetch db
  //
  useEffect(() => {
    async function fetchMyAPI() {
      axios({
        url: StrapiAdress + "/graphql",
        method: "post",
        data: {
          query: Constants.productsQuery,
        },
      })
        .then((res) => {
          console.log(res.data.data);
          setProducts(res.data.data.recipes);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    fetchMyAPI();
  }, []);
  //
  // Take only products from recipes
  //
  const productsArray = products.flatMap((recipe) =>
    recipe.productsQuantity.map((item) => item)
  );
  //
  // group products by category name
  //
  const grouped = groupBy(
    productsArray,
    (product) => product.product.category.name
  );

  //
  // Prepare array of HTML to display with dynamic category name and products
  //
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
          <ListItem key={product.id} role={undefined} button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                checked={product.isTaken}
                // onClick={() =>
                //   handleCheckbox(
                //     props.recipes.indexOf(recipe),
                //     recipe.productsQuantity.indexOf(item),
                //     recipe
                //   )
                // }
              />
            </ListItemIcon>
            <ListItemText
              id={product.id}
              primary={product.product.name}
              secondary={product.value + " " + product.product.unit.name}
            />
          </ListItem>
        ))}
      </>
    );
  }
  console.log(Object.entries(grouped));
  return (
    <Grid item xs={12} sm={12}>
      {items}
      {/* {grouped.map((recipe) => (
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
      ))} */}
    </Grid>
  );
}
