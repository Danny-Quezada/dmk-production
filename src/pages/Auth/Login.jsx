import React, { useState } from "react";

import { toast } from "sonner";
import Button from "../../components/Button/Button";
import TextField from "../../components/Textfield/TextField";
export default function Login() {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const changeValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submit = async (event) => {
    event.preventDefault();
    if (user.name == "" || user.password == "") {
      return toast.error("Campos obligatorios");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        style={{
          width: "300px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "center",
        }}
        onSubmit={submit}
      >
        <h1 style={{ color: "blue", fontSize: "3.2em" }}>DKM</h1>
       
        <TextField
          autoFocus={true}
          value={user.name}
          onChangeInputValue={changeValue}
          id={"name"}
          isRequired={true}
          title={"Nombre de usuario"}
          type={"text"}
        />
        <TextField
          autoFocus={false}
          value={user.password}
          onChangeInputValue={changeValue}
          id={"password"}
          isRequired={true}
          title={"Contraseña"}
          type={"text"}
        />
        <Button title={"Iniciar sesión"} onSubmit={submit} />

      </form>
    </div>
  );
}
