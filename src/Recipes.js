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
          console.log(res.data);
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
  // Post entry to database
  //
  const handleSubmit = () => {
    //
    // Temp products reformatting for DB purpose
    //
    const productsIdArray = tempProducts.map((item) => {
      const productsQuantity = {};
      const container = {};
      container.id = item.id;
      productsQuantity.product = container;
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
              rows={4}
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
                  label={product.name}
                  id="standard-size-small"
                  size="small"
                  helperText={product.unit.name}
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
            <Chip key={recipe.id} label={recipe.name} onDelete={handleDelete} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
