import { createPortal } from "react-dom";
import { FC } from "react";
import Button from "../../ui/Button";
import { useDeleteOnePost } from "../../utilsQuery/usePost";

interface IEditModal {
  isOpen: boolean;
  onClose: () => void;
  postId?: string;
}

const PostEditModal: FC<IEditModal> = ({ isOpen, onClose, postId }) => {
  console.log(postId);
  const { deletePost } = useDeleteOnePost();

  if (!isOpen) return null;

  const modalRoot = document.getElementById("post-edit-modal");
  if (!modalRoot) {
    console.error("element with id:post-modal not found.");
    return null;
  }

  function handleModalClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleDelete() {
    if (postId) {
      deletePost.mutate(postId);
    }
  }

  return createPortal(
    <div
      className="fixed h-full w-full z-2 top-0 ring-0 bg-black/70 overflow-auto"
      onClick={handleModalClick}
    >
      <div
        onClick={handleModalClick}
        className="h-full w-full flex justify-center items-center"
      >
        <div className="bg-white rounded-[16px] flex flex-col">
          <Button
            onClick={handleDelete}
            variant="edit"
            className="border-none text-red-500"
          >
            Delete
          </Button>
          <Button variant="edit">Copy Link</Button>
          <Button variant="edit">Edit</Button>
          <Button onClick={onClose} variant="edit">
            Cancel
          </Button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

export default PostEditModal;
