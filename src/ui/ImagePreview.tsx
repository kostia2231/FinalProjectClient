import { FC } from "react";

interface ImagePreviewProps {
  file: File;
}

const ImagePreview: FC<ImagePreviewProps> = ({ file }) => {
  const imageUrl = URL.createObjectURL(file);

  return (
    <div className="h-full w-full">
      <img
        src={imageUrl}
        alt={file.name}
        className="h-full w-full object-cover rounded"
      />
    </div>
  );
};

export default ImagePreview;
