import { useState } from "react";
import { Outlet } from "react-router";
import { SideBar } from "../../components/Sidebar/SideBar";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";


const CustomersLayout = () => {
    const [showMenu, setMenu] = useState(true);
    return (
     
        <main style={{ display: "flex", flexDirection: "row" }}>
          <Outlet />
          <SideBar active={showMenu} />

            <h2>Clientes</h2>
            <p>Toca cualquier cliente</p>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Daniel Perez</td>
                        <td>CarlosDaniel@gmail.com</td>
                    </tr>
                </tbody>
            </table>
  
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

}


export default CustomersLayout;