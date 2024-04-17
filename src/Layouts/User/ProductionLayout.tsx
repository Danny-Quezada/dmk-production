import { Outlet } from "react-router-dom";
import { SideBar } from "../../components/Sidebar/SideBar";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import React from "react";
import InventoryProvider from "../../providers/InventoryProvider";

const ProductionLayout = () => {
 
  return (
    <InventoryProvider>
      <main style={{ display: "flex", flexDirection: "row", overflow: "hidden"}}>
        <Outlet />
        
      </main>
    </InventoryProvider>
  );
};

export default ProductionLayout;
