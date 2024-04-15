import React, { useState } from "react";
import { UserContext } from "./UserContext";

interface Props {
  children: any;
}
const UserProvider = ({ children }: Props) => {
  const [User, changeUser] = useState<string>("");
  return (
    <UserContext.Provider
      value={{
        User,
        changeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

