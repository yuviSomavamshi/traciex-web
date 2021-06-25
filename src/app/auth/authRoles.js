export const authRoles = {
  sa: ["SA"], // Only Super Admin has access
  admin: ["SA", "Admin", "SubAdmin"], // Only SA & Admin has access
  editor: ["SA", "Admin", "EDITOR", "SubAdmin"], // Only SA & Admin & Editor has access
  guest: ["SA", "Admin", "EDITOR", "GUEST", "SubAdmin"] // Everyone has access
};

// Check out app/views/dashboard/DashboardRoutes.js
// Only SA & Admin has dashboard access

// const dashboardRoutes = [
//   {
//     path: "/dashboard",
//     component: Analytics,
//     auth: authRoles.admin <----------------
//   }
// ];
