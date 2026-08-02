import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./ContactUs.module.css";
// import portfolios from "../../data/data";

function ContactUs() {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [selectedService, setSelectedService] = useState("خدمات مورد نظر");
  // const [portfolioData, setPortfolioData] = useState(portfolios);

  return (
    <>
      <div className="container">
        <div className={Styles.contactUsWrapper} id="contactUs">
          <div className="sectionHead">
            <h2 className="sectionHeadTitle">ارتباط با من</h2>
            <p className="sectionHeadCaption">
              میتونید برای خدمات یا اطلاعات بیشتر با من ارتباط برقرار کنید :)
            </p>
          </div>
          <div className={Styles.contactMeInputs} dir="ltr">
            <form action="" className={Styles.contactMeForm}>
              <div className={Styles.allInputInForm}>
                <input
                  className={Styles.contactMeInput}
                  type="text"
                  placeholder="Name"
                />
                <input
                  className={Styles.contactMeInput}
                  type="text"
                  placeholder="Email"
                />
                <input
                  className={Styles.contactMeInput}
                  type="text"
                  placeholder="Phone Number"
                />
                <div
                  className={Styles.desiredServices}
                  onClick={() => setShowSubmenu((prev) => !prev)}
                >
                  <span className={Styles.desiredServicesTitle}>
                    {selectedService}
                  </span>
                  <svg
                    className={Styles.desiredServiceIcon}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 8.5L12 15.5L5 8.5"
                      stroke="#959595"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div
                    className={`${Styles.desiredServicesSubmenu} ${showSubmenu ? Styles.active : ""}`}
                  >
                    <ul className={Styles.desiredServicesList}>
                      <li
                        className={Styles.desiredServicesItem}
                        onClick={() => setSelectedService("خدمات مورد نظر")}
                      >
                        خدمات مورد نظر
                      </li>
                      <li
                        className={Styles.desiredServicesItem}
                        onClick={() => setSelectedService("طراحی سایت")}
                      >
                        طراحی سایت
                      </li>
                      <li
                        className={Styles.desiredServicesItem}
                        onClick={() => setSelectedService("نمونه کار ها")}
                      >
                        نمونه کار ها
                      </li>
                      <li
                        className={Styles.desiredServicesItem}
                        onClick={() => setSelectedService("قیمت طراحی")}
                      >
                        قیمت طراحی
                      </li>
                      <li
                        className={Styles.desiredServicesItem}
                        onClick={() => setSelectedService("پشتیبانی")}
                      >
                        پشتیبانی
                      </li>
                    </ul>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Timeline"
                  className={Styles.contactMeInput}
                />
                <textarea
                  className={Styles.contactUsTextarea}
                  name=""
                  id=""
                  rows={12}
                  placeholder="Project Details..."
                ></textarea>
              </div>
              <div className={Styles.formBtnWrapper}>
                <button
                  className={`btn btn-hover ${Styles.contactUsBtn}`}
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
