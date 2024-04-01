import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MenuItemBar from "../MenuItemBar/MenuItemBar";
import { MdOutlineInventory2 } from "react-icons/md";
import { CgCalculator } from "react-icons/cg";
import SideBarCSS from "./Sidebar.module.css"


export const SideBar = ({ active }) => {
  const [path, setPath] = useState(null);
  let location = useLocation();
  useEffect(() => {
    if (path == null) {
      if (window.location.pathname != "/") {
        setPath(window.location.pathname.toLocaleLowerCase());
      }
    }
  }, []);

  return (
    <aside
      id={SideBarCSS.aside}
      style={{
        zIndex: 3,
        position: "fixed",
        left: active ? "0px" : "-60px",
        transition: "all 0.4s",
        transformStyle: "initial",
        display: "flex",
        width: "60px",
        flexDirection: "column",
        gap: "20px",
        height: "100vh",
        borderRightWidth: "2px",
        borderRightColor: "#DDDDDD50",
        borderRightStyle: "solid",
        
      }}
    >
      <nav style={{ display: "flex", flexDirection: "column" }}>
        <MenuItemBar
          click={() => setPath("/inventory")}
          icon={<MdOutlineInventory2 />}
          active={path == "/inventory" ? true : false}
          link="/inventory"
        />
        <MenuItemBar
          click={() => setPath("/equation")}
          icon={<CgCalculator />}
          active={path == "/equation" ? true : false}
          link="/equation"
        />
      </nav>
    </aside>
  );
};
