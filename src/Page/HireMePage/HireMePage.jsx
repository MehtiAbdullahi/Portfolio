import React, { useState } from "react";
import {
  Code2,
  LayoutTemplate,
  FileCode2,
  Wand2,
  Bug,
  MessageCircle,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
  Send,
  RotateCcw,
} from "lucide-react";

import style from "./HireMePage.module.css";
import classNames from "classnames";
import Background from "../../Components/Animation/Background/Background";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const SERVICES = [
  { id: "fullsite", title: "طراحی و توسعه وب‌سایت کامل", icon: Code2 },
  { id: "frontend", title: "توسعه Front-End", icon: LayoutTemplate },
  { id: "figma", title: "تبدیل طراحی Figma به کد", icon: FileCode2 },
  { id: "fixbug", title: "رفع باگ و بهینه‌سازی سایت", icon: Bug },
  { id: "other", title: "خدمت دیگر", icon: Plus },
];

const BUDGETS = [
  "زیر 10 میلیون تومان",
  "10 تا 20 میلیون تومان",
  "15 تا 30 میلیون تومان",
  "بالای 30 میلیون تومان",
  "هنوز مشخص نیست",
];

const DEADLINES = [
  "فوری (زیر 1 هفته)",
  "1 تا 2 هفته",
  "3 تا 4 هفته",
  "بیش از 1 ماه",
  "زمان‌بندی منعطف",
];

const CONTACT_METHODS = ["تلفن", "ایمیل", "تلگرام"];

const STEPS = [
  { key: 1, label: "خدمت" },
  { key: 2, label: "جزئیات پروژه" },
  { key: 3, label: "بودجه و زمان" },
  { key: 4, label: "اطلاعات تماس" },
];

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        style["chip"],
        `${active ? style["chip--active"] : ""}`,
      )}
    >
      {children}
    </button>
  );
}

function FieldLabel({ children }) {
  return <label className={style["field-label"]}>{children}</label>;
}

function TextInput({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={style["text-input"]}
    />
  );
}

