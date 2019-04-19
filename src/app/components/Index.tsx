import * as React from "react";
import { Page } from "./styled/Page";
import { Example } from "./Test";

export default class Index extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {

    return (
      <Page>
        <h1>Landing Page</h1>
        <Example></Example>
      </Page>
    );
  }
};