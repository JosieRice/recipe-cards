import * as React from "react";
import { ULCards, LICards, TitleContainer, Title, Photo } from "./styled/Page";
import { Link } from "react-router-dom";

export default function RecipeList(props: any) {
  const { recipes, match } = props;
  return (
    <ULCards>
      {recipes.map((recipe: { recipeName: string; id: string; imageUrl: string }, index: number) =>

        <Link key={index} to={`${match.path}${recipe.id}`}>
          <LICards>
            <Photo src={recipe.imageUrl} />
            <TitleContainer>
              <Title>{recipe.recipeName}</Title>
            </TitleContainer>
          </LICards>
        </Link>

      )}
    </ULCards>
  );
};