export default function HireMePage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    services: [],
    title: "",
    description: "",
    referenceLink: "",
    budget: "",
    deadline: "",
    name: "",
    email: "",
    phone: "",
    contactMethod: "",
  });

  const set = (key) => (val) => setData((d) => ({ ...d, [key]: val }));

  const toggleService = (id) => {
    setData((d) => ({
      ...d,
      services: d.services.includes(id)
        ? d.services.filter((s) => s !== id)
        : [...d.services, id],
    }));
  };

  const validateStep = () => {
    if (step === 1 && data.services.length === 0) {
      return "حداقل یک خدمت را انتخاب کنید";
    }
    if (step === 2 && (!data.title.trim() || !data.description.trim())) {
      return "عنوان و توضیحات پروژه را وارد کنید";
    }
    if (step === 3 && (!data.budget || !data.deadline)) {
      return "بودجه و زمان‌بندی را مشخص کنید";
    }
    if (step === 4 && (!data.name.trim() || !data.email.trim())) {
      return "نام و ایمیل الزامی است";
    }
    return "";
  };

  const goNext = () => {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    if (step < 4) setStep(step + 1);
    else setSubmitted(true);
  };

  const goBack = () => {
    setError("");
    if (step > 1) setStep(step - 1);
  };

  const restart = () => {
    setData({
      services: [],
      title: "",
      description: "",
      referenceLink: "",
      budget: "",
      deadline: "",
      name: "",
      email: "",
      phone: "",
      contactMethod: "",
    });
    setStep(1);
    setSubmitted(false);
    setError("");
  };

  const serviceTitleById = (id) => SERVICES.find((s) => s.id === id)?.title;

  return (
    <>
      <Background />
      <div className={style["back-to-home__btn"]}>
        <Link to="/">بازشگت به صفحه قبلی</Link>
        <IoMdArrowRoundBack />
      </div>
      <div dir="rtl" className={style["hire-page"]}>
        <div className={style["hire-container"]}>
          {/* Header */}
          <div className={style["hire-header"]}>
            <div className={style["hire-badge"]}>The Mehti</div>
            <h1 className={style["hire-title"]}>استخدام کردن من</h1>
            <p className={style["hire-subtitle"]}>
              جزئیات پروژه‌تون رو با من در میون بذارید تا سریع‌تر باهاتون تماس
              بگیرم
            </p>
          </div>

          {!submitted ? (
            <>
              {/* Step indicator */}
              <div className={style["step-indicator"]}>
                {STEPS.map((s, i) => (
                  <React.Fragment key={s.key}>
                    <div className={style["step-item"]}>
                      <div
                        className={classNames(
                          style["step-circle"],
                          step > s.key && style["step-circle--done"],
                          step === s.key && style["step-circle--active"],
                        )}
                      >
                        {step > s.key ? <Check size={16} /> : s.key}
                      </div>

                      <span
                        className={classNames(
                          style["step-label"],
                          step >= s.key && style["step-label--active"],
                        )}
                      >
                        {s.label}
                      </span>
                    </div>

                    {i < STEPS.length - 1 && (
                      <div
                        className={classNames(
                          style["step-line"],
                          step > s.key && style["step-line--done"],
                        )}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Card */}
              <div className={style["hire-card"]}>
                {step === 1 && (
                  <div>
                    <h2 className={style["step-heading"]}>
                      چه خدمتی نیاز دارید؟
                    </h2>

                    <p className={style["step-description"]}>
                      می‌تونید بیشتر از یک مورد رو انتخاب کنید
                    </p>

                    <div className={style["service-grid"]}>
                      {SERVICES.map((s) => {
                        const Icon = s.icon;
                        const active = data.services.includes(s.id);

                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => toggleService(s.id)}
                            className={classNames(
                              style["service-card"],
                              active && style["service-card--active"],
                            )}
                          >
                            <div
                              className={classNames(
                                style["service-icon"],
                                active && style["service-icon--active"],
                              )}
                            >
                              <Icon size={20} />
                            </div>

                            <span
                              className={classNames(
                                style["service-title"],
                                active && style["service-title--active"],
                              )}
                            >
                              {s.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className={style["form-stack"]}>
                    <h2
                      className={classNames(
                        style["step-heading"],
                        style["step-heading--tight"],
                      )}
                    >
                      جزئیات پروژه
                    </h2>

                    <div>
                      <FieldLabel>عنوان پروژه</FieldLabel>

                      <TextInput
                        value={data.title}
                        onChange={set("title")}
                        placeholder="مثلا: طراحی سایت فروشگاهی"
                      />
                    </div>

                    <div>
                      <FieldLabel>توضیحات پروژه</FieldLabel>

                      <textarea
                        value={data.description}
                        onChange={(e) => set("description")(e.target.value)}
                        placeholder="هر چیزی که فکر می‌کنید لازمه بدونم..."
                        rows={5}
                        className={style["text-area"]}
                      />
                    </div>

                    <div>
                      <FieldLabel>لینک مرجع (اختیاری)</FieldLabel>

                      <TextInput
                        value={data.referenceLink}
                        onChange={set("referenceLink")}
                        placeholder="لینک سایت مشابه، فایل فیگما و..."
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className={style["form-stack"]}>
                    <h2
                      className={classNames(
                        style["step-heading"],
                        style["step-heading--tight"],
                      )}
                    >
                      بودجه و زمان‌بندی
                    </h2>

                    <div>
                      <FieldLabel>بودجه تقریبی</FieldLabel>

                      <div className={style["chip-row"]}>
                        {BUDGETS.map((b) => (
                          <Chip
                            key={b}
                            active={data.budget === b}
                            onClick={() => set("budget")(b)}
                          >
                            {b}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    <div>
                      <FieldLabel>مهلت زمانی مورد نظر</FieldLabel>

                      <div className={style["chip-row"]}>
                        {DEADLINES.map((d) => (
                          <Chip
                            key={d}
                            active={data.deadline === d}
                            onClick={() => set("deadline")(d)}
                          >
                            {d}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className={style["form-stack"]}>
                    <h2
                      className={classNames(
                        style["step-heading"],
                        style["step-heading--tight"],
                      )}
                    >
                      اطلاعات تماس
                    </h2>

                    <div className={style["contact-grid"]}>
                      <div>
                        <FieldLabel>نام و نام‌خانوادگی</FieldLabel>

                        <TextInput
                          value={data.name}
                          onChange={set("name")}
                          placeholder="نام شما"
                        />
                      </div>

                      <div>
                        <FieldLabel>ایمیل</FieldLabel>

                        <TextInput
                          type="email"
                          value={data.email}
                          onChange={set("email")}
                          placeholder="example@email.com"
                        />
                      </div>

                      <div>
                        <FieldLabel>شماره تماس (اختیاری)</FieldLabel>

                        <TextInput
                          value={data.phone}
                          onChange={set("phone")}
                          placeholder="09xxxxxxxxx"
                        />
                      </div>

                      <div>
                        <FieldLabel>روش تماس ترجیحی</FieldLabel>

                        <div className={style["chip-row"]}>
                          {CONTACT_METHODS.map((m) => (
                            <Chip
                              key={m}
                              active={data.contactMethod === m}
                              onClick={() => set("contactMethod")(m)}
                            >
                              {m}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={style["summary-box"]}>
                      <p className={style["summary-title"]}>خلاصه سفارش</p>

                      <p className={style["summary-line"]}>
                        خدمات:{" "}
                        {data.services.map(serviceTitleById).join("، ") || "—"}
                      </p>

                      <p className={style["summary-line"]}>
                        عنوان: {data.title || "—"}
                      </p>

                      <p className={style["summary-line"]}>
                        بودجه: {data.budget || "—"} | زمان:{" "}
                        {data.deadline || "—"}
                      </p>
                    </div>
                  </div>
                )}

                {error && <p className={style["error-text"]}>{error}</p>}

                {/* Nav buttons */}
                <div className={style["nav-row"]}>
                  {step === 1 ? (
                    <Link className={style["btn-secondary"]} to="/">
                      بازگشت
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={goBack}
                      className={style["btn-secondary"]}
                    >
                      <ChevronRight size={16} />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={goNext}
                    className={style["btn-primary"]}
                  >
                    {step < 4 ? (
                      <>
                        بعدی
                        <ChevronLeft size={16} />
                      </>
                    ) : (
                      <>
                        ثبت سفارش
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className={style["success-card"]}>
              <div className={style["success-icon"]}>
                <Check size={28} />
              </div>

              <h2 className={style["success-title"]}>
                سفارش شما با موفقیت ثبت شد
              </h2>

              <p className={style["success-text"]}>
                ممنون از اعتمادتون، {data.name}. به زودی از طریق{" "}
                {data.contactMethod || "ایمیل"} باهاتون تماس می‌گیرم.
              </p>

              <button
                type="button"
                onClick={restart}
                className={style["btn-ghost"]}
              >
                <RotateCcw size={14} />
                ثبت سفارش جدید
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
