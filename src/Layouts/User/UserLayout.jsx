import { Outlet } from "react-router-dom";
import { SideBar } from "../../components/Sidebar/SideBar";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

const UserLayout = () => {
  const [showMenu, setMenu] = useState(true);
  return (
    <main style={{ display: "flex", flexDirection: "row" }}>
      <Outlet />
      <SideBar active={showMenu} />

      <button
        id="button"
        title="ShowMenu"
        aria-label="Show menu"
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          right: "20px",
          width: "50px",
          height: "50px",
          bottom: "20px",
          borderRadius: "50%",
          borderColor: showMenu ? "red" : "blue",
          borderWidth: "2px",
          borderStyle: "solid",
          color: showMenu ? "red" : "blue",
          background: "transparent",
          transition: "all 0.3s",
        }}
        onClick={() => setMenu(!showMenu)}
      >
        {!showMenu ? <AiOutlineMenu /> : <IoCloseSharp />}
      </button>
    </main>
  );
};

export default UserLayout;
