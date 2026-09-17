import "./Loader.css";

/**
 * کامپوننت Loader — سبک Orbit (حلقه‌های مداری + هسته‌ی نورانی + جرقه‌ها)
 *
 * props:
 *  - variant: "fullpage" | "inline"   (پیش‌فرض: "fullpage")
 *      fullpage → دقیقاً وسط کل صفحه (position: fixed) + overlay تیره پشتش
 *      inline   → دقیقاً وسط نزدیک‌ترین والدِ position:relative (مثلاً یک باکس
 *                  که از بک‌اند دیتا می‌گیره)
 *
 *  - size: اندازه‌ی لودر (هر واحد CSS، مثلاً "6rem" یا "80px").
 *          پیش‌فرض: fullpage = 9rem  |  inline = 5rem
 *
 *  - overlay: نمایش پس‌زمینه‌ی نیمه‌شفاف پشت لودر.
 *          پیش‌فرض: fullpage = true  |  inline = false
 *
 * نکته‌ی مهم برای حالت inline:
 * والدِ مستقیم (همون باکسی که می‌خوای لودر وسطش بیاد) باید
 * position: relative داشته باشه، چون Loader با position: absolute
 * نسبت به آن جایگذاری می‌شود.
 */
export default function Loader({ variant = "fullpage", size, overlay }) {
  const isFullpage = variant === "fullpage";
  const showOverlay = overlay ?? isFullpage;
  const loaderSize = size ?? (isFullpage ? "9rem" : "5rem");

  const wrapperClass = [
    "themehti-loader-wrapper",
    isFullpage
      ? "themehti-loader-wrapper--fullpage"
      : "themehti-loader-wrapper--inline",
    showOverlay ? "themehti-loader-wrapper--overlay" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClass} role="status" aria-live="polite">
      <span className="themehti-loader" style={{ "--loader-size": loaderSize }}>
        <span className="themehti-loader__aura" />
        <span className="themehti-loader__ring themehti-loader__ring--outer" />
        <span className="themehti-loader__ring themehti-loader__ring--middle" />
        <span className="themehti-loader__core" />
        <span className="themehti-loader__sparks">
          <span className="themehti-loader__spark" />
          <span className="themehti-loader__spark" />
          <span className="themehti-loader__spark" />
        </span>
      </span>
      <span className="themehti-loader__sr-only">در حال بارگذاری</span>
    </div>
  );
}
