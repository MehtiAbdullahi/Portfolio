import { Link } from "react-router-dom";
import Styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getSession, logout } from "../../Redux/store/authSlice";

const LANGUAGES = [
  { code: "fa", label: "فا", dir: "rtl" },
  { code: "en", label: "EN", dir: "ltr" },
];

function Navbar() {
  const dispatch = useDispatch();
  const { session, user, error, loading } = useSelector((state) => state.auth);

  const { t, i18n } = useTranslation();

  const [showMenu, setShowMenu] = useState(false);

  const handleSelect = (lang) => {
    i18n.changeLanguage(lang.code);
    document.documentElement.lang = lang.code;
    document.documentElement.lang = lang.dir;
    localStorage.setItem("lang", lang.code);
  };

  const fetchSession = () => {
    dispatch(getSession());
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <>
      <nav className={Styles.nav}>
        <div className="container">
          <div className={Styles.navWrapper}>
            <div className={Styles.navLeft}>
              <span className={`logo-TheMehti ${Styles.navLogo}`}>
                The Mehti
              </span>

              <ul className={Styles.navList}>
                <li className={Styles.navListItem}>
                  <a href="#home" className={Styles.navListItemLink}>
                    {t("navbar.home")}
                  </a>
                </li>

                <li className={Styles.navListItem}>
                  <a href="#services" className={Styles.navListItemLink}>
                    {t("navbar.services")}
                  </a>
                </li>

                <li className={Styles.navListItem}>
                  <a href="#aboutme" className={Styles.navListItemLink}>
                    {t("navbar.aboutMe")}
                  </a>
                </li>

                <li className={Styles.navListItem}>
                  <a href="#portfolio" className={Styles.navListItemLink}>
                    {t("navbar.portfolio")}
                  </a>
                </li>

                <li className={Styles.navListItem}>
                  <a href="#contactUs" className={Styles.navListItemLink}>
                    {t("navbar.contactMe")}
                  </a>
                </li>
              </ul>
            </div>

            <div className={Styles.navLeftBtnLan}>
              <div>
                {LANGUAGES.map((lang) => (
                  <span
                    className={
                      i18n.language === lang.code
                        ? Styles.navLeftBtnLanActive
                        : ""
                    }
                    onClick={() => handleSelect(lang)}
                  >
                    {lang.label}
                  </span>
                ))}
              </div>
              {user ? (
                <div className={Styles.navUserGroup}>
                  <button
                    type="button"
                    onClick={() => dispatch(logout())}
                    className={Styles.btnLogout}
                  >
                    {t("navbar.logout")}
                  </button>
                  <Link
                    to="/hire-me"
                    className={`btn-flip ${Styles.btnFlip}`}
                    data-back={t("navbar.hireMeBack")}
                    data-front={t("navbar.hireMe")}
                  ></Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`btn-flip ${Styles.btnFlip}`}
                  data-back={t("navbar.hireMeBack")}
                  data-front={t("navbar.loginSignUp")}
                ></Link>
              )}
            </div>

            <div
              className={Styles.navBtn}
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <span className={Styles.navBtnLine}></span>
            </div>
          </div>

          <div
            className={`${Styles.menuMobile} ${
              showMenu ? Styles.menuMobileOpen : ""
            }`}
          >
            <div className={Styles.menuMobileHeade}>
              <span className={`logo-TheMehti ${Styles.navLogo}`}>
                The Mehti
              </span>
            </div>

            <ul className={Styles.menuMobileList}>
              <li className={Styles.menuListItem}>
                <a href="#home" className={Styles.menuListItemLink}>
                  {t("navbar.home")}
                </a>
              </li>

              <li className={Styles.menuListItem}>
                <a href="#services" className={Styles.menuListItemLink}>
                  {t("navbar.services")}
                </a>
              </li>

              <li className={Styles.menuListItem}>
                <a href="#aboutme" className={Styles.menuListItemLink}>
                  {t("navbar.aboutMe")}
                </a>
              </li>

              <li className={Styles.menuListItem}>
                <a href="#portfolio" className={Styles.menuListItemLink}>
                  {t("navbar.portfolio")}
                </a>
              </li>

              <li className={Styles.menuListItem}>
                <a href="#contactme" className={Styles.menuListItemLink}>
                  {t("navbar.contactMe")}
                </a>
              </li>
            </ul>

            <div className={Styles.navLeftBtnLanMobile}>
              <div>
                {LANGUAGES.map((lang) => (
                  <span
                    className={
                      i18n.language === lang.code
                        ? Styles.navLeftBtnLanActive
                        : ""
                    }
                    onClick={() => handleSelect(lang)}
                  >
                    {lang.label}
                  </span>
                ))}
              </div>
              <Link
                to="/hire-me"
                className={`btn btn-hover ${Styles.menuMobileBtn}`}
              >
                {t("navbar.hireMe")}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div
        onClick={() => setShowMenu((prev) => !prev)}
        className={`${Styles.backgroundCover} ${
          showMenu ? Styles.backgroundCoverOpen : ""
        }`}
      ></div>
    </>
  );
}

export default Navbar;
