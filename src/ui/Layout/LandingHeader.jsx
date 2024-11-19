import { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../redux/slices/language";
import i18next from "i18next";

export default function LandingHeader() {
  const { t } = useTranslation();
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

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

  const handleLang = (newLang) => {
    dispatch(setLanguage(newLang));
    i18next.changeLanguage(newLang);
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      bodyElement.classList.toggle("en", newLang === "en");
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
            {t("home")}
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

          <Link to="/login" className="loginLink">
            {t("login")}
          </Link>

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
