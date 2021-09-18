import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@material-ui/core";
import React from "react";

export default function RemoveDialog(props) {
  return (
    <Dialog
      open={props.isOpen}
      //   TransitionComponent={Transition}
      keepMounted
      //   onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Ta akcja jest nieodwracalna. Nie będziesz płakać?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onDelete}>
          Usuń
        </Button>
        <Button color="primary" onClick={props.toggler}>
          Anuluj
        </Button>
      </DialogActions>
    </Dialog>
  );
}
