import React from "react";
import Styles from "./Aboutme.module.css";
import { Link } from "react-router-dom";
import Skill from "../Skill/Skill";
import AnimatedSection from "../Animation/AnimatedSection";
import { fadeRight } from "../../Animations/Animations";

function Aboutme() {
  return (
    <>
      <div className="container">
        <div className="sectionHead">
          <h2 className="sectionHeadTitle">درباره من</h2>
          <p className="sectionHeadCaption">طراح سایت، بخش فرنت اند</p>
        </div>
        <div className={Styles.aboutMeWrapper}>
          <div className={Styles.aboutMeRight}>
            <AnimatedSection variants={fadeRight}>
              <p className={Styles.aboutMeCaption}>
                من یک طراح و توسعه‌دهنده فرانت‌اند هستم با تمرکز بر طراحی رابط
                کاربری جذاب، سریع و کاربرپسند. علاقه‌ی اصلی من تبدیل ایده‌ها و
                طرح‌ها به رابط‌های تعاملی و زنده در وب است. در طراحی سایت، علاوه
                بر زیبایی بصری، به تجربه کاربری (UX)، عملکرد و دسترس‌پذیری اهمیت
                زیادی می‌دهم. تسلط خوبی بر HTML، CSS، JavaScript و فریم‌ورک‌هایی
                مانند React دارم و همواره تلاش می‌کنم کدهای تمیز، قابل توسعه و
                استاندارد بنویسم. ریسپانسیو بودن سایت و سازگاری با مرورگرها از
                اولویت‌های کاری من است. یادگیری مداوم تکنولوژی‌های جدید وب و
                به‌روز ماندن با ترندهای طراحی از ویژگی‌های اصلی من است. از کار
                تیمی، حل چالش‌های فنی و تبدیل نیازهای کارفرما به یک محصول
                کاربردی و حرفه‌ای لذت می‌برم و هدفم ساخت وب‌سایت‌هایی است که هم
                زیبا باشند و هم موثر.
              </p>
            </AnimatedSection>

            <Link className={`btn btn-hover ${Styles.aboutMeBtn}`}>
              استخدام کردن
            </Link>
          </div>
          <div className={Styles.aboutMeLeft}>
            <div className={Styles.aboutMeImgWrapper}>
              <img
                src="/image/Layer.png"
                alt=""
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
