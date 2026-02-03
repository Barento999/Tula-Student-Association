import { useEffect } from "react";
import { FiX } from "react-icons/fi";

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
      className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(11,20,26,0.95)] backdrop-blur-sm flex items-center justify-center z-[2000] p-5 animate-fade-in"
      onClick={onClose}>
      <div
        className="bg-gradient-to-br from-[#1a2730] to-[#15202b] border border-whatsapp-green/30 rounded-2xl max-w-[700px] w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-whatsapp-green/10 animate-scale-in"
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-whatsapp-green/20 bg-gradient-to-r from-whatsapp-green/5 to-transparent">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-whatsapp-green to-[#00E676] bg-clip-text text-transparent">
            {title}
          </h2>
          <button
            className="w-10 h-10 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110"
            onClick={onClose}
            title="Close">
            <FiX className="w-5 h-5" />
          </button>
        </div>
        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
