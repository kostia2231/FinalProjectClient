import axios, { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import Button from "./Button";
import ImagePreview from "./ImagePreview";
import { useUser } from "../utilsQuery/useUser";
import { useUserPosts } from "../utilsQuery/usePost";

type UploadStatus = "idle" | "uploading" | "success" | "error";

const FileUploader = () => {
  const { refetch: refetchUser } = useUser();
  const { refetch: refetchUserPosts } = useUserPosts();

  const token = localStorage.getItem("token");
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [status, setStatus] = useState<UploadStatus>("idle");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  function handleCaptionChange(e: ChangeEvent<HTMLInputElement>) {
    setCaption(e.target.value);
  }

  const handleUploadAreaClick = () => {
    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    fileInput?.click();
  };

  async function handleFileUpload() {
    if (!token) return;
    if (!file) return;

    setStatus("uploading");

    const formData = new FormData();
    formData.append("images", file);
    formData.append("caption", caption);

    try {
      const response = await axios.post(
        "http://localhost:3333/post/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Upload successful:", response.data);
      setCaption("");
      setFile(null);
      setStatus("success");
      refetchUser();
      refetchUserPosts();
    } catch (err) {
      console.error(`upload faild: ${(err as AxiosError).message}`);
      setStatus("error");
    }
  }

  return (
    <>
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center w-full justify-center">
          <p className="font-medium">Create new post</p>
          <Button variant="link" onClick={handleFileUpload} className="ml-auto">
            Share
          </Button>
        </div>

        <div className="grid gap-6">
          <div>
            <input className="hidden" type="file" onChange={handleFileChange} />
            <div className="w-[300px] h-[300px]">
              <button
                className={`${file ? "opacity-0 absolute" : ""} w-[300px] h-[300px] bg-gray-50 hover:bg-gray-100 text-gray-300 rounded`}
                onClick={handleUploadAreaClick}
              >
                Select File
              </button>
              {file && (
                <>
                  <div className="w-full h-full rounded">
                    <ImagePreview file={file} />
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <input
              className="border w-full rounded p-3 placeholder:text-sm placeholder:text-gray-300"
              type="text"
              value={caption}
              onChange={handleCaptionChange}
              placeholder="Enter your caption"
            />

            {status === "uploading" && (
              <div className="text-center text-blue-400 mt-6">Uploading...</div>
            )}
            {status === "error" && (
              <div className="text-center text-red-400 mt-6">
                Upload faild. Please try again.
              </div>
            )}
            {status === "success" && (
              <div className="text-center text-green-400 mt-6">
                Post was created!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUploader;
