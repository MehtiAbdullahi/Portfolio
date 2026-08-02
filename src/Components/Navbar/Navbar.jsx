import { Link } from "react-router-dom";
import Styles from "./Navbar.module.css";
import { useState } from "react";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

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
                    خانه
                  </a>
                </li>
                <li className={Styles.navListItem}>
                  <a href="#services" className={Styles.navListItemLink}>
                    خدمات
                  </a>
                </li>
                <li className={Styles.navListItem}>
                  <a href="#aboutme" className={Styles.navListItemLink}>
                    درباره من
                  </a>
                </li>
                <li className={Styles.navListItem}>
                  <a href="#portfolio" className={Styles.navListItemLink}>
                    نمونه کار ها
                  </a>
                </li>
                <li className={Styles.navListItem}>
                  <a href="#contactUs" className={Styles.navListItemLink}>
                    ارتباط با من
                  </a>
                </li>
              </ul>
            </div>
            <Link
              className={`btn-flip ${Styles.btnFlip}`}
              data-back="کلیک کن!"
              data-front="استخدام کردن"
            ></Link>
            <div
              className={Styles.navBtn}
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <span className={Styles.navBtnLine}></span>
            </div>
          </div>
          <div
            className={`${Styles.menuMobile} ${showMenu ? Styles.menuMobileOpen : ""}`}
          >
            <div className={Styles.menuMobileHeade}>
              <span className={`logo-TheMehti ${Styles.navLogo}`}>
                The Mehti
              </span>
            </div>
            <ul className={Styles.menuMobileList}>
              <li className={Styles.menuListItem}>
                <a href="#home" className={Styles.menuListItemLink}>
                  خانه
                </a>
              </li>
              <li className={Styles.menuListItem}>
                <a href="#services" className={Styles.menuListItemLink}>
                  خدمات
                </a>
              </li>
              <li className={Styles.menuListItem}>
                <a href="#aboutme" className={Styles.menuListItemLink}>
                  درباره من
                </a>
              </li>
              <li className={Styles.menuListItem}>
                <a href="#portfolio" className={Styles.menuListItemLink}>
                  نمونه کار ها
                </a>
              </li>
              <li className={Styles.menuListItem}>
                <a href="#contactme" className={Styles.menuListItemLink}>
                  ارتباط با من
                </a>
              </li>
            </ul>
            <Link className={`btn btn-hover ${Styles.menuMobileBtn}`}>
              استخدام کردن
            </Link>
          </div>
        </div>
      </nav>
      <div
        onClick={() => setShowMenu((prev) => !prev)}
        className={`${Styles.backgroundCover} ${showMenu ? Styles.backgroundCoverOpen : ""}`}
      ></div>
    </>
  );
}

export default Navbar;
