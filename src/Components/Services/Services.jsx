import Styles from "./Services.module.css";
import Service from "../../../public/icons/svg/2-User.svg?react";
import AnimatedSection from "../Animation/AnimatedSection";
import { scaleUp, fadeUp } from "../../Animations/Animations";

function Services() {
  return (
    <>
      <div className="container">
        <div className="sectionHead">
          <h2 className="sectionHeadTitle">خدمات</h2>
          <p className="sectionHeadCaption">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است.
          </p>
        </div>
        <div className={Styles.servicesWrapper}>
          <AnimatedSection variants={scaleUp}>
            <div className={Styles.service}>
              <Service className={Styles.serviceIcon} />

              <span className={Styles.serviceName}>App Design</span>
              <p className={Styles.serviceDescription}>
                ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection variants={scaleUp}>
            <div className={Styles.service}>
              <Service className={Styles.serviceIcon} />

              <span className={Styles.serviceName}>App Design</span>
              <p className={Styles.serviceDescription}>
                ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection variants={scaleUp}>
            <div className={Styles.service}>
              <Service className={Styles.serviceIcon} />

              <span className={Styles.serviceName}>App Design</span>
              <p className={Styles.serviceDescription}>
                ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection variants={scaleUp}>
            <div className={Styles.service}>
              <Service className={Styles.serviceIcon} />

              <span className={Styles.serviceName}>App Design</span>
              <p className={Styles.serviceDescription}>
                ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection variants={scaleUp}>
            <div className={Styles.service}>
              <Service className={Styles.serviceIcon} />

              <span className={Styles.serviceName}>App Design</span>
              <p className={Styles.serviceDescription}>
                ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection variants={scaleUp}>
            <div className={Styles.service}>
              <Service className={Styles.serviceIcon} />

              <span className={Styles.serviceName}>App Design</span>
              <p className={Styles.serviceDescription}>
                ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}

export default Services;
