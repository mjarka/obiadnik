import React from "react";
import { Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: (props) => props.color,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function ProductChip(props) {
  const { color, children, ...other } = props;
  const classes = useStyles(props);
  return <Chip className={classes.root} {...other} />;
}

export default ProductChip;
