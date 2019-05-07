import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavBar, UnorderedList, ListItem, LoginLI } from "./styled/NavBar";
import Index from "./Index";
import About from "./About";
import { userContext, UserContextProvider } from "../context/UserContext";
import MyRecipes from "./MyRecipes";
import NewRecipe from "./NewRecipe";
import AllRecipes from "./AllRecipes";
import LoginLogout from "./LoginLogout";
import { useContext } from "react";
import UserPhoto from "./UserPhoto";

export default function Navigation() {
  const [user] = useContext(userContext);

  return (
    <UserContextProvider>
      <Router>
        <NavBar>
          <UnorderedList>
            <ListItem>
              <Link to="/">Home</Link>
            </ListItem>

            <ListItem>
              <Link to="/about/">About</Link>
            </ListItem>

            <ListItem>
              <Link to="/newrecipe/">New Recipe</Link>
            </ListItem>

            <ListItem>
              <Link to="/myrecipes/">My Recipes</Link>
            </ListItem>

            <ListItem>
              <Link to="/allrecipes/">All Recipes</Link>
            </ListItem>

            {/* {user && user.displayName} */}

            <LoginLI>
              <LoginLogout />
            </LoginLI>

            <LoginLI>
              <UserPhoto />
            </LoginLI>


          </UnorderedList>
        </NavBar>

        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/newrecipe/" component={NewRecipe} />
        <Route path="/myrecipes/" component={MyRecipes} />
        <Route path='/allrecipes/' component={AllRecipes} />
      </Router>
    </UserContextProvider>

  );
}
