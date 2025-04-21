import { createBrowserRouter } from "react-router";
import Layout from '../layout'
import Home from '../pages/home'
import About from '../pages/about'

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About }
    ]
  },
]);

export default router;
