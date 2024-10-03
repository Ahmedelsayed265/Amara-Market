import { Link } from "react-router-dom";

function PageHeader({ title }) {
  return (
    <div className="page_header container d-flex align-items-center">
      <h6>
        <Link to="/">الرئيسية</Link>
        <i className="fa-regular fa-angle-left"></i>
        {title}
      </h6>
    </div>
  );
}

export default PageHeader;
