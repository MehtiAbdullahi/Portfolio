import Styles from "./Services.module.css";
import Service from "../../../public/icons/svg/2-User.svg?react";
import AnimatedSection from "../Animation/AnimatedSection";
import { scaleUp } from "../../Animations/Animations";
import { useTranslation } from "react-i18next";

function Services() {
  const { t } = useTranslation();
  const services = [
    {
      title: "services.items.webDevelopment.title",
      des: "services.items.webDevelopment.description",
    },
    {
      title: "services.items.frontend.title",
      des: "services.items.frontend.description",
    },
    {
      title: "services.items.pageDesign.title",
      des: "services.items.pageDesign.description",
    },
    {
      title: "services.items.reactNext.title",
      des: "services.items.reactNext.description",
    },
    {
      title: "services.items.bugFixing.title",
      des: "services.items.bugFixing.description",
    },
    {
      title: "services.items.fullProject.title",
      des: "services.items.fullProject.description",
    },
  ];

  return (
    <>
      <div className="container">
        <div className="sectionHead">
          <h2 className="sectionHeadTitle">{t("services.title")}</h2>

          <p className="sectionHeadCaption">{t("services.caption")}</p>
        </div>

        <div className={Styles.servicesWrapper}>
          {services.map(({ title, des }) => (
            <AnimatedSection key={title} variants={scaleUp}>
              <div className={Styles.service}>
                <div className={Styles.serviceIcon}>
                  <Service />
                </div>

                <span className={Styles.serviceName}>{t(title)}</span>

                <p className={Styles.serviceDescription}>{t(des)}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </>
  );
}

export default Services;
