import { Link } from "react-router-dom";
import Styles from "./Portfolio.module.css";
import PortfolioBox from "../PortfolioBox/PortfolioBox";
import AnimatedSection from "../Animation/AnimatedSection";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "../../Redux/store/authSlice";
import { getProjects } from "../../Redux/store/projects";
import Loader from "../Animation/Loader/Loader";
import { supabase } from "../../lib/supabase";

function Portfolio() {
  const dispatch = useDispatch();

  const {
    session,
    user,
    error: sessionError,
    loading: sessionLoading,
  } = useSelector((state) => state.auth);

  const {
    projects,
    error: projectError,
    loading: projectLoading,
  } = useSelector((state) => state.project);

  const { t } = useTranslation();

const projectsWithImage = projects.map((project) => ({
  ...project,
  image: supabase.storage
    .from("project-images")
    .getPublicUrl(project.image).data.publicUrl,
}))

  const fetchProjects = async () => {
    await dispatch(getProjects());
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchSession = async () => {
    await dispatch(getSession());
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
            {!user && (
              <div className={Styles.displayLoginSignUp}>
                <span>
                  <Link className={`btn btn-hover`} to="/login">
                    {t("portfolio.loginBtn")}
                  </Link>
                </span>
              </div>
            )}
            {projectLoading ? (
              <Loader variant="inline" />
            ) : (
              projectsWithImage?.map((project) => <PortfolioBox {...project} />)
            )}
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
