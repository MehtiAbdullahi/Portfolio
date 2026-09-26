import { Link } from "react-router-dom";
import Styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";

import { CiLinkedin } from "react-icons/ci";
import { BsGithub } from "react-icons/bs";
import { PiTelegramLogoLight } from "react-icons/pi";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={Styles.footer}>
      <div className="container">
        <div className={Styles.footerWrapper}>
          <div className={Styles.footerLogo}>
            <span className="logo-TheMehti">The Mehti</span>
          </div>
          <ul className={Styles.footerList}>
            <li className={Styles.footerItem}>
              <a href="#home" className={Styles.footerItemLink}>
                {t("footer.home")}
              </a>
            </li>

            <li className={Styles.footerItem}>
              <a href="#services" className={Styles.footerItemLink}>
                {t("footer.services")}
              </a>
            </li>

            <li className={Styles.footerItem}>
              <a href="#aboutme" className={Styles.footerItemLink}>
                {t("footer.aboutMe")}
              </a>
            </li>

            <li className={Styles.footerItem}>
              <a href="#portfolio" className={Styles.footerItemLink}>
                {t("footer.portfolio")}
              </a>
            </li>

            <li className={Styles.footerItem}>
              <a href="#contactme" className={Styles.footerItemLink}>
                {t("footer.contactMe")}
              </a>
            </li>
          </ul>
          <div className={Styles.footerSocials}>
            <a
              className={Styles.footerSocialLink}
              href="https://www.linkedin.com/in/mahdiabdullahi/"
              target="_blank"
            >
              <CiLinkedin />
            </a>
            <a
              className={Styles.footerSocialLink}
              href="https://github.com/MehtiAbdullahi"
              target="_blank"
            >
              <BsGithub />
            </a>
            <a
              className={Styles.footerSocialLink}
              href="https://t.me/TheMehtiTM"
              target="_blank"
            >
              <PiTelegramLogoLight />
            </a>
          </div>
          <div className={Styles.footerContactUs}>
            <div className={Styles.footerContactUsPhone}>
              <span>+98 902 351 4716</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 16.9201V19.9201C22.0011 20.1986 21.9441 20.4743 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3521 21.402C21.1468 21.5902 20.9046 21.7336 20.6407 21.8228C20.3769 21.912 20.0974 21.9452 19.82 21.9201C16.7428 21.5857 13.787 20.5342 11.19 18.8501C8.77382 17.3148 6.72533 15.2663 5.18999 12.8501C3.49997 10.2413 2.44824 7.27109 2.11999 4.1801C2.095 3.90356 2.12787 3.62486 2.21649 3.36172C2.30512 3.09859 2.44756 2.85679 2.63476 2.65172C2.82196 2.44665 3.0498 2.28281 3.30379 2.17062C3.55777 2.05843 3.83233 2.00036 4.10999 2.0001H7.10999C7.5953 1.99532 8.06579 2.16718 8.43376 2.48363C8.80173 2.80008 9.04207 3.23954 9.10999 3.7201C9.23662 4.68016 9.47144 5.62282 9.80999 6.5301C9.94454 6.88802 9.97366 7.27701 9.8939 7.65098C9.81415 8.02494 9.62886 8.36821 9.35999 8.6401L8.08999 9.9101C9.51355 12.4136 11.5864 14.4865 14.09 15.9101L15.36 14.6401C15.6319 14.3712 15.9751 14.1859 16.3491 14.1062C16.7231 14.0264 17.1121 14.0556 17.47 14.1901C18.3773 14.5286 19.3199 14.7635 20.28 14.8901C20.7658 14.9586 21.2094 15.2033 21.5265 15.5776C21.8437 15.9519 22.0122 16.4297 22 16.9201Z"
                  stroke="#959595"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className={Styles.footerContactUsEmail}>
              <span>mehtiabdullahi@gmail.com</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="#959595"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="#959595"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className={Styles.footerCopyRight}>
            <span>{t("footer.copyright")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
