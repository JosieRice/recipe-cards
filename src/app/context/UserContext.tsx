import * as React from "react";
import { UserObj } from "../types/UserObj";
import { useState } from "react";

interface User {
  user: UserObj | null
}
type Context = Array<User | any>

const userContext = React.createContext<Context>([{user: null}, () => {}]);

const UserContextProvider = (props: any) => {
  const [user, setUser] = useState(null);
  
  return (
    <userContext.Provider value={[user, setUser]}>
      {props.children}
    </userContext.Provider>
  );
}
 
export { userContext, UserContextProvider };