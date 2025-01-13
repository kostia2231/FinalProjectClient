import * as yup from "yup";

const nameRules = yup
  .string()
  .max(50, "Full name can`t exceed 50 characters")
  .matches(/^[a-zA-Z\s]*$/, "Full name must contain only letters and spaces")
  .required("Full name is required");

const usernameRules = yup
  .string()
  .required("Username is required")
  .test("is-email-or-username", "Invalid username", (value) => {
    if (yup.string().email().isValidSync(value)) {
      return true;
    }
    return /^[a-zA-Z0-9]*$/.test(value);
  })
  .min(5, "Username is too short")
  .max(20, "Username must not exceed 20 chatacters");

const passwordRules = yup
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(20, "Password must not exceed 20 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character",
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
    "Email must be in a valid format like user@example.com",
  );

export const signUpSchema = yup.object().shape({
  username: usernameRules,
  email: emailRules,
  password: passwordRules,
  fullName: nameRules,
});
