import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
import HelpWidget from "../../Components/Help/Help";

const SERVICES = [
  { id: "fullsite", icon: Code2 },
  { id: "frontend", icon: LayoutTemplate },
  { id: "figma", icon: FileCode2 },
  { id: "fixbug", icon: Bug },
  { id: "other", icon: Plus },
];

const BUDGETS = [
  "underTen",
  "tenToTwenty",
  "fifteenToThirty",
  "overThirty",
  "notSure",
];

const DEADLINES = [
  "urgent",
  "oneToTwoWeeks",
  "threeToFourWeeks",
  "overOneMonth",
  "flexible",
];

const CONTACT_METHODS = ["phone", "email", "telegram"];

const STEP_KEYS = [
  { key: 1, labelKey: "steps.service.label" },
  { key: 2, labelKey: "steps.details.label" },
  { key: 3, labelKey: "steps.budget.label" },
  { key: 4, labelKey: "steps.contact.label" },
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
  const { t, i18n } = useTranslation();
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
      return t("validation.selectService");
    }
    if (step === 2 && (!data.title.trim() || !data.description.trim())) {
      return t("validation.projectDetails");
    }
    if (step === 3 && (!data.budget || !data.deadline)) {
      return t("validation.budgetDeadline");
    }
    if (step === 4 && (!data.name.trim() || !data.email.trim())) {
      return t("validation.nameEmail");
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

  return (
    <>
      <HelpWidget
        FAQ={[
          {
            q: t("مهم — لطفاً مطالعه کنید"),
            a: t("این پروژه در حال حاضر یک نسخه نمایشی (Demo) است و امکان ثبت سفارش هنوز فعال نیست!"),
          },
        ]}
      />
      <Background />
      <div className={style["back-to-home__btn"]}>
        <Link to="/">{t("common.backToHome")}</Link>
        <IoMdArrowRoundBack />
      </div>
      <div dir={i18n.dir()} className={style["hire-page"]}>
        <div className={style["hire-container"]}>
          {/* Header */}
          <div className={style["hire-header"]}>
            <div className={style["hire-badge"]}>The Mehti</div>
            <h1 className={style["hire-title"]}>{t("hireMe.title")}</h1>
            <p className={style["hire-subtitle"]}>{t("hireMe.subtitle")}</p>
          </div>

          {!submitted ? (
            <>
              {/* Step indicator */}
              <div className={style["step-indicator"]}>
                {STEP_KEYS.map((s, i) => (
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
                        {t(s.labelKey)}
                      </span>
                    </div>

                    {i < STEP_KEYS.length - 1 && (
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
                      {t("steps.service.heading")}
                    </h2>

                    <p className={style["step-description"]}>
                      {t("steps.service.description")}
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
                              {t(`servicesHireMePage.items.${s.id}.title`)}
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
                      {t("steps.details.heading")}
                    </h2>

                    <div>
                      <FieldLabel>{t("steps.details.titleLabel")}</FieldLabel>

                      <TextInput
                        value={data.title}
                        onChange={set("title")}
                        placeholder={t("steps.details.titlePlaceholder")}
                      />
                    </div>

                    <div>
                      <FieldLabel>
                        {t("steps.details.descriptionLabel")}
                      </FieldLabel>

                      <textarea
                        value={data.description}
                        onChange={(e) => set("description")(e.target.value)}
                        placeholder={t("steps.details.descriptionPlaceholder")}
                        rows={5}
                        className={style["text-area"]}
                      />
                    </div>

                    <div>
                      <FieldLabel>
                        {t("steps.details.referenceLabel")}
                      </FieldLabel>

                      <TextInput
                        value={data.referenceLink}
                        onChange={set("referenceLink")}
                        placeholder={t("steps.details.referencePlaceholder")}
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
                      {t("steps.budget.heading")}
                    </h2>

                    <div>
                      <FieldLabel>{t("steps.budget.budgetLabel")}</FieldLabel>

                      <div className={style["chip-row"]}>
                        {BUDGETS.map((b) => (
                          <Chip
                            key={b}
                            active={data.budget === b}
                            onClick={() => set("budget")(b)}
                          >
                            {t(`budgets.items.${b}`)}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    <div>
                      <FieldLabel>{t("steps.budget.deadlineLabel")}</FieldLabel>

                      <div className={style["chip-row"]}>
                        {DEADLINES.map((d) => (
                          <Chip
                            key={d}
                            active={data.deadline === d}
                            onClick={() => set("deadline")(d)}
                          >
                            {t(`deadlines.items.${d}`)}
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
                      {t("steps.contact.heading")}
                    </h2>

                    <div className={style["contact-grid"]}>
                      <div>
                        <FieldLabel>{t("steps.contact.nameLabel")}</FieldLabel>

                        <TextInput
                          value={data.name}
                          onChange={set("name")}
                          placeholder={t("steps.contact.namePlaceholder")}
                        />
                      </div>

                      <div>
                        <FieldLabel>{t("steps.contact.emailLabel")}</FieldLabel>

                        <TextInput
                          type="email"
                          value={data.email}
                          onChange={set("email")}
                          placeholder={t("steps.contact.emailPlaceholder")}
                        />
                      </div>

                      <div>
                        <FieldLabel>{t("steps.contact.phoneLabel")}</FieldLabel>

                        <TextInput
                          value={data.phone}
                          onChange={set("phone")}
                          placeholder={t("steps.contact.phonePlaceholder")}
                        />
                      </div>

                      <div>
                        <FieldLabel>
                          {t("steps.contact.methodLabel")}
                        </FieldLabel>

                        <div className={style["chip-row"]}>
                          {CONTACT_METHODS.map((m) => (
                            <Chip
                              key={m}
                              active={data.contactMethod === m}
                              onClick={() => set("contactMethod")(m)}
                            >
                              {t(`contact.methods.${m}`)}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={style["summary-box"]}>
                      <p className={style["summary-title"]}>
                        {t("steps.contact.summary.title")}
                      </p>

                      <p className={style["summary-line"]}>
                        {t("steps.contact.summary.servicesLabel")}{" "}
                        {data.services
                          .map((id) =>
                            t(`servicesHireMePage.items.${id}.title`),
                          )
                          .join(", ") || "—"}
                      </p>

                      <p className={style["summary-line"]}>
                        {t("steps.contact.summary.titleLabel")}{" "}
                        {data.title || "—"}
                      </p>

                      <p className={style["summary-line"]}>
                        {t("steps.contact.summary.budgetLabel")}{" "}
                        {data.budget ? t(`budgets.items.${data.budget}`) : "—"}{" "}
                        | {t("steps.contact.summary.timeLabel")}{" "}
                        {data.deadline
                          ? t(`deadlines.items.${data.deadline}`)
                          : "—"}
                      </p>
                    </div>
                  </div>
                )}

                {error && <p className={style["error-text"]}>{error}</p>}

                {/* Nav buttons */}
                <div className={style["nav-row"]}>
                  {step === 1 ? (
                    <Link className={style["btn-secondary"]} to="/">
                      {t("common.back")}
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
                        {t("common.next")}
                        <ChevronLeft size={16} />
                      </>
                    ) : document.documentElement.dir === "rtl" ? (
                      <>
                        {t("common.submit")}
                        <Send size={16} className={style["send-icon__rtl"]}/>
                      </>
                    ) : (
                      <>
                        {t("common.submit")}
                        <Send size={16} className={style["send-icon__ltr"]}/>
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

              <h2 className={style["success-title"]}>{t("success.title")}</h2>

              <p className={style["success-text"]}>
                {t("success.message", {
                  name: data.name,
                  contactMethod: data.contactMethod
                    ? t(`contact.methods.${data.contactMethod}`)
                    : t("contact.methods.email"),
                })}
              </p>

              <button
                type="button"
                onClick={restart}
                className={style["btn-ghost"]}
              >
                <RotateCcw size={14} />
                {t("success.newRequest")}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
