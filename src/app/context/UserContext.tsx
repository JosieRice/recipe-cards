import * as React from "react";

// @ts-ignore
const userContext = React.createContext({
  user: null
});
 
const { Provider, Consumer } = userContext
 
export { userContext, Provider, Consumer };