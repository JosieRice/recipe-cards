import * as React from "react";
import { UserObj } from "../types/UserObj";

interface User {
  user: UserObj | null
}

const userContext = React.createContext<User>({
  user: null
});
 
const { Provider, Consumer } = userContext
 
export { userContext, Provider, Consumer };