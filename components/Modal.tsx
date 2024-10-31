import React from "react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, closeModal }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
      onClick={closeModal}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white p-6 rounded-xl w-[100%] h-[100%] sm:w-[70%] sm:h-[70%] sm:max-w-[1200px] sm:max-h-[1200px] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
