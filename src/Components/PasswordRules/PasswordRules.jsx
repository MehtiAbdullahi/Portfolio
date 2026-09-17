import styles from "./PasswordRules.module.css";
import { passwordRegex } from "../../Validators/regex";
import { useTranslation } from "react-i18next";

function PasswordRules({ value }) {
  const { t } = useTranslation();

  return (
    <>
      {passwordRegex.map((rule, index) => {
        const isValid = rule.regex.test(value);

        return (
          <li
            key={index}
            className={isValid ? styles.successText : styles.errorText}
          >
            {t(`${rule.text}`)}
          </li>
        );
      })}
    </>
  );
}

export default PasswordRules;
