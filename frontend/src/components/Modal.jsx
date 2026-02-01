import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(11,20,26,0.9)] flex items-center justify-center z-[2000] p-5"
      onClick={onClose}>
      <div
        className="bg-card-bg border border-border-color rounded-xl max-w-[600px] w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-border-color">
          <h2 className="text-text-primary text-2xl m-0">{title}</h2>
          <button
            className="bg-transparent border-none text-text-secondary text-2xl px-2 py-1 cursor-pointer transition-colors duration-300 hover:text-text-primary"
            onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
