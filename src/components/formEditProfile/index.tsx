import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { AxiosError, AxiosResponse } from "axios";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useUser } from "../../utilsQuery/useUser";

interface IProfileEditError extends AxiosError {
  response?: AxiosResponse<{
    message: string;
  }>;
}

const FormProfileEdit = (): JSX.Element => {
  const { cachedData, mutation, refetch } = useUser();
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState({
    username: "",
    website: "",
    bio: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (cachedData?.user) {
      setInitialValues({
        username: cachedData.user.username || "",
        website: cachedData.user.website || "",
        bio: cachedData.user.bio || "",
      });
    }
  }, [cachedData]);

  useEffect(() => {
    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setImagePreview(previewUrl);
    }
  }, [image]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues,
    enableReinitialize: true,

    onSubmit: async (values, actions) => {
      const formData = new FormData();
      formData.append("new_username", values.username);
      formData.append("website", values.website);
      formData.append("bio", values.bio);

      if (image) {
        formData.append("profileImg", image);
      }

      mutation.mutate(formData, {
        onSuccess() {
          setErrorMessage(null);
          setMessage("Profile updated successfully!");
          refetch();
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
        <div className="bg-gray-100 p-4 rounded-[16px] flex items-center gap-4">
          <img
            className="rounded-full w-[60px] h-[60px] object-cover"
            src={imagePreview || cachedData?.user.profileImg}
          />
          <div className="font-medium">{cachedData?.user.username}</div>
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-500 text-white px-8 py-2 rounded-xl hover:bg-blue-400 transition-colors ml-auto"
          >
            Choose Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="file-upload"
            className="hidden"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <p className="font-medium">Username</p>
            <Input
              name="username"
              value={values.username}
              onChange={handleChange}
              variant="edit"
              type="text"
            />
          </div>

          <div className="grid gap-3">
            <p className="font-medium">Website</p>
            <Input
              name="website"
              value={values.website}
              onChange={handleChange}
              variant="edit"
              type="text"
            />
          </div>

          <div className="grid gap-3">
            <p className="font-medium">About</p>
            <Input
              name="bio"
              value={values.bio}
              onChange={handleChange}
              variant="edit"
              type="textarea"
            />
          </div>
        </div>

        <div className="flex gap-10 mt-4">
          <Button variant="primary" type="submit">
            {mutation.isPending ? "Updating..." : "Save"}
          </Button>

          <Button variant="delete" className="bg-red-500">
            Delete
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
