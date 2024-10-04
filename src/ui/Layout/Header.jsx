import { Link, NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header>
      <div className={`layer ${showMenu ? "show" : ""}`}></div>
      <nav className="container">
        <div className="logo">
          <Link to="/">
            <h1>عمارة ماركت</h1>
          </Link>
        </div>
        <div className={`nav_links ${showMenu ? "show" : ""}`}>
          <NavLink className="nav_link" to="/">
            الرئيسية
          </NavLink>
          <NavLink className="nav_link" to="/products">
            المنتجات
          </NavLink>
          <NavLink className="nav_link" to="/categories">
            الاقسام
          </NavLink>
          <NavLink className="nav_link" to="/about">
            من نحن
          </NavLink>
          <NavLink className="nav_link" to="/contact">
            تواصل معنا
          </NavLink>
        </div>
        <div className="more_actions">
          {/* notification  */}
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <div className="user_wrapper">
                <i className="fa-solid fa-bell"></i>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="drop_Message_Menu">
              <div className="scroll_menu">
                {/* {notificationsLoading ? (
                  <DataLoader />
                ) : notifications?.data && notifications?.data?.length > 0 ? (
                  <>
                    {notifications?.data?.map((notification) => (
                      <Dropdown.Item
                        className="drop_Message"
                        key={notification?.id}
                      >
                        <NotificationItem notification={notification} />
                      </Dropdown.Item>
                    ))}
                  </>
                ) : (
                  <EmptyData>{t("noNotifications")}</EmptyData>
                )} */}
              </div>
              <Link
                className="showall"
                to="/notifications"
                style={{ textDecoration: "none" }}
              >
                عرض جميع الاشعارات
              </Link>
            </Dropdown.Menu>
          </Dropdown>

          {/* profile actions */}
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <div className="user_wrapper">
                <i className="fa-solid fa-user"></i>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="auth_menu">
              <Link to="/login">
                <i className="fa-solid fa-arrow-right-to-bracket"></i> تسجيل
                الدخول
              </Link>
              <Link to="/register">
                <i className="fa-regular fa-user-plus"></i> انشاء حساب
              </Link>
            </Dropdown.Menu>
          </Dropdown>

          {/* toggler */}
          <Dropdown className="toggler">
            <Dropdown.Toggle id="dropdown-basic">
              <div
                className="user_wrapper"
                onClick={() => setShowMenu(!showMenu)}
              >
                <i className="fa-solid fa-bars"></i>
              </div>
            </Dropdown.Toggle>
          </Dropdown>
        </div>
      </nav>
    </header>
  );
}

export default Header;
