import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MenuItemBar from "../MenuItemBar/MenuItemBar";
import { MdOutlineInventory2 } from "react-icons/md";
import { CgCalculator } from "react-icons/cg";
import SideBarCSS from "./Sidebar.module.css";

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
        left: active ? "0px" : "-60px",
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
