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

const allTabs = [
  { id: 1, title: "portfolio.tabs.all", key: "all" },
  { id: 2, title: "portfolio.tabs.panel", key: "panel" },
];

function Portfolio() {
  const [itemSelected, setItemSelected] = useState("all");

  const dispatch = useDispatch();

  const {
    projects,
    error: projectError,
    loading: projectLoading,
  } = useSelector((state) => state.project);

  const { t } = useTranslation();

  const projectsWithImage = projects.map((project) => ({
    ...project,
    image: supabase.storage.from("project-images").getPublicUrl(project.image)
      .data.publicUrl,
  }));

  const filteredProjects = projectsWithImage.filter((project) => {
    if (itemSelected === "all") {
      return true;
    } else {
      return project.category === itemSelected;
    }
  });

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

  return (
    <div className="container">
      <div className="sectionHead">
        <h2 className="sectionHeadTitle">{t("portfolio.title")}</h2>
      </div>

      <div className={Styles.portfolioWrapper} id="portfolio">
        <div className={(Styles.allTortfolioTabs)}>
          <ul className={Styles.portfolioList}>
            {allTabs.map(({ id, key, title }) => (
              <li
                key={id}
                className={`${Styles.portfolioItem} ${itemSelected === key ? Styles.selected : ""}`}
                onClick={() => setItemSelected(key)}
              >
                <Link className={Styles.portfolioLink}>{t(title)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={Styles.portfolios}>
          {/* {portfolioData.map((data) => {})} */}

          <div className={Styles.portfolioBoxs}>
            {projectLoading ? (
              <Loader variant="inline" />
            ) : (
              filteredProjects?.map((project) => <PortfolioBox {...project} />)
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
