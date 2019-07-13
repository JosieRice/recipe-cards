import * as React from "react";
import { LI } from "./styled/Page";
import { Link } from "react-router-dom";

export default function RecipeList(props: any) {
  const { recipes, match } = props;

  return (
    <ul>
      {recipes.map((recipe: { recipeName: string; id: string }, index: number) =>
        <LI key={index}>
          <Link to={`${match.path}${recipe.id}`}>
            {recipe.recipeName}
          </Link>
        </LI>
      )}
    </ul>
  );
};