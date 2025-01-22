import { createPortal } from "react-dom";
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

  function handleModalClick(e: React.MouseEvent<HTMLDivElement>) {
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
        <div className="bg-white rounded-[16px] flex flex-col w-fit h-fit p-10 gap-3">
          <div
            className="bg-red-500 text-center rounded-lg text-white cursor-pointer w-[200px] leading-10 hover:bg-red-400"
            onClick={handleExit}
          >
            Exit
          </div>
          <div
            className="bg-gray-100 text-center rounded-lg cursor-pointer w-[200px] leading-10"
            onClick={handleModalClick}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

export default ProfileExitModal;
