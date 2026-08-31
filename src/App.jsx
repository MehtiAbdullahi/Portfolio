import routes from "./routes";
import Styles from "./App.module.css";
import { useRoutes } from "react-router-dom";
import HelpWidget from "./Components/Help/Help";

function App() {
  const route = useRoutes(routes);

  return (
    <>
      <HelpWidget
        FAQ={[
          {
            q: "مهم حتما بخونید",
            a: "این پروژه فعلا نمایشی هستش و بعضی از قابلیت کامل یا در دسترس نیست!",
          },
        ]}
      />
      {route}
    </>
  );
}

export default App;
