import { Link } from "react-router-dom";
import Styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "fa", label: "فا", dir: "rtl" },
  { code: "en", label: "EN", dir: "ltr" },
];

function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation();
  const activeIndex = Math.max(
    0,
    LANGUAGES.findIndex((lang) => lang.code === i18n.language)
  );

  const handleSelect = (lang) => {
    if (lang.code === i18n.language) return;
    i18n.changeLanguage(lang.code);
    document.documentElement.dir = lang.dir;
    document.documentElement.lang = lang.code;
    localStorage.setItem("lang", lang.code);
  };

  return (
    // dir="ltr" is forced here on purpose: the switch itself should always
    // read the same way, regardless of which language is currently active.
    <div
      className={`${Styles.langSwitch} ${className}`}
      role="radiogroup"
      aria-label="Language"
      dir="ltr"
    >
      <span
        className={Styles.langSwitchThumb}
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
        aria-hidden="true"
      />
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          role="radio"
          aria-checked={i18n.language === lang.code}
          className={`${Styles.langSwitchBtn} ${
            i18n.language === lang.code ? Styles.langSwitchBtnActive : ""
          }`}
          onClick={() => handleSelect(lang)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

function Navbar() {
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const navLinks = [
    { href: "#home", label: t("navbar.home") },
    { href: "#services", label: t("navbar.services") },
    { href: "#aboutme", label: t("navbar.aboutMe") },
    { href: "#portfolio", label: t("navbar.portfolio") },
    { href: "#contactUs", label: t("navbar.contactMe") },
  ];

  return (
    <>
      <nav className={`${Styles.nav} ${scrolled ? Styles.navScrolled : ""}`}>
        <div className="container">
          <div className={Styles.navWrapper}>
            <div className={Styles.navLeft}>
              <span className={`logo-TheMehti ${Styles.navLogo}`}>
                The Mehti
              </span>

              <ul className={Styles.navList}>
                {navLinks.map((link) => (
                  <li key={link.href} className={Styles.navListItem}>
                    <a href={link.href} className={Styles.navListItemLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={Styles.navRight}>
              <LanguageSwitcher className={Styles.navRightLang} />

              <Link
                to="/hire-me"
                className={`btn-flip ${Styles.btnFlip}`}
                data-back={t("navbar.hireMeBack")}
                data-front={t("navbar.hireMe")}
              ></Link>

              <button
                type="button"
                className={`${Styles.navBtn} ${
                  showMenu ? Styles.navBtnOpen : ""
                }`}
                onClick={() => setShowMenu((prev) => !prev)}
                aria-label={t(
                  showMenu ? "navbar.closeMenu" : "navbar.openMenu",
                  showMenu ? "Close menu" : "Open menu"
                )}
                aria-expanded={showMenu}
              >
                <span className={Styles.navBtnLine}></span>
              </button>
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
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  className={Styles.menuListItem}
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <a
                    href={link.href}
                    className={Styles.menuListItemLink}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <LanguageSwitcher className={Styles.menuMobileLang} />

            <Link
              to="/hire-me"
              className={`btn btn-hover ${Styles.menuMobileBtn}`}
              onClick={closeMenu}
            >
              {t("navbar.hireMe")}
            </Link>
          </div>
        </div>
      </nav>

      <div
        onClick={closeMenu}
        className={`${Styles.backgroundCover} ${
          showMenu ? Styles.backgroundCoverOpen : ""
        }`}
      ></div>
    </>
  );
}

export default Navbar;
