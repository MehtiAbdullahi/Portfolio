import React from "react";
import Styles from "./Aboutme.module.css";
import { Link } from "react-router-dom";
import Skill from "../Skill/Skill";
import AnimatedSection from "../Animation/AnimatedSection";
import { fadeRight } from "../../Animations/Animations";
import { useTranslation } from "react-i18next";

function Aboutme() {
  const { t } = useTranslation();

  return (
    <>
      <div className="container">
        <div className="sectionHead">
          <h2 className="sectionHeadTitle"> {t("aboutMe.title")} </h2>
          <p className="sectionHeadCaption"> {t("aboutMe.caption")} </p>
        </div>
        <div className={Styles.aboutMeWrapper}>
          <div className={Styles.aboutMeRight}>
            <AnimatedSection variants={fadeRight}>
              <p className={Styles.aboutMeCaption}>
                {t("aboutMe.description")}
              </p>
            </AnimatedSection>
            <Link className={`btn btn-hover ${Styles.aboutMeBtn}`} to="/hire-me">
              {t("aboutMe.hireMe")}
            </Link>
          </div>
          <div className={Styles.aboutMeLeft}>
            <div className={Styles.aboutMeImgWrapper}>
              <img
                src="/image/Layer.png"
                alt={t("aboutMe.imageAlt")}
                className={Styles.aboutMeImg}
              />
              <span className={Styles.aboutMeBgImg}></span>
            </div>
          </div>
        </div>
        <div className={Styles.aboutMeSkills}>
          <Skill />
        </div>
      </div>
    </>
  );
}

export default Aboutme;
