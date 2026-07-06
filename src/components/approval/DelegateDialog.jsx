import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import { useState } from "react";

function DelegateDialog({
  open,
  onClose,
  onConfirm,
}) {

  const [user, setUser] =
    useState("");

  function handleDelegate() {

    onConfirm(user);

    setUser("");

  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >

      <DialogTitle>
        Delegate Request
      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          label="Delegate To"
          value={user}
          onChange={(e) =>
            setUser(
              e.target.value
            )
          }
          margin="normal"
        />

      </DialogContent>

      <DialogActions>

        <Button
          onClick={() => {

            setUser("");

            onClose();

          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={
            handleDelegate
          }
        >
          Delegate
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default DelegateDialog;