import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import ProcurementForm from "./ProcurementForm";

const schema = yup.object({
  title: yup.string().required("Title is required"),

  vendor: yup.string().required("Vendor is required"),

  department: yup
    .string()
    .required("Department is required"),

  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),

  status: yup.string().required(),

  date: yup.string().required("Date is required"),
});

function ProcurementDialog({
  open,
  onClose,
  onSave,
  selected,
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      title: "",
      vendor: "",
      department: "",
      amount: "",
      status: "Pending",
      date: "",
    },
  });

  useEffect(() => {
    if (selected) {
      reset(selected);
    } else {
      reset({
        title: "",
        vendor: "",
        department: "",
        amount: "",
        status: "Pending",
        date: "",
      });
    }
  }, [selected, reset]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {selected
          ? "Edit Procurement"
          : "Add Procurement"}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSave)}>
        <DialogContent>

          <ProcurementForm
            control={control}
            errors={errors}
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            type="submit"
          >
            {selected ? "Update" : "Save"}
          </Button>

        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ProcurementDialog;