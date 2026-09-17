import HireMePage from "./Page/HireMePage/HireMePage";
import Landing from "./Page/Landing/Landing";
import Login from "./Page/Login/Login";
import SignUp from "./Page/SignUp/SignUp";
import VerifyCode from "./Page/VerifyCode/VerifyCode";

let routes = [
  { path: "/", element: <Landing /> },
  { path: "/hire-me", element: <HireMePage /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  // { path: "/verify", element: <VerifyCode /> },
];

export default routes;
