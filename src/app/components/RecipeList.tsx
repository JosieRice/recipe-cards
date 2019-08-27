import * as React from "react";
import { ULCards, LICards, TitleContainer, Title, Photo } from "./styled/Page";
import { Link } from "react-router-dom";

export default function RecipeList(props: any) {
  const { recipes, match } = props;
  return (
    <ULCards>
      {console.log("RECIPES: ", recipes)}
      {recipes.map((recipe: { recipeName: string; id: string }, index: number) =>

        <Link key={index} to={`${match.path}${recipe.id}`}>
          <LICards>
            <Photo src="https://firebasestorage.googleapis.com/v0/b/original-recipe.appspot.com/o/assets%2Fmoney-1144553_1280.jpg?alt=media&token=c8e30f1c-f38c-4cb5-9bd6-1df45b89ba57" />
            <TitleContainer>
              <Title>{recipe.recipeName}</Title>
            </TitleContainer>
          </LICards>
        </Link>

      )}
    </ULCards>
  );
};