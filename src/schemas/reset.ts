import * as yup from "yup";

const emailResetRules = yup
  .string()
  .email("Invalid type of email")
  .min(5, "Email must be at least 5 characters long")
  .max(50, "Email must not exceed 50 characters")
  .required("Email is required");

export const resetSchema = yup.object().shape({
  email: emailResetRules,
});
