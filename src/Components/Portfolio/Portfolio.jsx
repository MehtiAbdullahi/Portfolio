import { Link } from "react-router-dom";
import Styles from "./Portfolio.module.css";
import PortfolioBox from "../PortfolioBox/PortfolioBox";
import AnimatedSection from "../Animation/AnimatedSection";
import { fadeUp } from "../../Animations/Animations";

function Portfolio() {
  return (
    <>
      <div className="container">
        <div className="sectionHead">
          <h2 className="sectionHeadTitle">نمونه کار ها</h2>
        </div>
        <div className={Styles.portfolioWrapper} id="portfolio">
          <div className={Styles.portfolioTabs}>
            <ul className={Styles.portfolioList}>
              <li className={`${Styles.portfolioItem} ${Styles.selected}`}>
                <Link className={Styles.portfolioLink}>همه</Link>
              </li>
              <li className={`${Styles.portfolioItem}`}>
                <Link className={Styles.portfolioLink}>سایت فیلم</Link>
              </li>
              <li className={`${Styles.portfolioItem}`}>
                <Link className={Styles.portfolioLink}>داشبورد سایت</Link>
              </li>
              <li className={`${Styles.portfolioItem}`}>
                <Link className={Styles.portfolioLink}>سایت فروشگاهی</Link>
              </li>
            </ul>
          </div>
          <div className={Styles.portfolios}>
            {/* {portfolioData.map((data) => {})} */}
            <AnimatedSection variants={fadeUp}>
              <div className={Styles.portfolioBoxs}>
                <PortfolioBox
                  name="زالوا"
                  category="سایت فیلم"
                  year="۱۴۰۳"
                  tags={["طراحی رابط", "فرانت‌اند"]}
                  image="/public/image/Rectangle 21.png"
                  href="#"
                />
                <PortfolioBox
                  name="زالوا"
                  category="سایت فیلم"
                  year="۱۴۰۳"
                  tags={["طراحی رابط", "فرانت‌اند"]}
                  image="/public/image/Rectangle 21.png"
                  href="#"
                />
                <PortfolioBox
                  name="زالوا"
                  category="سایت فیلم"
                  year="۱۴۰۳"
                  tags={["طراحی رابط", "فرانت‌اند"]}
                  image="/public/image/Rectangle 21.png"
                  href="#"
                />
                <PortfolioBox
                  name="زالوا"
                  category="سایت فیلم"
                  year="۱۴۰۳"
                  tags={["طراحی رابط", "فرانت‌اند"]}
                  image="/public/image/Rectangle 21.png"
                  href="#"
                />
                <PortfolioBox
                  name="زالوا"
                  category="سایت فیلم"
                  year="۱۴۰۳"
                  tags={["طراحی رابط", "فرانت‌اند"]}
                  image="/public/image/Rectangle 21.png"
                  href="#"
                />
                <PortfolioBox
                  name="زالوا"
                  category="سایت فیلم"
                  year="۱۴۰۳"
                  tags={["طراحی رابط", "فرانت‌اند"]}
                  image="/public/image/Rectangle 21.png"
                  href="#"
                />
              </div>
            </AnimatedSection>
            <Link className={`btn btn-hover ${Styles.morePortfolioBtn}`}>
              مشاهده بیشتر
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Portfolio;
