import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Index from "./components/Index";
import Login from "./components/Login";
import About from "./components/About";

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login/">Login</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/login/" component={Login} />
        <Route path="/about/" component={About} />
      </div>
    </Router>
  );
}

// for hot reloading
declare let module: any;

ReactDOM.render(AppRouter(), document.getElementById("root"));

// for hot reloading
if (module.hot) {
  module.hot.accept();
}
