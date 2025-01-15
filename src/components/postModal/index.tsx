import { createPortal } from "react-dom";
import { FC } from "react";
import { useOnePost } from "../../utils/useOnePost";

interface ICreateModal {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const PostModal: FC<ICreateModal> = ({ isOpen, onClose, postId }) => {
  const { data, isFetching } = useOnePost({ postId });
  console.log(data);

  if (!isOpen) return null;
  const modalRoot = document.getElementById("post-modal");
  if (!modalRoot) {
    console.error("element with id:post-modal not found.");
    return null;
  }

  function handleModalClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return createPortal(
    <>
      <div
        className="fixed h-full w-full z-2 top-0 ring-0 bg-black/70 overflow-auto"
        onClick={handleModalClick}
      >
        <div
          onClick={handleModalClick}
          className="h-full w-full flex justify-center items-center"
        >
          {!isFetching && (
            <div className="bg-white w-fit h-fit flex">
              <div>
                {data?.post.imgUrls.map((imgUrl) => (
                  <img
                    key={data.post._id}
                    src={imgUrl}
                    className="h-[500px] w-[500px] object-cover"
                  />
                ))}
              </div>
              <div className="px-3">{data?.post.caption}</div>
            </div>
          )}
        </div>
      </div>
    </>,
    modalRoot,
  );
};

export default PostModal;
