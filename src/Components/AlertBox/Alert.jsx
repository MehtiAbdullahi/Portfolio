import { useEffect } from "react";
import { motion } from "framer-motion";
import "./Alert.css";

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

export default function Alert({
  type = "info",
  title,
  message,
  onClose,
  duration = 4000,
  showClose = true,
}) {
  useEffect(() => {
    if (!duration) return undefined;
    const timer = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <div
        className={`themehti-alert themehti-alert--${type}`}
        role="alert"
        style={{ "--dur": `${duration}ms` }}
      >
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
            <span className="themehti-alert__progress-bar" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
