import React from "react";
import { Navigate } from "react-router-dom";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import formsRoutes from "./views/forms/FormsRoutes";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Navigate to="/dashboard" />
  }
];

const errorRoute = [
  {
    component: () => <Navigate to="/page/404" />
  }
];

const routes = [...sessionRoutes, ...dashboardRoutes, ...formsRoutes, ...redirectRoute, ...errorRoute];

export default routes;
