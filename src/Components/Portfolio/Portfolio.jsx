import { Link } from "react-router-dom";
import Styles from "./Portfolio.module.css";
import PortfolioBox from "../PortfolioBox/PortfolioBox";
import AnimatedSection from "../Animation/AnimatedSection";
import { fadeUp } from "../../Animations/Animations";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "../../Redux/store/authSlice";

function Portfolio() {
  const dispatch = useDispatch();
  const { session, error, loading } = useSelector((state) => state.auth);

  const { t } = useTranslation();

  const fetchSession = () => {
    dispatch(getSession());
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const [itemSelected, setItemSelected] = useState("all");

  return (
    <div className="container">
      <div className="sectionHead">
        <h2 className="sectionHeadTitle">{t("portfolio.title")}</h2>
      </div>

      <div className={Styles.portfolioWrapper} id="portfolio">
        <div className={Styles.portfolioTabs}>
          <ul className={Styles.portfolioList}>
            <li
              className={`${Styles.portfolioItem} ${itemSelected === "all" ? Styles.selected : ""}`}
              onClick={() => setItemSelected("all")}
            >
              <Link className={Styles.portfolioLink}>
                {t("portfolio.tabs.all")}
              </Link>
            </li>

            <li
              className={`${Styles.portfolioItem} ${itemSelected === "movieWebsite" ? Styles.selected : ""}`}
              onClick={() => setItemSelected("movieWebsite")}
            >
              <Link className={Styles.portfolioLink}>
                {t("portfolio.tabs.movieWebsite")}
              </Link>
            </li>

            <li
              className={`${Styles.portfolioItem} ${itemSelected === "dashboard" ? Styles.selected : ""}`}
              onClick={() => setItemSelected("dashboard")}
            >
              <Link className={Styles.portfolioLink}>
                {t("portfolio.tabs.dashboard")}
              </Link>
            </li>

            <li
              className={`${Styles.portfolioItem} ${itemSelected === "ecommerce" ? Styles.selected : ""}`}
              onClick={() => setItemSelected("ecommerce")}
            >
              <Link className={Styles.portfolioLink}>
                {t("portfolio.tabs.ecommerce")}
              </Link>
            </li>
          </ul>
        </div>

        <div className={Styles.portfolios}>
          {/* {portfolioData.map((data) => {})} */}

          <div className={Styles.portfolioBoxs}>
            {session && (
              <div className={Styles.displayLoginSignUp}>
                <span>
                  <Link className={`btn btn-hover`} to="/login">
                    {t("portfolio.loginBtn")}
                  </Link>
                </span>
              </div>
            )}
            <PortfolioBox
              name={t("portfolio.projects.zalva.name")}
              category={t("portfolio.projects.zalva.category")}
              year="۱۴۰۳"
              tags={[
                t("portfolio.projects.zalva.tags.ui"),
                t("portfolio.projects.zalva.tags.frontend"),
              ]}
              image="/public/image/Gemini_Generated_Image_jjorvmjjorvmjjor.jpg"
              href="#"
            />

            <PortfolioBox
              name={t("portfolio.projects.zalva.name")}
              category={t("portfolio.projects.zalva.category")}
              year="۱۴۰۳"
              tags={[
                t("portfolio.projects.zalva.tags.ui"),
                t("portfolio.projects.zalva.tags.frontend"),
              ]}
              image="/public/image/Rectangle 21.png"
              href="#"
            />

            <PortfolioBox
              name={t("portfolio.projects.zalva.name")}
              category={t("portfolio.projects.zalva.category")}
              year="۱۴۰۳"
              tags={[
                t("portfolio.projects.zalva.tags.ui"),
                t("portfolio.projects.zalva.tags.frontend"),
              ]}
              image="/public/image/Rectangle 21.png"
              href="#"
            />

            <PortfolioBox
              name={t("portfolio.projects.zalva.name")}
              category={t("portfolio.projects.zalva.category")}
              year="۱۴۰۳"
              tags={[
                t("portfolio.projects.zalva.tags.ui"),
                t("portfolio.projects.zalva.tags.frontend"),
              ]}
              image="/public/image/Rectangle 21.png"
              href="#"
            />

            <PortfolioBox
              name={t("portfolio.projects.zalva.name")}
              category={t("portfolio.projects.zalva.category")}
              year="۱۴۰۳"
              tags={[
                t("portfolio.projects.zalva.tags.ui"),
                t("portfolio.projects.zalva.tags.frontend"),
              ]}
              image="/public/image/Rectangle 21.png"
              href="#"
            />

            <PortfolioBox
              name={t("portfolio.projects.zalva.name")}
              category={t("portfolio.projects.zalva.category")}
              year="۱۴۰۳"
              tags={[
                t("portfolio.projects.zalva.tags.ui"),
                t("portfolio.projects.zalva.tags.frontend"),
              ]}
              image="/public/image/Rectangle 21.png"
              href="#"
            />
          </div>

          {/* <Link className={`btn btn-hover ${Styles.morePortfolioBtn}`}>
            {t("portfolio.more")}
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
