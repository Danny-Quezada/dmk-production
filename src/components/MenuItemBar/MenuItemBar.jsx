import React from "react";
import { NavLink } from "react-router-dom";

import MIB from "./MenuItemBar.module.css";
function MenuItemBar(props) {
  return (
    <NavLink
      aria-label={"Show" + props.link}
      style={{
        backgroundColor: props.active ? "#BFCFE750" : "",
        borderRightWidth: props.active ? 1 : 0,
        borderRightStyle: "solid",
        borderRightColor: "#525ceb",
      }}
      className={MIB.navLink}
      title={props.link}
      to={props.link}
      onClick={props.click}
    >
      {props.icon}
    </NavLink>
  );
}

export default MenuItemBar;
