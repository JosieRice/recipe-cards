import * as React from 'react'
import * as ReactDOM from "react-dom";
import Navigation from "./components/Navigation";

// for hot reloading
declare let module: any;

ReactDOM.render(<Navigation />, document.getElementById("root"));

// for hot reloading
if (module.hot) {
  module.hot.accept();
}
