import { Link } from "react-router-dom";
import Styles from "./Hero.module.css";
import TypeIt from "typeit-react";
import { useTranslation } from "react-i18next";
import { CiLinkedin } from "react-icons/ci";
import { BsGithub } from "react-icons/bs";
import { PiTelegramLogoLight } from "react-icons/pi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "../../Redux/store/authSlice";
import classNames from "classnames";

function Hero() {
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
        <div className={Styles.heroWrapper} id="home">
          <div className={Styles.heroRight}>
            <h6>{t("hero.greeting")}</h6>
            <h4>{t("hero.name")}</h4>
            <h1 className={Styles.heroExpertise}>
              <TypeIt
                options={{
                  speed: 60,
                  deleteSpeed: 35,
                  waitUntilVisible: true,
                  loop: true,
                }}
                getBeforeInit={(instance) => {
                  instance
                    .type("Front-End Developer")
                    .pause(2000)
                    .delete()
                    .pause(500)
                    .type("Responsive Web Developer")
                    .pause(2000)
                    .delete()
                    .pause(500)
                    .type("React Developer")
                    .pause(2000)
                    .delete()
                    .pause(500)
                    .type("Next.js Developer")
                    .pause(2000)
                    .delete()
                    .pause(500);

                  return instance;
                }}
              />
              <span className={Styles.heroExpertiseCrusor}></span>
            </h1>
            <span className={Styles.herodropshadow}></span>
            <div className={Styles.heroSocials}>
              <a
                className={Styles["heroSocialLink"]}
                href="https://www.linkedin.com/in/mehtiabdullahi"
                target="_blank"
              >
                <CiLinkedin />
              </a>
              <a
                className={Styles["heroSocialLink"]}
                href="https://github.com/MehtiAbdullahi"
                target="_blank"
              >
                <BsGithub />
              </a>
              <a
                className={Styles["heroSocialLink"]}
                href="https://t.me/TheMehtiTM"
                target="_blank"
              >
                <PiTelegramLogoLight />
              </a>
            </div>
            <div className={Styles.heroBtns}>
              {user ? (
                <Link to="/hire-me" className={`btn-hover ${Styles.hireMeBtn}`}>
                  {t("hero.hireMe")}
                </Link>
              ) : (
                <Link to="/login" className={`btn-hover ${Styles.hireMeBtn}`}>
                  {t("hero.loginBtn")}
                </Link>
              )}

              <a className={Styles.myPortfolioBtn} href="#portfolio">
                {t("hero.portfolio")}
              </a>
              <a
                className={classNames(
                  Styles.downloadResume,
                  Styles.myPortfolioBtn,
                )}
                href={`${import.meta.env.BASE_URL}resume/mehti_abdullahi_resume.pdf`}
                download="mehti_abdullahi_resume.pdf"
              >
                {t("hero.downloadResume")}
              </a>
            </div>
            <div className={Styles.allWorksWrapper}>
              <div className={Styles.allWorks}>
                <div className={Styles.allWorksRxperiences}>
                  <h4>+1 year</h4>
                  <span>{t("hero.experience")}</span>
                </div>

                <div className={Styles.allWorksProjectDone}>
                  <h4>2+</h4>
                  <span>{t("hero.projectsCompleted")}</span>
                </div>

                <div className={Styles.allWorksClients}>
                  <h4>10+</h4>
                  <span>{t("hero.clients")}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.heroLeft}>
            <div className={Styles.frame}>
              <div className={Styles.hairline}></div>
              <div className={Styles.portrait}>
                <img src={`${import.meta.env.BASE_URL}image/my51.webp`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
