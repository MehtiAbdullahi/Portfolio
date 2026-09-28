import { lazy, Suspense } from "react";
import Background from "./Components/Animation/Background/Background";
const HireMePage = lazy(() => import("./Page/HireMePage/HireMePage"));
const Landing = lazy(() => import("./Page/Landing/Landing"));
const Login = lazy(() => import("./Page/Login/Login"));
const SignUp = lazy(() => import("./Page/SignUp/SignUp"));
const VerifyCode = lazy(() => import("./Page/VerifyCode/VerifyCode"));
const Loader = lazy(() => import("./Components/Animation/Loader/Loader"));

const withSuspense = (element) => (
  <Suspense
    fallback={
      <>
        <Background /> <Loader />
      </>
    }
  >
    {element}
  </Suspense>
);

let routes = [
  { path: "/", element: withSuspense(<Landing />) },
  { path: "/hire-me", element: withSuspense(<HireMePage />) },
  { path: "/login", element: withSuspense(<Login />) },
  { path: "/signup", element: withSuspense(<SignUp />) },
  // { path: "/verify", element: <VerifyCode /> },
];

export default routes;
