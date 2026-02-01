import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const CustomSelect = ({ value, onChange, options, label, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { value: option } });
    setIsOpen(false);
  };

  return (
    <div className="group">
      {label && (
        <label className="block text-sm font-semibold text-whatsapp-green mb-2">
          {label}
        </label>
      )}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 h-12 bg-main/50 border-2 border-whatsapp-green/30 rounded-xl text-whatsapp-green focus:border-whatsapp-green focus:bg-main focus:shadow-[0_0_20px_rgba(37,211,102,0.2)] focus:outline-none transition-all duration-300 hover:border-whatsapp-green/50 flex items-center justify-between ${className}`}>
          <span>{value}</span>
          <FiChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-card border-2 border-whatsapp-green/30 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className={`px-4 py-3 cursor-pointer transition-all duration-200 ${
                  value === option
                    ? "bg-whatsapp-green text-main font-bold"
                    : "text-primary hover:bg-whatsapp-green hover:text-main"
                } ${index === 0 ? "rounded-t-xl" : ""} ${index === options.length - 1 ? "rounded-b-xl" : ""}`}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
