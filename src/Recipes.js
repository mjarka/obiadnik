import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ProductDialog from "./ProductDialog";
import StrapiAdress from "./StrapiAdress";
export default function Recipes() {
  //
  //    STYLES
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
  // STATES
  //
  const [recipe, setRecipe] = useState({
    recipeName: "",
    recipeDescription: "",
  });
  const [recipes, setRecipes] = useState([]);
  const [products, setProducts] = useState([]);
  const [tempProducts, setTempProducts] = useState([]);
  const handleDelete = () => {};

  //
  // HANDLERS
  //
  //
  // Change recipe state based on name and description input
  const handleRecipe = (event) => {
    const value = event.target.value;
    setRecipe({
      ...recipe,
      [event.target.id]: value,
    });
  };

  //
  //    FETCH from database
  //
  useEffect(() => {
    async function fetchMyAPI() {
      axios
        .get(StrapiAdress + "/recipes")
        .then(function (res) {
          setRecipes(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get(StrapiAdress + "/products")
        .then(function (res) {
          setProducts(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchMyAPI();
  }, []);

  //
  // Change values for  temp products
  //
  const handleProductValue = (product, e) => {
    console.log(e.target.value, product);

    // 1. Make a shallow copy of the tempProducts
    let tempProductsCopy = [...tempProducts];
    // 2. Make a shallow copy of the item you want to mutate
    let tempProductCopy = {
      ...tempProductsCopy[tempProducts.indexOf(product)],
    };
    // 3. Replace the property you're intested in
    tempProductCopy.value = e.target.value;

    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    tempProductsCopy[tempProducts.indexOf(product)] = tempProductCopy;
    // 5. Set the state to our new copy

    setTempProducts(tempProductsCopy);
  };

  //
  // Display recipe when chip is clicked
  //
  const handleDisplayRecipe = (recipe) => {
    setRecipe({
      ...recipe,
      recipeName: recipe.name,
      recipeDescription: recipe.Recipe,
    });
    // array of  products ID's from recipe
    const idArray = recipe.productsQuantity.map((quantity) => {
      return quantity.product.id;
    });

    // filter products based on recipe products ID's
    const filteredProducts = products.filter((product) =>
      idArray.includes(product.id)
    );

    setTempProducts(filteredProducts);
    console.log(recipe);
  };
  //
  // Post entry to database
  //
  const handleSubmit = () => {
    //
    // Temp products reformatting for DB purpose
    //
    const productsIdArray = tempProducts.map((item) => {
      const productsQuantity = {};
      productsQuantity.product = item.id;
      productsQuantity.value = item.value;
      return productsQuantity;
    });

    const name = recipe.recipeName;
    const Recipe = recipe.recipeDescription;
    const productsQuantity = productsIdArray;

    axios
      .post(StrapiAdress + "/recipes", {
        name,
        Recipe,
        productsQuantity,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  console.log(tempProducts);
  return (
    <Container>
      <ProductDialog />
      <Grid container className={classes.divider} spacing={3}>
        <Grid item sm={6} xs={12}>
          <Grid item xs={12}>
            <TextField
              id="recipeName"
              label="Nazwa przepisu"
              value={recipe.recipeName}
              onChange={handleRecipe}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} className={classes.divider}>
            <TextField
              id="recipeDescription"
              label="Przepis"
              multiline
              rowsMax={14}
              value={recipe.recipeDescription}
              onChange={handleRecipe}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} className={classes.divider}>
            <Autocomplete
              disablePortal={true}
              fullWidth
              multiple
              size="small"
              id="combo-box-demo"
              options={products}
              value={tempProducts}
              onChange={(event, value) => setTempProducts(value)}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} variant="standard" label="Produkty" />
              )}
            />
          </Grid>

          <Grid item xs={4} sm={4}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SaveIcon />}
              onClick={handleSubmit}
            >
              Zapisz
            </Button>
          </Grid>
        </Grid>
        <Grid item sm={6} xs={12}>
          {tempProducts.length > 0 && (
            <Typography variant="caption" gutterBottom>
              Wpisz ilość produktów
            </Typography>
          )}
          <Grid container>
            {tempProducts.map((product) => (
              <Grid item xs={6}>
                <TextField
                  key={product.id}
                  label={product.name}
                  id="standard-size-small"
                  size="small"
                  helperText={product.unit.name}
                  value={product.value}
                  onChange={(e) => handleProductValue(product, e)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid container className={classes.divider} spacing={3}>
        <Grid item xs={12} sm={12}>
          {recipes.map((recipe) => (
            <Chip
              className={classes.chip}
              key={recipe.id}
              label={recipe.name}
              color="primary"
              onDelete={handleDelete}
              onClick={() => handleDisplayRecipe(recipe)}
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
