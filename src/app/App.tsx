import * as React from 'react'
import * as ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext';

// Pages
import Index from "./components/Index";
import About from "./components/About";
import NewRecipe from "./components/NewRecipe";
import MyRecipes from './components/MyRecipes';
import AllRecipes from './components/AllRecipes';
import LoginLogout from './components/LoginLogout';
import UserPhoto from './components/UserPhoto';
import NoMatch from './components/NoMatch';

// Style
import { NavBar, UnorderedList, ListItem, LoginLI } from './components/styled/NavBar';


const Routing = (
  <UserContextProvider>
    <Router>
      <NavBar>
        <UnorderedList>
          <ListItem>
            <Link to="/">Home</Link>
          </ListItem>

          <ListItem>
            <Link to="/newrecipe/">New Recipe</Link>
          </ListItem>

          <ListItem>
            <Link to="/recipes/">My Recipes</Link>
          </ListItem>

          <ListItem>
            <Link to="/allrecipes/">All Recipes</Link>
          </ListItem>

          <LoginLI>
            <LoginLogout />
          </LoginLI>

          <LoginLI>
            <UserPhoto />
          </LoginLI>

        </UnorderedList>
      </NavBar>


      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/newrecipe/" component={NewRecipe} />
        <Route path="/recipes/" component={MyRecipes} />
        <Route path='/allrecipes/' component={AllRecipes} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </UserContextProvider>
)

// for hot reloading
declare let module: any;

ReactDOM.render(Routing, document.getElementById("root"));

// for hot reloading
if (module.hot) {
  module.hot.accept();
}

// TODO: 

// https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually

// https://codeburst.io/getting-started-with-react-router-5c978f70df91