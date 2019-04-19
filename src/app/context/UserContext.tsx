import React from "react";

let UserContext = React.createContext({});

const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

export { UserContext, UserProvider, UserConsumer }
