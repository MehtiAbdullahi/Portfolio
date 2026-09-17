import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./VerifyCode.module.css";

// ? Icons

import { GoShieldCheck } from "react-icons/go";
import { useTranslation } from "react-i18next";

const CODE_LENGTH = 4;
const RESEND_SECONDS = 60;

const maskPhone = (phone) => {
  if (!phone || phone.length < 6) return phone || "شماره شما";
  return `${phone.slice(0, 4)}***${phone.slice(-3)}`;
};

const VerifyCode = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone ?? "";

  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const inputsRef = useRef([]);

  useEffect(() => {
    if (secondsLeft <= 0) return undefined;
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const code = useMemo(() => digits.join(""), [digits]);
  const isComplete = code.length === CODE_LENGTH;

  const formattedTimer = useMemo(() => {
    const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const seconds = String(secondsLeft % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [secondsLeft]);

  const updateDigit = (index, value) => {
    const nextDigits = [...digits];
    nextDigits[index] = value;
    setDigits(nextDigits);
    setHasError(false);

    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleChange = (index) => (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "").slice(-1);
    updateDigit(index, value);
  };

  const handleKeyDown = (index) => (event) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, CODE_LENGTH)
      .split("");

    if (!pasted.length) return;

    const nextDigits = Array(CODE_LENGTH).fill("");
    pasted.forEach((digit, index) => {
      nextDigits[index] = digit;
    });
    setDigits(nextDigits);
    inputsRef.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isComplete) return;

    setIsSubmitting(true);
    setHasError(false);

    // TODO: بررسی واقعی کد تایید با بک‌اند وصل بشه
    setTimeout(() => {
      setIsSubmitting(false);
      const isCodeValid = true; // نتیجه واقعی از سرور میاد

      if (isCodeValid) {
        navigate("/");
      } else {
        setHasError(true);
        setDigits(Array(CODE_LENGTH).fill(""));
        inputsRef.current[0]?.focus();
      }
    }, 900);
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    // TODO: درخواست واقعی ارسال مجدد کد به بک‌اند وصل بشه
    setSecondsLeft(RESEND_SECONDS);
    setDigits(Array(CODE_LENGTH).fill(""));
    setHasError(false);
    inputsRef.current[0]?.focus();
  };

  const otpRowClassName = [
    styles.otpRow,
    isComplete && !hasError ? styles.otpRowComplete : "",
    hasError ? styles.otpRowError : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.page} dir="rtl">
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />

      <div className={styles.content}>
        <span className={`logo-TheMehti ${styles.brand}`}>The Mehti</span>

        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <GoShieldCheck />
          </div>

          <div className={styles.header}>
            <h1 className={styles.title}>{t("verify.title")}</h1>
            <p className={styles.caption}>
              {t("verify.text")}
              <span className={styles.phoneNumber}>{maskPhone(phone)}</span>
              {t("verify.text2")}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className={otpRowClassName} onPaste={handlePaste}>
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputsRef.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className={`${styles.otpBox} ${
                    digit ? styles.otpBoxFilled : ""
                  }`}
                  value={digit}
                  onChange={handleChange(index)}
                  onKeyDown={handleKeyDown(index)}
                />
              ))}
            </div>

            {hasError && <p className={styles.errorText}>{t()}</p>}

            <button
              type="submit"
              className={styles.primaryBtn}
              disabled={!isComplete || isSubmitting}
            >
              {isSubmitting ? <span className={styles.spinner} /> : `${t("verify.btn")}`}
            </button>
          </form>

          <div className={styles.footerRow}>
            {secondsLeft > 0 ? (
              <span>
                {t("verify.resendCode")}
                <span className={styles.timer}>{formattedTimer}</span>
              </span>
            ) : (
              <button
                type="button"
                className={styles.resendBtn}
                onClick={handleResend}
              >
                {t("verify.resendCode")}
              </button>
            )}

            <Link to="/login" className={styles.backLink}>
              {t("verify.editPhoneNumber")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
