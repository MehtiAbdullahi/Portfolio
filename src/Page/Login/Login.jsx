import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useTranslation } from "react-i18next";

// ? icons

import { LuPhone } from "react-icons/lu";
import { GoLock } from "react-icons/go";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.6 10.8c1.3 2.6 3.5 4.7 6.1 6.1l2-2a1 1 0 0 1 1.1-.2c1.2.4 2.5.6 3.8.6a1 1 0 0 1 1 1v3.4a1 1 0 0 1-1 1C10.4 20.7 3.3 13.6 3.3 4.5a1 1 0 0 1 1-1H7.7a1 1 0 0 1 1 1c0 1.3.2 2.6.6 3.8a1 1 0 0 1-.25 1.02l-2 2Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="4.5"
      y="10.5"
      width="15"
      height="9.5"
      rx="2.2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const EyeIcon = ({ open }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {open ? (
      <>
        <path
          d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="2.6"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </>
    ) : (
      <path
        d="M3.5 3.5l17 17M9.9 9.9a2.6 2.6 0 0 0 3.7 3.7M6.2 6.5C4.2 7.9 2.5 10 2.5 12c0 0 3.5 6.5 9.5 6.5 1.8 0 3.4-.5 4.7-1.3M10.6 5.7c.45-.1.9-.15 1.4-.15 6 0 9.5 6.5 9.5 6.5-.5.9-1.2 1.9-2.1 2.85"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

const Login = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (phone.length < 10 || password.length < 6) {
      setError("شماره تلفن یا رمز عبور معتبر نیست");
      return;
    }

    setIsSubmitting(true);

    // TODO: درخواست واقعی ورود و ارسال کد تایید به بک‌اند وصل بشه
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/verify-code", { state: { phone, mode: "login" } });
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
                type="tel"
                dir="ltr"
                inputMode="numeric"
                className={styles.input}
                placeholder=" "
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                autoComplete="tel"
              />
              <label className={styles.label}>
                {t("login.placeHolderPhone")}
              </label>
              <span className={styles.icon}>
                <LuPhone />
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
