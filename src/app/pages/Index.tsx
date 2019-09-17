import * as React from "react";
import { Page, H1 } from "../components/styled/Page";
import { Link, Route } from "react-router-dom";
import { db, auth, provider } from "../services/Firebase";
import { useToasts } from 'react-toast-notifications';
import { toastError } from "../utilites/Settings";
import Loading from "../components/Loading";
import RecipeList from "../components/RecipeList";
import ModalRecipe from "./ModalRecipe";
import { useEffect, useState, useContext } from "react";
import { userContext } from "../context/UserContext";
import { UserObj } from "../types/Globals";

export default function Index({ match }: any) {
  const [user, setUser] = useContext(userContext);
  const [recipes, setRecipes] = useState([]);

  const { addToast } = useToasts();

  useEffect(() => {
    db
      .collection('original')
      // .limit(5)   // use this limit for pagination or infinite scroll
      .get()
      .then(snap => {
        let list: any = []
        snap.forEach(recipe => {
          // Adds recipe id's onto the recipe object
          let recipeObj = recipe.data()
          recipeObj['id'] = recipe.id

          list = [...list, recipeObj]
        })
        setRecipes(list);
      })
      .catch(function (error) {
        addToast(`Unable to load recipes because ${error}, try again later`, toastError)
        console.error("Error adding document: ", error);
      });
  }, []);

  function login() {
    auth
      .signInWithPopup(provider)
      .then(result => {
        const user: UserObj = result.user;
        setUser(user);

        // identify user to FullStory
        window.FS.identify(user.uid, {
          displayName: user.displayName,
          email: user.email
        });

      })
      .catch(function (error) {
        addToast(`Unable to login because ${error}, try again later`, toastError)
        console.error("Error adding document: ", error);
      });
  }

  if (recipes.length === 0) return <Loading />;

  return (
    <Page>

      <H1>All Recipes</H1>

      {user ? <Link to="/recipes/">My Recipes</Link> : <a href="#" onClick={() => login()} >My Recipes</a>}

      <RecipeList
        recipes={recipes}
        match={match}
      />

      <Route path={`${match.path}:id`} render={(props) => <ModalRecipe {...props} collection={'original'} />} />

    </Page>
  );
};