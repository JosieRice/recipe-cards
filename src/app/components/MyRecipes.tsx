import * as React from "react";
import { Page } from "./styled/Page";
import { db } from "../services/Firebase";

export default function MyRecipes() {

  db.collection("recipes").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  });

  return (
    <Page>
      <h1>My Recipes</h1>
    </Page>
  );
};