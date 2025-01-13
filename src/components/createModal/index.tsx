import { createPortal } from "react-dom";
import { FC } from "react";

interface ICreateModal {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModal: FC<ICreateModal> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const modalRoot = document.getElementById("create-modal");
  if (!modalRoot) {
    console.error("element with id 'create-modal' not found.");
    return null;
  }

  function handleWrapperClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return createPortal(
    <>
      <div
        className="fixed h-screen w-full z-2 top-0 ring-0 bg-black/70 overflow-auto"
        onClick={handleWrapperClick}
      >
        <div className="bg-white w-[200px] h-[200px] mx-auto my-[10%] rounded-[16px] p-6">
          <div>
            <div>CREATE MODAL</div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </>,
    modalRoot,
  );
};

export default CreateModal;
