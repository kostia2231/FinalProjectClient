import { useFormik } from "formik";
import axios from "axios";
import { loginSchema } from "../../schemas/login";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
import Input from "../../ui/Input";

const FormLogIn = (): JSX.Element => {
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        login: "",
        password: "",
      },

      onSubmit: async (values, actions) => {
        try {
          console.log(values);
          const response = await axios.post(
            "http://localhost:3333/auth/login",
            values,
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          console.log("login success:", response.data);
          actions.resetForm();
        } catch (err) {
          if (axios.isAxiosError(err) && err.response) {
            console.error("error while login: ", err.response.data.message);
          } else {
            console.error("server error: ", (err as Error).message);
          }
        }
      },
      validationSchema: loginSchema,
    });

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-4"
      >
        <div className="flex flex-col gap-2">
          <Input
            name="login"
            value={values.login}
            onChange={handleChange}
            onBlur={handleBlur}
            variant={errors.login && touched.login ? "error" : "primary"}
            type="text"
            placeholder="Username or email"
          ></Input>
          {errors.login && touched.login ? (
            <ErrorMessage>{errors.login}</ErrorMessage>
          ) : null}
          <Input
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            variant={errors.password && touched.password ? "error" : "primary"}
            type="password"
            placeholder="Password"
          ></Input>
          {errors.password && touched.password ? (
            <ErrorMessage>{errors.password}</ErrorMessage>
          ) : null}
        </div>
        <Button variant="primary" type="submit">
          Log in
        </Button>
      </form>
    </>
  );
};

export default FormLogIn;
