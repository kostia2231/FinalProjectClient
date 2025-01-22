import { createPortal } from "react-dom";
import Button from "../../ui/Button";
import { FC } from "react";

interface IProfileExitModal {
  isOpen: boolean;
  onClose: () => void;
  postId?: string;
}

const ProfileExitModal: FC<IProfileExitModal> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById("profile-exit-modal");
  if (!modalRoot) {
    console.error("element with id:profile-exit-modal not found.");
    return null;
  }

  function handleModalClick(
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleExit() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    window.location.reload();
  }

  return createPortal(
    <div
      className="fixed h-full w-full z-2 top-0 ring-0 bg-black/70 overflow-auto"
      onClick={handleModalClick}
    >
      <div
        className="h-full w-full flex justify-center items-center"
        onClick={handleModalClick}
      >
        <div className="bg-white rounded-[16px] flex flex-col w-fit h-fit">
          <Button
            variant="edit"
            className="border-none text-red-500"
            onClick={handleExit}
          >
            Exit
          </Button>
          <Button variant="edit" onClick={handleModalClick}>
            Cancel
          </Button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

export default ProfileExitModal;
