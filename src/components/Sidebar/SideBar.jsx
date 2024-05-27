import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MenuItemBar from "../MenuItemBar/MenuItemBar";
import { MdOutlineInventory2 } from "react-icons/md";
import { CgCalculator } from "react-icons/cg";
import SideBarCSS from "./Sidebar.module.css";
import { IoPeopleSharp } from "react-icons/io5";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";

export const SideBar = ({ active }) => {
  const [path, setPath] = useState(null);
  let location = useLocation();
  useEffect(() => {
    if (path == null) {
      if (window.location.pathname != "/") {
        console.log(window.location.pathname.toLocaleUpperCase());
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
          click={() => setPath("/production/clients")}
          icon={<IoPeopleSharp />}
          active={path === "/production/clients" ? true : false}
          link="/production/clients"
        />
        <MenuItemBar
          click={() => setPath("/production/inventory")}
          icon={<MdOutlineInventory2 />}
          active={path === "/production/inventory" ? true : false}
          link="/production/inventory"
        />
        <MenuItemBar
          click={() => setPath("/production/admins")}
          icon={<FaPeopleCarryBox />}
          active={path === "/production/admins" ? true : false}
          link="/production/admins"
        />
        <MenuItemBar
          click={() => setPath("/production/dashboard")}
          icon={<FaChartBar />}
          active={path === "/production/dashboard" ? true : false}
          link="/production/dashboard"
        />

        <MenuItemBar
          click={() => setPath("/production/equation")}
          icon={<CgCalculator />}
          active={path === "/production/equation" ? true : false}
          link="/production/equation"
        />
      </nav>
    </aside>
  );
};
