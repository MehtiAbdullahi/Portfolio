import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useTranslation } from "react-i18next";

// ? icons

import { LuMail } from "react-icons/lu";
import { GoLock } from "react-icons/go";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!EMAIL_REGEX.test(email.trim()) || password.length < 6) {
      setError("ایمیل یا رمز عبور معتبر نیست");
      return;
    }

    setIsSubmitting(true);

    // TODO: درخواست واقعی ورود و ارسال کد تایید به بک‌اند وصل بشه
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/verify-code", { state: { email, mode: "login" } });
    }, 900);
  };

  return (
    <div className={styles.page} dir="rtl">
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />
      <div className={styles.content}>
        <span className={`logo-TheMehti ${styles.brand}`}>The Mehti</span>

        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>{t("login.title")}</h1>
            <p className={styles.caption}>{t("login.text")}</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <input
                type="email"
                dir="ltr"
                className={styles.input}
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

            <div className={styles.field}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.input}
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

            {error && <p className={styles.errorText}>{error}</p>}

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
  );
};

export default Login;
