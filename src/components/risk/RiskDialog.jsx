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

import RiskForm from "./RiskForm";

const schema = yup.object({

  title: yup
    .string()
    .required("Risk title is required"),

  owner: yup
    .string()
    .required("Owner is required"),

  category: yup
    .string()
    .required("Category is required"),

  probability: yup
    .number()
    .required("Probability is required"),

  impact: yup
    .number()
    .required("Impact is required"),

  severity: yup
    .string()
    .required("Severity is required"),

  status: yup
    .string()
    .required("Status is required"),

  dueDate: yup
    .string()
    .required("Due Date is required"),

});

function RiskDialog({
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

      owner: "",

      category: "Cyber Security",

      probability: 1,

      impact: 1,

      severity: "Low",

      status: "Open",

      dueDate: "",

    },

  });

  useEffect(() => {

    if (selected) {

      reset(selected);

    } else {

      reset({

        title: "",

        owner: "",

        category: "Cyber Security",

        probability: 1,

        impact: 1,

        severity: "Low",

        status: "Open",

        dueDate: "",

      });

    }

  }, [selected, reset]);

  function submit(data) {

    const score =
      Number(data.probability) *
      Number(data.impact);

    onSave({
      ...data,
      score,
    });

  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >

      <DialogTitle>

        {selected
          ? "Edit Risk"
          : "Add Risk"}

      </DialogTitle>

      <form
        onSubmit={handleSubmit(submit)}
      >

        <DialogContent>

          <RiskForm
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

export default RiskDialog;