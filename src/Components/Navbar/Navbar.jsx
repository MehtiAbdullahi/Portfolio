import { Link } from "react-router-dom";
import Styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "fa", label: "فا", dir: "rtl" },
  { code: "en", label: "EN", dir: "ltr" },
];

function Navbar() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  // const activeIndex = Math.max(
  //   0,
  //   LANGUAGES.findIndex((lang) => lang.code === i18n.language),
  // );

  const handleSelect = (lang) => {
    i18n.changeLanguage(lang.code);
    document.documentElement.lang = lang.code;
    document.documentElement.lang = lang.dir;
    localStorage.setItem("lang", lang.code);
  };

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

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
              <Link
                to="/hire-me"
                className={`btn-flip ${Styles.btnFlip}`}
                data-back={t("navbar.hireMeBack")}
                data-front={t("navbar.hireMe")}
              ></Link>
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

            <Link
              to="/hire-me"
              className={`btn btn-hover ${Styles.menuMobileBtn}`}
            >
              {t("navbar.hireMe")}
            </Link>
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
