import React from "react";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link as RouterLink } from "react-router-dom";

// appbar icons
import MenuBookIcon from "@material-ui/icons/MenuBook";
import CategoryIcon from "@material-ui/icons/Category";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import DateRangeIcon from "@material-ui/icons/DateRange";

export default function Appbar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6">Obiados</Typography>
          <Hidden xsDown>
            <Button color="inherit" component={RouterLink} to="/products">
              Produkty
            </Button>

            <Button color="inherit" component={RouterLink} to="/recipes">
              Przepisy
            </Button>
            <Button color="inherit" component={RouterLink} to="/calendar">
              Kalendarz
            </Button>
            <Button color="inherit" component={RouterLink} to="/basket">
              Koszyk
            </Button>
          </Hidden>
          <Hidden smUp>
            <IconButton
              aria-label="delete"
              component={RouterLink}
              color="inherit"
              to="/products"
            >
              <FastfoodIcon fontSize="small" />
            </IconButton>

            <IconButton
              aria-label="delete"
              component={RouterLink}
              color="inherit"
              to="/recipes"
            >
              <MenuBookIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              component={RouterLink}
              color="inherit"
              to="/calendar"
            >
              <DateRangeIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              component={RouterLink}
              color="inherit"
              to="/basket"
            >
              <ShoppingBasketIcon fontSize="small" />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
