import React from "react";
import { Chip, makeStyles } from "@material-ui/core";
import invert from "invert-color";
const useStyles = makeStyles((theme) => ({
  root: {
    // "&&:hover": {
    //   backgroundColor: "purple",
    // },
    // "&&:focus": {
    //   backgroundColor: (props) => invert(props.background),
    // },
    background: (props) => props.background,
    color: (props) => invert(props.background, true),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function ProductChip(props) {
  const { background, children, ...other } = props;
  const classes = useStyles(props);
  return <Chip className={classes.root} {...other} />;
}

export default ProductChip;
