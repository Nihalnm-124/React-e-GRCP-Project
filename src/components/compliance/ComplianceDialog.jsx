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

import ComplianceForm from "./ComplianceForm";

const schema = yup.object({

  policy: yup
    .string()
    .required("Policy is required"),

  control: yup
    .string()
    .required("Control is required"),

  owner: yup
    .string()
    .required("Owner is required"),

  framework: yup
    .string()
    .required("Framework is required"),

  status: yup
    .string()
    .required("Status is required"),

  reviewDate: yup
    .string()
    .required("Review Date is required"),

  evidence: yup
    .string()
    .required("Evidence is required"),

});

function ComplianceDialog({
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

      policy: "",

      control: "",

      owner: "",

      framework: "ISO 27001",

      status: "Compliant",

      reviewDate: "",

      evidence: "",

    },

  });

  useEffect(() => {

    if (selected) {

      reset(selected);

    } else {

      reset({

        policy: "",

        control: "",

        owner: "",

        framework: "ISO 27001",

        status: "Compliant",

        reviewDate: "",

        evidence: "",

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
          ? "Edit Compliance"
          : "Add Compliance"}

      </DialogTitle>

      <form
        onSubmit={handleSubmit(onSave)}
      >

        <DialogContent>

          <ComplianceForm
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

export default ComplianceDialog;