import React from "react";
import { Helmet } from "react-helmet";

const SidenavTheme = ({ theme, settings }) => {
  function lightHoverStyle() {
    return theme.palette.type === "light"
      ? `.navigation .nav-item:hover,
        .navigation .nav-item.active {
          color: ${theme.palette.primary.main};
        }`
      : "";
  }

  return (
    <Helmet>
      <style>
        {`${`.sidenav {
          color: ${theme.palette.text.secondary};
        }`}
        .sidenav__hold {
          background-image: url(${settings.layout1Settings.leftSidebar.bgImgURL});
          opacity: 1 !important;
        }
        .sidenav__hold::after {
          background: ${theme.palette.primary.main};
          opacity: ${settings.layout1Settings.leftSidebar.bgOpacity};
        }
        .navigation .nav-item:not(.badge) {
          color: ${theme.palette.text.primary};
        }
        .navigation .nav-item .icon-text::after {
          background: ${theme.palette.primary.main};
        }
        .navigation .nav-item.active, 
        .navigation .nav-item.active:hover {
          background: ${theme.palette.secondary.main};
        }

        
        ${lightHoverStyle()}
        
      `}
      </style>
    </Helmet>
  );
};

export default SidenavTheme;
