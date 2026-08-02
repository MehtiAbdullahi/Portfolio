import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./custom.css";
import ClickSpark from "./Click";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ClickSpark
      sparkColor="#ffaa00"
      sparkSize={5}
      sparkRadius={20}
      sparkCount={8}
      duration={400}
    >
      <App />
    </ClickSpark>
  </BrowserRouter>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
