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
    "Password must contain at least one special character",
  )
  .matches(/^\S*$/, "Password must not contain spaces")
  .required("Password is required");

const loginRules = yup
  .string()
  .required("Username or email is required")
  .test("is-email-or-username", "Invalid email or username", (value) => {
    // Проверка на email
    if (yup.string().email().isValidSync(value)) {
      return true;
    }
    // Проверка на username
    return /^[a-zA-Z0-9]*$/.test(value);
  })
  .min(5, "Username or email must be at least 5 characters long")
  .max(50, "Username or email must not exceed 50 characters");

export const loginSchema = yup.object().shape({
  login: loginRules,
  password: passwordRules,
});
