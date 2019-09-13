import * as React from 'react'
import * as ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext';
import { ToastProvider } from 'react-toast-notifications'

// Pages
import Index from "./pages/Index";
import NewRecipe from "./pages/NewRecipe";
import MyRecipes from './pages/MyRecipes';
import LoginLogout from './components/LoginLogout';
import UserPhoto from './components/UserPhoto';
import NoMatch from './components/NoMatch';

// Style
import { NavBar, UL, ListItem, LoginLI } from './components/styled/NavBar';
import ModalRecipe from './pages/ModalRecipe';

const Routing = () => {

  return (
    <UserContextProvider>
      <ToastProvider placement='bottom-center' autoDismissTimeout='4000'>
        <Router>
          <NavBar>
            <UL>
              <ListItem>
                <Link to="/">Home</Link>
              </ListItem>

              <LoginLI>
                <LoginLogout />
              </LoginLI>

              <LoginLI>
                <UserPhoto />
              </LoginLI>

            </UL>
          </NavBar>


          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/newrecipe/" component={NewRecipe} />
            <Route path="/recipes/" component={MyRecipes} />
            <Route path="/:id" render={(props) => <ModalRecipe {...props} collection={'original'} />} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </ToastProvider>
    </UserContextProvider>
  )
}

// for hot reloading
declare let module: any;

ReactDOM.render(<Routing />, document.getElementById("root"));

// for hot reloading
if (module.hot) {
  module.hot.accept();
}