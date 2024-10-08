import { Link, NavLink, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { setIsLogged, setUser } from "../../redux/slices/authedUser";
import axiosInstance from "../../utils/axiosInstance";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const isLogged = useSelector((state) => state.authedUser.isLogged);
  const user = useSelector((state) => state.authedUser.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, , deleteCookie] = useCookies(["token"]);
  const token = cookies?.token;

  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const performLogout = async () => {
    try {
      const deleteToken = await axiosInstance.post("/market/logout", {
        token: token,
      });
      if (deleteToken.data.code === 200) {
        deleteCookie("token");
        deleteCookie("id");
        delete axiosInstance.defaults.headers.common["Authorization"];
        dispatch(setUser({}));
        dispatch(setIsLogged(false));
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      throw new Error(error.message);
    }
  };

  return (
    <header>
      <div className={`layer ${showMenu ? "show" : ""}`}></div>
      <nav className="container">
        <div className="logo">
          <Link to="/">
            <img src="/images/logo.png" alt="" />
          </Link>
        </div>
        <div ref={menuRef} className={`nav_links ${showMenu ? "show" : ""}`}>
          <NavLink
            className="nav_link"
            to="/"
            onClick={() => setShowMenu(false)}
          >
            الطلبات
          </NavLink>
          <NavLink
            className="nav_link"
            to="/products"
            onClick={() => setShowMenu(false)}
          >
            المنتجات
          </NavLink>
          <NavLink
            className="nav_link"
            to="/about"
            onClick={() => setShowMenu(false)}
          >
            من نحن
          </NavLink>
          <NavLink
            className="nav_link"
            to="/contact"
            onClick={() => setShowMenu(false)}
          >
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
            {isLogged ? (
              <Dropdown.Menu className="auth_menu">
                <div className="profile">
                  <div className="img">
                    <img src={user?.logo} alt="" />
                  </div>
                  <div className="info">
                    <p>{user?.name}</p>
                    <span>{user?.email}</span>
                  </div>
                </div>

                <div className="balance">
                  <h6> الرصيد: {user?.wallet} ر.س</h6>
                </div>

                <Link to="/edit-profile">
                  <i className="fa-solid fa-user-pen"></i>
                  تعديل الحساب
                </Link>
                <Link to="/" onClick={performLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i> تسجيل
                  الخروج
                </Link>
              </Dropdown.Menu>
            ) : (
              <Dropdown.Menu className="auth_menu">
                <Link to="/login">
                  <i className="fa-solid fa-arrow-right-to-bracket"></i> تسجيل
                  الدخول
                </Link>
                <Link to="/register">
                  <i className="fa-regular fa-user-plus"></i> انشاء حساب
                </Link>
              </Dropdown.Menu>
            )}
          </Dropdown>

          {/* toggler */}
          <Dropdown
            ref={toggleRef}
            className="toggler"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Dropdown.Toggle id="dropdown-basic">
              <div className="user_wrapper">
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
