import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useTranslation } from "react-i18next";

// ? icons

import { LuMail } from "react-icons/lu";
import { GoLock } from "react-icons/go";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import Background from "../../Components/Animation/Background/Background";
import { testEmail } from "../../Validators/regex";
import classNames from "classnames";
import { AnimatePresence } from "framer-motion";
import Alert from "../../Components/AlertBox/Alert";

const Login = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    username: false,
    password: false,
  });
  const [alerts, setAlerts] = useState({
    emptyInput: false,
    notValid: false,
  });

  // ! handleSubmit

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim().length && password.trim().length) {
      if (testEmail(email)) {
        console.log("Everything Is Oky!");
      } else {
        setAlerts((prev) => ({
          ...prev,
          notValid: true,
        }));
      }
    } else {
      setAlerts((prev) => ({
        ...prev,
        emptyInput: true,
      }));
    }
  };

  // ! end handleSubmit

  // ! email

  const emailValueHandler = () => {
    if (testEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: false,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: true,
      }));
    }
  };

  useEffect(() => {
    emailValueHandler();
  }, [email]);

  useEffect(() => {
    const activesError = Object.values(alerts).some(Boolean);

    if (!activesError) {
      return;
    }

    const time = setTimeout(() => {
      setAlerts({
        emptyInput: false,
        notValid: false,
      });
    }, 3000);

    return () => clearTimeout(time);
  }, [alerts]);

  return (
    <>
      <AnimatePresence>
        {(alerts.emptyInput && (
          <Alert
            duration="3000"
            title="خطا"
            type="warning"
            message="برای ادامه، لطفاً همه اطلاعات را وارد کنید."
          />
        )) ||
          (alerts.notValid && (
            <Alert
              duration="5000"
              title="خطا"
              type="warning"
              message="ایمیل شما معتبر نیست!"
            />
          ))}
      </AnimatePresence>
      <Background />
      <div className={styles.page} dir="rtl">
        <div className={styles.glowOne} />
        <div className={styles.glowTwo} />
        <div className={styles.content}>
          <Link to="/" className={`logo-TheMehti ${styles.brand}`}>
            The Mehti
          </Link>

          <div className={styles.card}>
            <div className={styles.header}>
              <h1 className={styles.title}>{t("login.title")}</h1>
              <p className={styles.caption}>{t("login.text")}</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <input
                  type="email"
                  className={classNames(
                    styles.input,
                    alerts.emptyInput && !email && styles.error,
                  )}
                  placeholder=" "
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
                <label className={styles.label}>
                  {t("login.placeHolderEmail")}
                </label>
                <span className={styles.icon}>
                  <LuMail />
                </span>
              </div>

              {errors.email && email ? (
                <p className={styles.errorText}>{t("signUp.notValidEmail")}</p>
              ) : (
                ""
              )}

              <div className={styles.field}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={classNames(
                    styles.input,
                    alerts.emptyInput && !password && styles.error,
                  )}
                  placeholder=" "
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
                <label className={styles.label}>
                  {t("login.placeHolderPass")}
                </label>
                <span className={styles.icon}>
                  <GoLock />
                </span>
                <button
                  type="button"
                  className={styles.toggleVisibility}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="نمایش رمز عبور"
                >
                  {showPassword ? <LuEye /> : <LuEyeOff />}
                </button>
              </div>

              <button
                type="submit"
                className={styles.primaryBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className={styles.spinner} />
                ) : (
                  `${t("login.btnText")}`
                )}
              </button>
            </form>

            <p className={styles.switchRow}>
              {t("login.text2")}
              <Link to="/signup" className={styles.link}>
                {t("login.text3")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
