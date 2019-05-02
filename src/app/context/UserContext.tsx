import * as React from "react";

interface User {
  user: any
}

const userContext = React.createContext<User>({
  user: null
});
 
const { Provider, Consumer } = userContext
 
export { userContext, Provider, Consumer };