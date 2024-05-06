import { useState } from "react";
import { Outlet } from "react-router";
import { SideBar } from "../../components/Sidebar/SideBar";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

const GroupsLayout = () => {
    const [showMenu, setMenu] = useState(true);
    return (
     
        <main style={{ display: "flex", flexDirection: "row" }}>
          <Outlet />
          <SideBar active={showMenu} />

            <h2>Grupos</h2>
            <p>Toca cualquier grupo</p>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Villa Venezuela</td>
                    </tr>
                </tbody>
            </table>
            <button
                style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "fixed",
                    right: "20px",
                    width: "50px",
                    height: "50px",
                    bottom: "80px",
                    borderRadius: "50%",
                    borderColor: "green ",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    color: "green",
                    background: "transparent",
                    transition: "all 0.3s",
                }}
            >
                <FaPlus/>
            </button>

            <button
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

}


export default GroupsLayout;