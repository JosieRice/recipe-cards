import * as React from "react";
import { ULCards, LICards, TitleContainer, Title, Photo } from "./styled/Page";
import { Link } from "react-router-dom";
import CreateNewButton from "./CreateNewButton";

export default function RecipeList({ recipes, match }: any) {
  return (
    <ULCards>
      <CreateNewButton />

      {recipes.map(
        (
          recipe: { recipeName: string; id: string; imageUrl: string },
          index: number
        ) => (
          <LICards key={index}>
            <Link to={`${match.path}${recipe.id}`}>
              <Photo src={recipe.imageUrl} />
              <TitleContainer>
                <Title>{recipe.recipeName}</Title>
              </TitleContainer>
            </Link>
          </LICards>
        )
      )}
    </ULCards>
  );
}
