import React, { useEffect, useState } from "react";
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
import { useQuery, useMutation, gql } from "@apollo/client";
import * as Constants from "./constants";
import update from "immutability-helper";
import RemoveDialog from "./RemoveDialog";
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
  const [recipe, setRecipe] = useState("");
  const [values, setValues] = useState({});
  const [recipeName, setRecipeName] = useState([""]);
  const [recipeDescription, setRecipeDescription] = useState([""]);
  const [tempProducts, setTempProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [chipRecipeId, setChipRecipeId] = useState("");

  useEffect(() => {
    setRecipeName(recipe.name);
    setRecipeDescription(recipe.Recipe);
  }, [recipe]);

  //
  //    Add graphql query
  //
  const { loading, error, data, refetch } = useQuery(Constants.recipes);
  const [createRecipe] = useMutation(Constants.createRecipe);
  const [updateRecipe] = useMutation(Constants.updateRecipe);
  const [deleteRecipe] = useMutation(Constants.deleteRecipe);
  if (loading) return "Loading...";

  //
  // HANDLERS
  //
  //

  //
  // Change values for  temp products
  //
  const handleProductValue = (product, e) => {
    product.id in values
      ? setValues(update(values, { [product.id]: { $set: e.target.value } }))
      : setValues({ ...values, [product.id]: e.target.value });
  };

  // Change recipe state based on name and description input
  const handleRecipeName = (event) => {
    setRecipeName(event.target.value);
  };
  const handleRecipeDescription = (event) => {
    setRecipeDescription(event.target.value);
  };

  // dialog opener
  const handleDialog = (recipeId) => {
    setIsDialogOpen(!isDialogOpen);
    setChipRecipeId(recipeId);
  };

  // delete chip when "x" is clicked
  const handleChipDelete = async () => {
    await deleteRecipe({
      variables: {
        recipeId: chipRecipeId,
      },
    });
    dialogToggler();
    await refetch();
  };
  // Togger to open/close dialog when chip is clicked
  const dialogToggler = () => setIsDialogOpen(!isDialogOpen);

  //
  // Display recipe when chip is clicked
  //
  const handleDisplayRecipe = (recipe) => {
    setRecipe(recipe);

    // array of  products ID's from recipe
    const tempValues = recipe.productsQuantity.flatMap((quantity) => {
      return { [quantity.product.id]: quantity.value };
    });

    setValues(tempValues.reduce((obj, item) => Object.assign(obj, item), {}));
    const idArray = recipe.productsQuantity.map((quantity) => {
      return quantity.product.id;
    });
    // filter products based on recipe products ID's
    const filteredProducts = data.products.filter((product) =>
      idArray.includes(product.id)
    );
    setTempProducts(filteredProducts);
  };

  // Post entry to database
  //
  const handleSubmit = () => {
    const graphqlValues = Object.entries(values).flatMap(([k, v]) => [
      { value: v, product: k },
    ]);
    // update or create based on name of the recipe
    if (data.recipes.some((recipe) => recipe.name === recipeName)) {
      updateRecipe({
        variables: {
          recipeId: recipe.id,
          recipeName: recipeName,
          recipeDescription: recipeDescription,
          productIds: graphqlValues,
        },
      });
    } else {
      createRecipe({
        variables: {
          recipeName: recipeName,
          recipeDescription: recipeDescription,
          productIds: graphqlValues,
        },
      });
    }
    refetch();
  };

  return (
    <Container>
      <ProductDialog />
      <Grid container className={classes.divider} spacing={3}>
        <Grid item sm={6} xs={12}>
          <Grid item xs={12}>
            <TextField
              id="recipeName"
              label="Nazwa przepisu"
              value={recipeName || ""}
              onChange={handleRecipeName}
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
              value={recipeDescription || ""}
              onChange={handleRecipeDescription}
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
              options={data.products}
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
              disabled={!recipeName || false}
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SaveIcon />}
              onClick={handleSubmit}
            >
              {data.recipes.some((recipe) => recipe.name === recipeName)
                ? "Aktualizuj"
                : "Dodaj"}
            </Button>
            <RemoveDialog
              isOpen={isDialogOpen}
              toggler={dialogToggler}
              onDelete={handleChipDelete}
              title={"Chcesz usunąć ten przepis?"}
            />
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
              <Grid item xs={6} key={product.id}>
                <TextField
                  key={product.id}
                  label={product.name}
                  id="standard-size-small"
                  size="small"
                  value={values[product.id] || ""}
                  helperText={product.unit.name}
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
          {data.recipes.map((recipe) => (
            <Chip
              className={classes.chip}
              key={recipe.id}
              label={recipe.name}
              variant="outlined"
              color="primary"
              onDelete={() => handleDialog(recipe.id)}
              onClick={() => handleDisplayRecipe(recipe)}
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
