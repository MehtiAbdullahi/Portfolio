import routes from "./routes";
import Styles from "./App.module.css";
import { useRoutes } from "react-router-dom";

function App() {
  const route = useRoutes(routes);

  return <>{route}</>;
}

export default App;
