import * as React from "react";
import { Page, H1, P } from "./styled/Page";

export default function Index() {
  return (
    <Page>
      <H1>Home Page</H1>
      <P>Currently, just a spot that I'm keeping all my favourite recipes.</P> 
      <P>If you're seeing this, you're probably a friend helping me test it out.</P>
    </Page>
  );
};
