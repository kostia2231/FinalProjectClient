import * as yup from "yup";

const passwordRules = yup
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(20, "Password must not exceed 20 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  )
  .matches(/^\S*$/, "Password must not contain spaces")
  .required("Password is required");

const emailRules = yup
  .string()
  .email("Invalid email address")
  .required("Email is required")
  .min(5, "Email must be at least 5 characters long")
  .max(50, "Email must not exceed 50 characters")
  .matches(/^\S*$/, "Email must not contain spaces")
  .matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Email must be in a valid format like user@example.com"
  );

export const loginSchema = yup.object().shape({
  username: emailRules,
  password: passwordRules,
});
