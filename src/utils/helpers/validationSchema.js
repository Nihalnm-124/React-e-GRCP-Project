import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid Email Address")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must contain at least 6 characters")
    .required("Password is required"),
});