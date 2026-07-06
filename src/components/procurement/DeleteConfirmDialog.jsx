import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete Procurement
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this
          procurement?

          <br />
          <br />

          This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
        >
          Delete
        </Button>

      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmDialog;