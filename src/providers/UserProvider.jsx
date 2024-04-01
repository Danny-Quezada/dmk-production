import React, { useState } from "react";
import { UserContext } from "./UserContext";


const UserProvider=({children})=>{
  const [user, changeUser] = useState({});

  return (
    <UserContext.Provider value={{ user, changeUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
