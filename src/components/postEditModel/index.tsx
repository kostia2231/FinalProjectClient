import { createPortal } from "react-dom";
import { FC } from "react";
import { toast } from "sonner";
import Button from "../../ui/Button";
import { useDeleteOnePost } from "../../utilsQuery/usePost";

interface IEditModal {
  isOwner: boolean;
  isOpen: boolean;
  onClose: () => void;
  postId?: string;
}

const PostEditModal: FC<IEditModal> = ({
  isOwner,
  isOpen,
  onClose,
  postId,
}) => {
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
      try {
        deletePost.mutate(postId);
      } catch (err) {
        console.error("error deleting post", (err as Error).message);
        toast.error("Faild to delete. Try again.");
      }
    }
  }

  async function handleCopyLink() {
    if (postId) {
      const postLink = `http://localhost:5173/post/${postId}`;
      try {
        await navigator.clipboard.writeText(postLink);
        toast.success("Link copied!");
      } catch (error) {
        console.error("Failed to copy link:", error);
      }
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
          {isOwner && (
            <>
              <Button
                onClick={handleDelete}
                variant="edit"
                className="border-none text-red-500"
              >
                Delete
              </Button>
              <hr />
            </>
          )}
          <Button
            variant="edit"
            className="border-none"
            onClick={handleCopyLink}
          >
            Copy Link
          </Button>
          {isOwner && <Button variant="edit">Edit</Button>}
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
