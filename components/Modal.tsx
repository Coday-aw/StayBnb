interface ModalProps {
  children: React.ReactNode;
  openModal: boolean;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, openModal, closeModal }) => {
  if (!openModal) {
    return null;
  }
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex"
      onClick={closeModal}
      aria-hidden={!openModal}
      aria-modal="true"
    >
      <div
        className="bg-white p-6 rounded-lg flex "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="">{children}</div>
        <div className="mt-4 text-right">
          <button onClick={closeModal} className="text-red-500">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
