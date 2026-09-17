import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./ContactUs.module.css";
// import portfolios from "../../data/data";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "../../Redux/store/authSlice";

function ContactUs() {
  const dispatch = useDispatch();
  const { session, error, loading } = useSelector((state) => state.auth);

  const { t } = useTranslation();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [selectedService, setSelectedService] = useState(
    t("contactUs.defaultTitle"),
  );

  const fetchSession = () => {
    dispatch(getSession());
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <>
      <div className="container">
        <div className={Styles.contactUsWrapper} id="contactUs">
          <div className="sectionHead">
            <h2 className="sectionHeadTitle">{t("contactUs.contactMe")}</h2>
            <p className="sectionHeadCaption">
              {t("contactUs.contactCaption")}
            </p>
          </div>

          <div className={Styles.contactMeInputs} dir="ltr">
            <form action="" className={Styles.contactMeForm}>
              <div className={Styles.allInputInForm}>
                <input
                  className={Styles.contactMeInput}
                  type="text"
                  placeholder={t("contactUs.name")}
                />

                <input
                  className={Styles.contactMeInput}
                  type="text"
                  placeholder={t("contactUs.email")}
                />

                <input
                  className={Styles.contactMeInput}
                  type="text"
                  placeholder={t("contactUs.phoneNumber")}
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
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div
                    className={`${Styles.desiredServicesSubmenu} ${
                      showSubmenu ? Styles.active : ""
                    }`}
                  >
                    <ul className={Styles.desiredServicesList}>
                      <li
                        className={Styles.desiredServicesItem}
                        onClick={() =>
                          setSelectedService(t("contactUs.services.default"))
                        }
                      >
                        {t("contactUs.services.default")}
                      </li>

                      <li
                        className={Styles.desiredServicesItem}
                        onClick={() =>
                          setSelectedService(t("contactUs.services.webDesign"))
                        }
                      >
                        {t("contactUs.services.webDesign")}
                      </li>

                      <li
                        className={Styles.desiredServicesItem}
                        onClick={() =>
                          setSelectedService(t("contactUs.services.portfolio"))
                        }
                      >
                        {t("contactUs.services.portfolio")}
                      </li>

                      <li
                        className={Styles.desiredServicesItem}
                        onClick={() =>
                          setSelectedService(t("contactUs.services.pricing"))
                        }
                      >
                        {t("contactUs.services.pricing")}
                      </li>

                      <li
                        className={Styles.desiredServicesItem}
                        onClick={() =>
                          setSelectedService(t("contactUs.services.support"))
                        }
                      >
                        {t("contactUs.services.support")}
                      </li>
                    </ul>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder={t("contactUs.timeline")}
                  className={Styles.contactMeInput}
                />

                <textarea
                  className={Styles.contactUsTextarea}
                  name=""
                  id=""
                  rows={12}
                  placeholder={t("contactUs.projectDetails")}
                ></textarea>
              </div>

              <div className={Styles.formBtnWrapper}>
                {session === null ? (
                  <button
                    className={`btn btn-hover ${Styles.contactUsBtn}`}
                    type="submit"
                  >
                    {t("contactUs.send")}
                  </button>
                ) : (
                  <Link className={`btn btn-hover`} to="/login">
                    {t("contactUs.loginBtn")}
                  </Link>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
