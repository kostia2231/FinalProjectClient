import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { resetSchema } from "../../schemas/reset";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import ErrorMessage from "../../ui/ErrorMessage";

const FormReset = () => {
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
      },
      onSubmit: async (values, actions) => {
        try {
          const response = await axios.post(
            "http://localhost:3333/auth/reset-password-request",
            values,
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          console.log("reset request success:", response.data);
          actions.resetForm();
          alert("Reset email has been sent. Check your email.");
        } catch (err) {
          alert("Oops something went wromg. Try again.");

          console.error("error reseting password", (err as AxiosError).message);
        }
      },
      validationSchema: resetSchema,
    });
  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-4"
      >
        <Input
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          variant={errors.email && touched.email ? "error" : "primary"}
          type="email"
          placeholder="Email"
        />
        {errors.email && touched.email ? (
          <ErrorMessage>{errors.email}</ErrorMessage>
        ) : null}
        <Button type="submit">Reset password</Button>
      </form>
    </>
  );
};

export default FormReset;
