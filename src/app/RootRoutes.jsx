import React from "react";
import { Redirect } from "react-router-dom";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import formsRoutes from "./views/forms/FormsRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/page/404" />
  }
];

const routes = [...sessionRoutes, ...dashboardRoutes, ...formsRoutes, ...redirectRoute, ...errorRoute];

export default routes;
