import * as React from "react";
import { Page } from "./styled/Page";

import NewRecipe from "./NewRecipe";

export const Index = () => {
  return (
    <Page>
      <h1>Landing Page</h1>
      <NewRecipe />
    </Page>
  );
};
