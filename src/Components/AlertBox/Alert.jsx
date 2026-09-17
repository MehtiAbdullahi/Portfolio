import { useEffect, useRef, useState } from "react";
import "./Alert.css";

/**
 * آیکون‌های هر نوع Alert (بدون وابستگی به کتابخانه خارجی)
 */
const ICONS = {
  success: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path
        d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path
        d="M12 16v-4m0-4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

/**
 * کامپوننت Alert
 *
 * props:
 *  - type: "success" | "error" | "warning" | "info"   (پیش‌فرض: "info")
 *  - title: عنوان کوتاه (اختیاری)
 *  - message: متن پیام
 *  - onClose: تابعی که هنگام بسته‌شدن (دستی یا خودکار) صدا زده می‌شود
 *  - duration: زمان نمایش خودکار به میلی‌ثانیه، 0 یعنی بدون بسته‌شدن خودکار (پیش‌فرض: 4000)
 *  - showClose: نمایش دکمه بستن (پیش‌فرض: true)
 *
 * توجه: این کامپوننت فقط ظاهر و جایگذاری (position: fixed, بالای صفحه، وسط)
 * را مدیریت می‌کند. انیمیشن ورود/خروج آن با AnimatedSection شما مدیریت می‌شود.
 * فقط کافیه که والدِ فرزندی که به آن transform می‌دهید، خودِ همین المان
 * ریشه‌ی alert نباشد؛ در غیر این صورت position:fixed آن نسبت به همان
 * والد ترنسفورم‌شده محاسبه می‌شود (رفتار استاندارد CSS) و ممکن است از
 * وسط بالای صفحه جابه‌جا شود.
 */
export default function Alert({
  type = "info",
  title,
  message,
  onClose,
  duration = 4000,
  showClose = true,
}) {
  const [remaining, setRemaining] = useState(100);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!duration) return undefined;

    startRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const percent = Math.max(0, 100 - (elapsed / duration) * 100);
      setRemaining(percent);

      if (percent <= 0) {
        onClose?.();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  return (
    <div className={`themehti-alert themehti-alert--${type}`} role="alert">
      <div className="themehti-alert__icon">{ICONS[type] ?? ICONS.info}</div>

      <div className="themehti-alert__content">
        {title && <p className="themehti-alert__title">{title}</p>}
        {message && <p className="themehti-alert__message">{message}</p>}
      </div>

      {showClose && (
        <button
          type="button"
          className="themehti-alert__close"
          onClick={onClose}
          aria-label="بستن"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {!!duration && (
        <div className="themehti-alert__progress">
          <span
            className="themehti-alert__progress-bar"
            style={{ width: `${remaining}%` }}
          />
        </div>
      )}
    </div>
  );
}
