import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function SendBackDialog({
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
        Send Back Request
      </DialogTitle>

      <DialogContent>

        <DialogContentText>
          Do you want to send this
          request back for revision?
        </DialogContentText>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="warning"
          onClick={onConfirm}
        >
          Send Back
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default SendBackDialog;