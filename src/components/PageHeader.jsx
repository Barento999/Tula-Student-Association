import "./PageHeader.css";

const PageHeader = ({ title, subtitle, icon }) => {
  return (
    <div className="page-header">
      <div className="container">
        {icon && <div className="page-header-icon">{icon}</div>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
