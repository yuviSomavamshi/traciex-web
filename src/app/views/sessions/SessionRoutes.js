import SignIn from "./SignIn";
import NotFound from "./NotFound";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Otppage from "./Otppage";
import ScanCodeView from "./qrcode/ScanCodeView";

const settings = {
  activeLayout: "layout1",
  layout1Settings: {
    topbar: {
      show: false
    },
    leftSidebar: {
      show: false,
      mode: "close"
    }
  },
  layout2Settings: {
    mode: "full",
    topbar: {
      show: false
    },
    navbar: { show: false }
  },
  secondarySidebar: { show: false },
  footer: { show: false }
};

const sessionRoutes = [
  {
    path: "/login",
    component: SignIn,
    settings
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    settings
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    settings
  },
  {
    path: "/OTP-verification",
    component: Otppage,
    settings
  },
  {
    path: "/webtimer",
    component: ScanCodeView,
    settings
  },
  {
    path: "/page/404",
    component: NotFound,
    settings
  }
];

export default sessionRoutes;
