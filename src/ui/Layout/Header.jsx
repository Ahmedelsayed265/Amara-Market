import { Link, NavLink, useNavigate } from "react-router-dom";
import { Dropdown, Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { setIsLogged, setUser } from "../../redux/slices/authedUser";
import { setLanguage } from "../../redux/slices/language";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import i18next from "i18next";
import axiosInstance from "../../utils/axiosInstance";
import useGetNotifications from "../../hooks/useGetNotifications";
import DataLoader from "./DataLoader";
import NotificationItem from "./NotificationItem";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const queryClient = useQueryClient();

  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authedUser);
  const { data: notifications, isLoading } = useGetNotifications();

  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(user?.status || 0);
  const [cookies, , deleteCookie] = useCookies(["token"]);
  const token = cookies?.token;

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
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      throw new Error(error.message);
    }
  };

  const handleLang = (newLang) => {
    dispatch(setLanguage(newLang));
    i18next.changeLanguage(newLang);
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.classList.toggle("en", newLang === "en");
    }
  };

  const handleStatus = async () => {
    setLoading(true);
    const newStatus = status === 1 ? 0 : 1;
    try {
      const res = await axiosInstance.post("/market/change_status", {
        status: newStatus,
      });
      if (res.data.code === 200) {
        setStatus(newStatus);
        queryClient.invalidateQueries({ queryKey: ["authed-user"] });
      }
    } catch (error) {
      console.error("Error during change status:", error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
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
            to=""
            end
            onClick={() => setShowMenu(false)}
          >
            {t("orders")}
          </NavLink>
          <NavLink
            className="nav_link"
            to="products"
            onClick={() => setShowMenu(false)}
          >
            {t("products")}
          </NavLink>
          <NavLink
            className="nav_link"
            to="about"
            onClick={() => setShowMenu(false)}
          >
            {t("aboutUs")}
          </NavLink>
          <NavLink
            className="nav_link"
            to="contact"
            onClick={() => setShowMenu(false)}
          >
            {t("contactUs")}
          </NavLink>
        </div>

        <div className="more_actions">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <div className="user_wrapper">
                <i className="fa-sharp fa-solid fa-globe"></i>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="auth_menu">
              <button onClick={() => handleLang("en")}>
                <img src="/images/Flag_of_the_United_States.svg" alt="use" />{" "}
                English
              </button>
              <button onClick={() => handleLang("ar")}>
                <img src="/images/Flag_of_Saudi_Arabia.svg" alt="sa" /> العربية
              </button>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <div className="user_wrapper">
                <i className="fa-solid fa-bell"></i>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="drop_Message_Menu">
              <div className="scroll_menu">
                {isLoading ? (
                  <DataLoader minHeight="150px" />
                ) : notifications?.total > 0 ? (
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
                  <p className="noNotifications">{t("noNotifications")}</p>
                )}
              </div>
              <Link
                className="showall"
                to="notifications"
                style={{ textDecoration: "none" }}
              >
                {t("showAllNotifications")}
              </Link>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <div className="user_wrapper">
                <i className="fa-solid fa-user"></i>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="auth_menu">
              <div className="profile">
                <div className="img">
                  <img src={user?.logo} alt="" />
                  {user?.paid ? (
                    <span className="verified">
                      <i className="fa-solid fa-badge-check"></i>
                    </span>
                  ) : null}
                </div>
                <div className="info">
                  <p>{user?.name}</p>
                  <span>{user?.email}</span>
                </div>
              </div>

              <div className="balance">
                <h6>
                  {t("balance")}: {user?.wallet} {t("sar")}
                </h6>
              </div>

              <div className="question p-0 pt-2">
                <label htmlFor="status" className="quest">
                  {status === 0 ? t("offline") : t("online")}
                </label>
                <Form.Switch
                  id="status"
                  name="status"
                  disabled={loading}
                  checked={status === 1}
                  onChange={handleStatus}
                />
              </div>

              <Link to="/edit-profile">
                <i className="fa-solid fa-user-pen"></i>
                {t("editProfile")}
              </Link>
              <Link to="/" onClick={performLogout}>
                <i className="fa-solid fa-right-from-bracket"></i> {t("logout")}
              </Link>
            </Dropdown.Menu>
          </Dropdown>

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
