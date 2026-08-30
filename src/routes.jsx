import HireMePage from "./Page/HireMePage/HireMePage"
import Landing from "./Page/Landing/Landing"

let routes = [
  {path: "/", element: <Landing />},
  {path: "/hire-me", element: <HireMePage />},
]

export default routes
