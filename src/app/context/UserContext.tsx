import * as React from "react";
import { UserObj } from "../types/Globals";
import { useState } from "react";

interface User {
  user: UserObj | null;
}
type Context = Array<User | any>;

const userContext = React.createContext<Context>([{ user: null }, () => {}]);

const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  return <userContext.Provider value={[user, setUser]}>{children}</userContext.Provider>;
};

export { userContext, UserContextProvider };
