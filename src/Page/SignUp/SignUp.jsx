import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { AnimatePresence, time } from "framer-motion";
import { useTranslation } from "react-i18next";
import Background from "../../Components/Animation/Background/Background";
import Loader from "../../Components/Animation/Loader/Loader";
import { testEmail, testPassword } from "../../Validators/regex";
import PasswordRules from "../../Components/PasswordRules/PasswordRules";
import Alert from "../../Components/AlertBox/Alert";
import classNames from "classnames";

// ? icons

import { LuUserRound } from "react-icons/lu";
import { LuMail } from "react-icons/lu";
import { GoLock } from "react-icons/go";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

const SignUp = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
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
    sentConfirmMessage: false,
  });

  // ! handleSubmit

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      username.trim().length &&
      email.trim().length &&
      password.trim().length
    ) {
      if (testPassword(password)) {
        setAlerts((prev) => ({
          ...prev,
          sentConfirmMessage: true,
        }));
        setIsSubmitting(true);
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
    }, 5000);

    return () => clearTimeout(time);
  }, [alerts]);

  // ! end email

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
              message="رمز شما معتبر نیست!"
            />
          )) ||
          (alerts.sentConfirmMessage && (
            <Alert
              duration="5000"
              title="ایمیل خود را تأیید کنید"
              type="success"
              message="لینک تأیید حساب به ایمیل شما ارسال شد."
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
              <h1 className={styles.title}>{t("signUp.title")}</h1>
              <p className={styles.caption}>{t("signUp.text")}</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <input
                  type="text"
                  className={classNames(
                    styles.input,
                    alerts.emptyInput && !username && styles.error,
                  )}
                  placeholder=" "
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                />
                <label className={styles.label}>
                  {t("signUp.placeHolderUsername")}
                </label>
                <span className={styles.icon}>
                  <LuUserRound />
                </span>
              </div>

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
                  {t("signUp.placeHolderEmail")}
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

              <div className={styles.passwordGroup}>
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
                    autoComplete="new-password"
                  />
                  <label className={styles.label}>
                    {t("signUp.placeHolderPass")}
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

                <ul className={styles.passwordRulesWrapper}>
                  {<PasswordRules value={password} />}
                </ul>
              </div>

              <button
                type="submit"
                className={styles.primaryBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className={styles.spinner} />
                ) : (
                  `${t("signUp.btnText")}`
                )}
              </button>
            </form>

            <p className={styles.switchRow}>
              {t("signUp.text2")}
              <Link to="/login" className={styles.link}>
                {t("signUp.text3")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
