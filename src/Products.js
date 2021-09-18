import React, { useState } from "react";
import { Chip, Container, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import * as Constants from "./constants";
import { useQuery, gql, useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import CategoriesDialog from "./CategoriesDialog";
import RemoveDialog from "./RemoveDialog";

export default function Products() {
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
  //    States
  //
  const filter = createFilterOptions();
  const [value, setValue] = useState(null);

  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("1");
  const [unitName, setUnitName] = useState("");
  const [unitId, setUnitId] = useState("1");
  const [productName, setProductName] = useState([]);
  const [productId, setProductId] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [products, setProducts] = useState([]);
  const [tempCategory, setTempCategory] = useState({
    name: "",
    color: "",
  });
  const [open, toggleOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //
  //    graphql
  //
  const { loading, error, data, refetch } = useQuery(Constants.products);
  const [createProduct] = useMutation(Constants.createProduct);
  const [createCategory] = useMutation(Constants.createCategory);
  const [deleteProduct] = useMutation(Constants.deleteProduct);
  if (loading) return "Loading...";
  //
  //    functions
  //

  // delete chip when "x" is clicked
  const handleDelete = (id) => {
    dialogToggler();
    setDeleteId(id);
  };
  const deleteChip = async () => {
    await deleteProduct({
      variables: {
        productId: deleteId,
      },
    });
    dialogToggler();
    await refetch();
    setCategoryName("");
    setProductName("");
    setUnitName("");
  };

  const handleUnitIdChange = (event) => {
    setUnitId(event);
  };
  const handleUnitChange = (event) => {
    setUnitName(event.target.value);
  };
  const handleProductChange = (event) => {
    setProductName(event.target.value);
  };
  const dialogToggler = () => setIsDialogOpen(!isDialogOpen);
  function handleTempCategory(newValue) {
    setTempCategory(newValue);
  }
  function onValueChange(newValue) {
    setValue(newValue);
    createCategory({ variables: { categoryName: newValue.name } });
    refetch();
  }
  function onNewCategory(newcat) {}
  function toggleOpenChange(newValue) {
    toggleOpen(newValue);
  }
  // updating product values after chip is clicked
  const editProduct = (product) => {
    setProductName(product.name);
    setProductId(product.id);
    setCategoryName(product.category.name);
    setUnitName(product.unit.name);
  };
  //
  // Post entry to database
  //
  const handleSubmit = () => {
    const variables = {
      name: productName,
      category: categoryId,
      unit: unitId,
    };
    // check if name is already in database
    // put to database if already exist
    if (products.some((e) => e.name === productName)) {
      console.log("już mam takie coś");
    }
    // post to database if this is new entry
    else {
      createProduct({ variables: variables });
      // Update chips after SAVE is clicked
      refetch();
    }
  };
  return (
    <Container>
      <Grid container spacing={3} className={classes.divider}>
        <Grid item xs={12} sm={4}>
          <TextField
            id="standard-basic"
            label="Wpisz nazwę produktu"
            fullWidth
            value={productName}
            onChange={handleProductChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            id="unit"
            select
            label="Wybierz jednostkę"
            value={unitName}
            fullWidth
            onChange={handleUnitChange}
          >
            {data.units.map((unit) => (
              <MenuItem
                key={unit.id}
                value={unit.name}
                onClick={() => handleUnitIdChange(unit.id)}
              >
                {unit.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Autocomplete
            value={categoryName}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                // timeout to avoid instant validation of the dialog's form.
                setTimeout(() => {
                  toggleOpen(true);
                  setTempCategory({
                    name: newValue,
                    color: "wybierz kolor",
                  });
                });
              } else if (newValue && newValue.inputValue) {
                toggleOpen(true);
                setTempCategory({
                  name: newValue.inputValue,
                  color: "wybierz kolor",
                });
              } else {
                setCategoryName(newValue.name);
                setCategoryId(newValue.id);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              if (params.inputValue !== "") {
                filtered.push({
                  inputValue: params.inputValue,
                  name: `Dodaj "${params.inputValue}"`,
                });
              }
              return filtered;
            }}
            id="wpisz kategorię"
            options={data.categories}
            getOptionLabel={(option) => {
              // e.g value selected with enter, right from the input
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.name;
            }}
            selectOnFocus
            clearOnBlur
            getOptionSelected={(option, value) => option.name === value}
            handleHomeEndKeys
            renderOption={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Wybierz kategorię" />
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
      {/* PRODUCTS CHIPS */}

      {data.products.map((product) => (
        <Chip
          className={classes.chip}
          color={"primary"}
          key={product.id}
          variant="outlined"
          label={product.name}
          onDelete={() => handleDelete(product.id)}
          // deleteIcon={<EditIcon />}
          onClick={(e) => editProduct(product, e)}
        />
      ))}
      {/* PRODUCTS CHIPS */}

      <RemoveDialog
        isOpen={isDialogOpen}
        toggler={dialogToggler}
        onDelete={deleteChip}
        title={"Chcesz usunąć ten produkt?"}
      />
      <CategoriesDialog
        onChange={handleTempCategory}
        tempCategory={tempCategory}
        onValueChange={onValueChange}
        onToggle={toggleOpenChange}
        open={open}
        addCategory={onNewCategory}
      />
    </Container>
  );
}
