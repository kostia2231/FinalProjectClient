import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/index";

const FormLogin = () => {
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
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
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-4"
      >
        <div className="flex flex-col gap-1">
          <Input
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            variant={errors.username && touched.username ? "error" : "primary"}
            type="text"
            placeholder="Username or email"
          ></Input>
          <Input
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            variant={errors.password && touched.password ? "error" : "primary"}
            type="password"
            placeholder="Password"
          ></Input>
        </div>
        <Button type="submit" variant="primary">
          Log in
        </Button>
      </form>
    </>
  );
};

export default FormLogin;
