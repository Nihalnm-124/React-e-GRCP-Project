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

import AuditForm from "./AuditForm";

const schema = yup.object({

  auditName: yup
    .string()
    .required("Audit Name is required"),

  auditor: yup
    .string()
    .required("Auditor is required"),

  department: yup
    .string()
    .required("Department is required"),

  priority: yup
    .string()
    .required("Priority is required"),

  status: yup
    .string()
    .required("Status is required"),

  startDate: yup
    .string()
    .required("Start Date is required"),

  endDate: yup
    .string()
    .required("End Date is required"),

});

function AuditDialog({
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

      auditName: "",

      auditor: "",

      department: "",

      priority: "Medium",

      status: "Scheduled",

      startDate: "",

      endDate: "",

    },

  });

  useEffect(() => {

    if (selected) {

      reset(selected);

    } else {

      reset({

        auditName: "",

        auditor: "",

        department: "",

        priority: "Medium",

        status: "Scheduled",

        startDate: "",

        endDate: "",

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
          ? "Edit Audit"
          : "Add Audit"}

      </DialogTitle>

      <form
        onSubmit={handleSubmit(onSave)}
      >

        <DialogContent>

          <AuditForm
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
            type="submit"
            variant="contained"
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

export default AuditDialog;