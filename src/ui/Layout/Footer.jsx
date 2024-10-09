import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="container">
      <div className="inner_footer">
        <h6>
          جميع الحقوق محفوظة ل <Link to="/">عمارة ماركت</Link>{" "}
          <span> © {new Date().getFullYear()}.</span>
        </h6>
        <div className="links">
          <Link to="terms">الشروط والأحكام</Link>
          <Link to="privacy">سياسة الخصوصية</Link>
          <Link to="contact">تواصل معنا</Link>
        </div>
      </div>
    </footer>
  );
}
