const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-card-bg border border-border-color rounded-xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(37,211,102,0.1)] ${className}`}>
      {children}
    </div>
  );
};

export default Card;
