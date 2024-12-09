import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ErrorMessage from "../../ui/ErrorMessage";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/index";

const FormSignIn = () => {
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        username: "",
        password: "",
      },
      onSubmit: (values, actions) => {
        console.log("Form values were sent:", values);
        actions.resetForm();
      },
      validationSchema: loginSchema,
    });

  return (
    <>
      <>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-4"
        >
          <div className="flex flex-col gap-1">
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
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              variant={errors.name && touched.name ? "error" : "primary"}
              type="text"
              placeholder="Full Name"
            ></Input>
            {errors.name && touched.name ? (
              <ErrorMessage>{errors.name}</ErrorMessage>
            ) : null}
            <Input
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              variant={
                errors.username && touched.username ? "error" : "primary"
              }
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
              variant={
                errors.password && touched.password ? "error" : "primary"
              }
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
    </>
  );
};

export default FormSignIn;
