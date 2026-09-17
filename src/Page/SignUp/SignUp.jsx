import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";

// ? icons

import { LuUserRound } from "react-icons/lu";
import { LuMail } from "react-icons/lu";
import { GoLock } from "react-icons/go";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUp = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (
      username.trim().length < 3 ||
      !EMAIL_REGEX.test(email.trim()) ||
      password.length < 6
    ) {
      setError("لطفا همه فیلدها رو به‌درستی پر کن");
      return;
    }

    setIsSubmitting(true);

    // TODO درخواست واقعی ثبت‌نام و ارسال کد تایید به بک‌اند وصل بشه

    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/verify-code", { state: { email, mode: "signup" } });
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
            <h1 className={styles.title}>{t("signUp.title")}</h1>
            <p className={styles.caption}>{t("signUp.text")}</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <input
                type="text"
                className={styles.input}
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
                dir="ltr"
                className={styles.input}
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

            <div className={styles.field}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.input}
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

            {error && <p className={styles.errorText}>{error}</p>}

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
  );
};

export default SignUp;
