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

import VendorForm from "./VendorForm";

const schema = yup.object({
  company: yup
    .string()
    .required("Company name is required"),

  contact: yup
    .string()
    .required("Contact person is required"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  phone: yup
    .string()
    .required("Phone is required"),

  country: yup
    .string()
    .required("Country is required"),

  category: yup
    .string()
    .required("Category is required"),

  rating: yup
    .number()
    .typeError("Rating must be a number")
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5")
    .required("Rating is required"),

  risk: yup
    .string()
    .required("Risk level is required"),

  status: yup
    .string()
    .required("Status is required"),
});

function VendorDialog({
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
      company: "",
      contact: "",
      email: "",
      phone: "",
      country: "",
      category: "",
      rating: 1,
      risk: "Low",
      status: "Active",
    },
  });

  useEffect(() => {
    if (selected) {
      reset(selected);
    } else {
      reset({
        company: "",
        contact: "",
        email: "",
        phone: "",
        country: "",
        category: "",
        rating: 1,
        risk: "Low",
        status: "Active",
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
          ? "Edit Vendor"
          : "Add Vendor"}
      </DialogTitle>

      <form
        onSubmit={handleSubmit(onSave)}
      >
        <DialogContent>

          <VendorForm
            control={control}
            errors={errors}
          />

        </DialogContent>

        <DialogActions>

          <Button
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            type="submit"
          >
            {selected
              ? "Update"
              : "Save"}
          </Button>

        </DialogActions>

      </form>
    </Dialog>
  );
}

export default VendorDialog;