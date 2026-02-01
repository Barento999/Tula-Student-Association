const PageHeader = ({ title, subtitle, icon }) => {
  return (
    <div className="bg-gradient-to-br from-card-bg to-bg-main py-16 px-0 text-center border-b border-border-color mb-10 max-md:py-10">
      <div className="container">
        {icon && <div className="text-5xl mb-4">{icon}</div>}
        <h1 className="text-4xl text-text-primary mb-3 max-md:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-text-secondary max-w-[600px] mx-auto max-md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
