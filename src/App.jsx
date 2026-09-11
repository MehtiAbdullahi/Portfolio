import routes from "./routes";
import Styles from "./App.module.css";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const route = useRoutes(routes);

  const { i18n } = useTranslation();

  useEffect(() => {
    const language = i18n.language;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "en" ? "ltr" : "rtl";
  }, [i18n.language]);

  return (
    <>
      {route}
    </>
  );
}

export default App;
