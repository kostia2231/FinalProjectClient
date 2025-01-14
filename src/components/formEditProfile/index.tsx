import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import useUser from "../../utils/useUser";
import { UserData } from "../../types/userData";
import { AxiosError, AxiosResponse } from "axios";

interface IProfileEditError extends AxiosError {
  response?: AxiosResponse<{
    message: string;
  }>;
}

const FormProfileEdit = (): JSX.Element => {
  const { cachedData, mutation } = useUser();
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState({
    username: "",
    website: "",
    bio: "",
  });

  useEffect(() => {
    if (cachedData?.user) {
      setInitialValues({
        username: cachedData.user.username || "",
        website: cachedData.user.website || "",
        bio: cachedData.user.bio || "",
      });
    }
  }, [cachedData]);

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues,
    enableReinitialize: true,

    onSubmit: async (values, actions) => {
      const updatedData: Partial<UserData["user"]> = {
        new_username: values.username,
        website: values.website,
        bio: values.bio,
      };

      mutation.mutate(updatedData, {
        onSuccess() {
          setErrorMessage(null);
          setMessage("Profile updated successfully!");
        },
        onError: (error: AxiosError) => {
          const typedError = error as IProfileEditError;
          const errorMessage =
            typedError.response?.data?.message ||
            "An error occurred. Try again.";
          setMessage(null);
          setErrorMessage(errorMessage);
        },
      });
      actions.setSubmitting(false);
    },
  });

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[600px]"
      >
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <p className="font-medium">Username</p>
            <Input
              name="username"
              value={values.username}
              onChange={handleChange}
              variant="edit"
              type="text"
            ></Input>
          </div>

          <div className="grid gap-3">
            <p className="font-medium">Website</p>
            <Input
              name="website"
              value={values.website}
              onChange={handleChange}
              variant="edit"
              type="text"
            ></Input>
          </div>

          <div className="grid gap-3">
            <p className="font-medium">About</p>
            <Input
              name="bio"
              value={values.bio}
              onChange={handleChange}
              variant="edit"
              type="textarea"
            ></Input>
          </div>
        </div>

        <div className="w-[300px] mt-6">
          <Button variant="primary" type="submit">
            {mutation.isPending ? "Updating..." : "Save"}
          </Button>
        </div>
        {message && (
          <div className="bg-green-300 text-xs p-3 rounded-2xl text-black/50 text-center">
            {message}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-300 text-xs p-3 rounded-2xl text-black/50 text-center">
            {errorMessage}
          </div>
        )}
      </form>
    </>
  );
};

export default FormProfileEdit;
