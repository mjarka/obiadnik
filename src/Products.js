import React, { useEffect, useState } from "react";
import { Chip, Container, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import StrapiAdress from "./StrapiAdress";
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
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("");
  const [categoryId, setCategoryId] = useState("1");
  const [categories, setCategories] = useState([]);
  const [unitName, setUnitName] = useState("");
  const [units, setUnits] = useState([]);
  const [unitId, setUnitId] = useState("1");
  const [productName, setProductName] = useState([]);
  const [productId, setProductId] = useState([]);
  const [products, setProducts] = useState([]);
  const handleDelete = () => {};

  //
  //    FETCH
  //
  useEffect(() => {
    async function fetchMyAPI() {
      axios
        .get(StrapiAdress + "/products?_sort=category:ASC")
        .then(function (res) {
          setProducts(res.data);
          console.log(res.data);
        })

        .catch(function (error) {
          console.log(error);
        });
      axios
        .get(StrapiAdress + "/units")
        .then(function (res) {
          setUnits(res.data);
          setUnitName(res.data[0].name);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get(StrapiAdress + "/categories")
        .then(function (res) {
          setCategories(res.data);
          setCategoryName(res.data[0].name);
          setCategoryColor(res.data[0].color);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchMyAPI();
  }, []);

  //
  //    functions
  //

  const handleCategoryIdChange = (id, color) => {
    setCategoryId(id);
    setCategoryColor(color);
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
  const handleCategoryChange = (event) => {
    setCategoryName(event.target.value);
  };

  // updating product values after chip is clicked
  const editProduct = (product, event) => {
    setProductName(product.name);
    setProductId(product.id);
    setCategoryName(product.category.name);
    setUnitName(product.unit.name);
  };
  //
  // Post entry to database
  //
  const handleSubmit = () => {
    const name = productName;
    const unit = unitId;
    const category = categoryId;
    // check if name is already in database
    // put to database if already exist
    if (products.some((e) => e.name === name)) {
      console.log("już mam takie coś");
      axios
        .put(StrapiAdress + "/products/" + productId, { name, category, unit })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
    }
    // post to database if this is new entry
    else {
      axios
        .post(StrapiAdress + "/products", { name, category, unit })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
      // Update chips after SAVE is clicked
      setProducts((prevState) => [
        ...prevState,
        { name, category: { color: categoryColor } },
      ]);
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
            {units.map((unit) => (
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
          <TextField
            id="category"
            select
            label="Wybierz kategorię"
            value={categoryName}
            fullWidth
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.id}
                value={category.name}
                onClick={() =>
                  handleCategoryIdChange(category.id, category.color)
                }
              >
                {category.name}
              </MenuItem>
            ))}
          </TextField>
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

      {products.map((product) => (
        <Chip
          className={classes.chip}
          color={"primary"}
          key={product.id}
          label={product.name}
          onDelete={handleDelete}
          deleteIcon={<EditIcon />}
          onClick={(e) => editProduct(product, e)}
        />
      ))}
      {/* PRODUCTS CHIPS */}
    </Container>
  );
}
