import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React from "react";

export default function CategoriesDialog(props) {
  const handleCategoryAdd = (event) => {
    event.preventDefault();
    props.onValueChange({
      name: props.tempCategory.name,
      color: "Test",
    });

    handleClose();
  };

  const handleClose = () => {
    props.onChange({
      name: "",
      color: "",
    });

    props.onToggle(false);
  };
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleCategoryAdd}>
        <DialogTitle id="form-dialog-title">Dodaj kategorię</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Brakuje kategorii? Dodaj ją tutaj
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={props.tempCategory.name}
            onChange={(event) =>
              props.onChange({
                ...props.tempCategory,
                name: event.target.value,
              })
            }
            label="nazwa"
            type="text"
          />
          <TextField
            margin="dense"
            id="name"
            value={props.tempCategory.color}
            onChange={(event) =>
              props.onChange({
                ...props.tempCategory,
                color: event.target.value,
              })
            }
            label="kolor"
            type="string"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
