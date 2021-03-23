import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
export default function ProductDialog() {
  //
  // STATES
  //
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [dialogValue, setDialogValue] = React.useState({
    title: "",
    year: "",
  });
  //
  // HANDLES
  //
  const handleClose = () => {
    setDialogValue({
      title: "",
      year: "",
    });

    toggleOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      year: parseInt(dialogValue.year, 10),
    });

    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Dodaj nowy produkt</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Zabrakło produktu na liście? Dodaj go!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={dialogValue.title}
            onChange={(event) =>
              setDialogValue({ ...dialogValue, title: event.target.value })
            }
            label="Nazwa"
            type="text"
          />
          <TextField
            margin="dense"
            id="name"
            value={dialogValue.year}
            onChange={(event) =>
              setDialogValue({ ...dialogValue, year: event.target.value })
            }
            label="Kategoria"
            type="text"
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
