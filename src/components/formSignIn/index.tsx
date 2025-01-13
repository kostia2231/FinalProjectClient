import axios from "axios";
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas/signup";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";

const FormSignIn = (): JSX.Element => {
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        username: "",
        password: "",
      },
      onSubmit: async (values, actions) => {
        try {
          const response = await axios.post(
            "http://localhost:3333/auth/register",
            values,
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          console.log("registration success:", response.data);
          actions.resetForm();
        } catch (err) {
          if (axios.isAxiosError(err) && err.response) {
            console.error(
              "error while registring: ",
              err.response.data.message,
            );
          } else {
            console.error("server error: ", (err as Error).message);
          }
        }
      },
      validationSchema: signUpSchema,
    });

  return (
    <>
      <div className="text-center pb-9">
        Sign up to see photos and videos from your friends.
      </div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-4"
      >
        <div className="flex flex-col gap-2">
          <Input
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            variant={errors.email && touched.email ? "error" : "primary"}
            type="email"
            placeholder="Email"
          ></Input>
          {errors.email && touched.email ? (
            <ErrorMessage>{errors.email}</ErrorMessage>
          ) : null}
          <Input
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            variant={errors.fullName && touched.fullName ? "error" : "primary"}
            type="text"
            placeholder="Full Name"
          ></Input>
          {errors.fullName && touched.fullName ? (
            <ErrorMessage>{errors.fullName}</ErrorMessage>
          ) : null}
          <Input
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            variant={errors.username && touched.username ? "error" : "primary"}
            type="text"
            placeholder="Username"
          ></Input>
          {errors.username && touched.username ? (
            <ErrorMessage>{errors.username}</ErrorMessage>
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
        <Button type="submit">Sign up</Button>
      </form>
    </>
  );
};

export default FormSignIn;
