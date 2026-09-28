import React, { useEffect } from "react";
import Styles from "./Aboutme.module.css";
import { Link } from "react-router-dom";
import Skill from "../Skill/Skill";
import AnimatedSection from "../Animation/AnimatedSection";
import { fadeRight } from "../../Animations/Animations";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "../../Redux/store/authSlice";

function Aboutme() {
  const dispatch = useDispatch();
  const { session, user, error, loading } = useSelector((state) => state.auth);

  const { t } = useTranslation();

  const fetchSession = () => {
    dispatch(getSession());
  };

  useEffect(() => {
    fetchSession();
  }, []);

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
            {user ? (
              <Link
                className={`btn btn-hover ${Styles.aboutMeBtn}`}
                to="/hire-me"
              >
                {t("aboutMe.hireMe")}
              </Link>
            ) : (
              <Link
                className={`btn btn-hover ${Styles.aboutMeBtn}`}
                to="/hire-me"
              >
                {t("aboutMe.loginBtn")}
              </Link>
            )}
          </div>
          <div className={Styles.aboutMeLeft}>
            <div className={Styles.aboutMeImgWrapper}>
              <img
                src={`${import.meta.env.BASE_URL}/image/Layer.webp`}
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
