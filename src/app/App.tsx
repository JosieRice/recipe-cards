import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
  NavBar,
  UnorderedList,
  ListItem,
  LoginLI,
  NavButton
} from "./components/styled/NavBar";
import { login } from "./services/Functions";

import Index from "./components/Index";
import About from "./components/About";
import { UserProvider } from "./context/UserContext";

function AppRouter() {
  return (
    <UserProvider value={}>
      <Router>
        <NavBar>
          <UnorderedList>
            <ListItem>
              <Link to="/">Home</Link>
            </ListItem>

            <ListItem>
              <Link to="/about/">About</Link>
            </ListItem>

            <LoginLI>
              <NavButton onClick={() => login()}>Login</NavButton>
            </LoginLI>
          </UnorderedList>
        </NavBar>

        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
      </Router>
    </UserProvider>
  );
}

// for hot reloading
declare let module: any;

ReactDOM.render(AppRouter(), document.getElementById("root"));

// for hot reloading
if (module.hot) {
  module.hot.accept();
}
