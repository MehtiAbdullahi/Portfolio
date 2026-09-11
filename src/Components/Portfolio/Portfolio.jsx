import { Link } from "react-router-dom";
import Styles from "./Portfolio.module.css";
import PortfolioBox from "../PortfolioBox/PortfolioBox";
import AnimatedSection from "../Animation/AnimatedSection";
import { fadeUp } from "../../Animations/Animations";
import { useTranslation } from "react-i18next";

function Portfolio() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="sectionHead">
        <h2 className="sectionHeadTitle">{t("portfolio.title")}</h2>
      </div>

      <div className={Styles.portfolioWrapper} id="portfolio">
        <div className={Styles.portfolioTabs}>
          <ul className={Styles.portfolioList}>
            <li className={`${Styles.portfolioItem} ${Styles.selected}`}>
              <Link className={Styles.portfolioLink}>
                {t("portfolio.tabs.all")}
              </Link>
            </li>

            <li className={Styles.portfolioItem}>
              <Link className={Styles.portfolioLink}>
                {t("portfolio.tabs.movieWebsite")}
              </Link>
            </li>

            <li className={Styles.portfolioItem}>
              <Link className={Styles.portfolioLink}>
                {t("portfolio.tabs.dashboard")}
              </Link>
            </li>

            <li className={Styles.portfolioItem}>
              <Link className={Styles.portfolioLink}>
                {t("portfolio.tabs.ecommerce")}
              </Link>
            </li>
          </ul>
        </div>

        <div className={Styles.portfolios}>
          {/* {portfolioData.map((data) => {})} */}

          <AnimatedSection variants={fadeUp}>
            <div className={Styles.portfolioBoxs}>
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
          </AnimatedSection>

          <Link className={`btn btn-hover ${Styles.morePortfolioBtn}`}>
            {t("portfolio.more")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
