import Styles from "./Services.module.css";
import Service from "../../../public/icons/svg/2-User.svg?react";
import AnimatedSection from "../Animation/AnimatedSection";
import { scaleUp } from "../../Animations/Animations";

function Services() {
  const services = [
    {
      title: "طراحی و توسعه سایت",
      des: `طراحی و ساخت سایت از صفر، متناسب با نیاز و هدف کسب‌وکار شما.
تمرکز روی ظاهر مدرن، ساختار مناسب و تجربه کاربری روان.
سایت به‌صورت ریسپانسیو برای موبایل، تبلت و دسکتاپ توسعه داده می‌شود.`,
    },
    {
      title: "توسعه Front-End",
      des: `پیاده‌سازی بخش ظاهری و تعاملی سایت با استفاده از تکنولوژی‌های مدرن.
کدنویسی تمیز، ساختار قابل توسعه و توجه به جزئیات رابط کاربری.
هدف، ساخت تجربه‌ای سریع، روان و سازگار با انواع دستگاه‌هاست.`,
    },
    {
      title: "طراحی و پیاده‌سازی صفحات",
      des: `تبدیل ایده، طرح اولیه یا فایل طراحی شما به صفحات واقعی و قابل استفاده.
تمام جزئیات ظاهری با دقت پیاده‌سازی شده و در اندازه‌های مختلف صفحه نمایش
به‌درستی نمایش داده می‌شوند.`,
    },
    {
      title: "توسعه با React و Next.js",
      des: `ساخت وب‌سایت‌ها و رابط‌های کاربری مدرن با React و Next.js.
استفاده از ساختارهای منظم و قابل توسعه برای پروژه‌های کوچک و بزرگ.
تمرکز بر عملکرد، سرعت و ایجاد تجربه کاربری بهتر در وب‌سایت.`,
    },
    {
      title: "رفع باگ و بهینه‌سازی",
      des: `بررسی و رفع مشکلات ظاهری و فنی بخش Front-End سایت.
بهبود سرعت، عملکرد، ریسپانسیو بودن و ساختار کد در صورت نیاز.
هدف، تبدیل یک سایت پرمشکل به تجربه‌ای روان‌تر و پایدارتر برای کاربران است.`,
    },
    {
      title: "اجرای کامل پروژه",
      des: `اگر برای اجرای پروژه به چند متخصص نیاز داشته باشید، می‌توانم هماهنگی بخش‌های مختلف را بر عهده بگیرم.
بخش Front-End توسط خودم انجام می‌شود و برای بخش‌های دیگر با متخصص مربوطه همکاری می‌کنم.
`,
    },
  ];

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
          {services.map(({ title, des }) => (
            <AnimatedSection variants={scaleUp}>
              <div className={Styles.service}>
                <div className={Styles.serviceIcon}>
                  <Service />
                </div>
                <span className={Styles.serviceName}>{title}</span>
                <p className={Styles.serviceDescription}>{des}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </>
  );
}

export default Services;
