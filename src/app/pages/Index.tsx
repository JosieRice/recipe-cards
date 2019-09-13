import * as React from "react";
import { Page, H1, P } from "../components/styled/Page";
// import firebase from "../services/Firebase";

export default function Index() {

  // const test = firebase.functions().httpsCallable('test');
  // test({ data: "messageText" }).then(function (result) {
  //   console.log('RESULT: ', result)
  // });

  return (
    <Page>
      <H1>Home Page</H1>
      <P>Welcome to Original Recipe. Browse through the current recipes, or Login and make your own!</P>
      <P>Currently only supported on Chrome.</P>
    </Page>
  );
};
