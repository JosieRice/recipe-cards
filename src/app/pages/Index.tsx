import * as React from "react";
import { Page, H1, P } from "../components/styled/Page";
import axios from "axios";

console.log('hi')

const serverUrl = "https://sheltered-cove-44895.herokuapp.com/api/v1/recipes";

const getDataAxios: any = async () => {
  console.log('start axios')
  const response = await axios.get(serverUrl)
  console.log("get", response.data)
}

const sentDataAxios: any = async () => {
  const response = await axios({
    method: 'post',
    url: serverUrl,
    headers: {},
    data: {
      url: 'bar', // This is the body part
    }
  })
  console.log("post", response.data)
}

export default function Index() {



  getDataAxios()
  sentDataAxios()

  return (
    <Page>
      <H1>Home Page</H1>
      <P>Currently, just a spot that I'm keeping all my favourite recipes.</P>
      <P>If you're seeing this, you're probably a friend helping me test it out.</P>
    </Page>
  );
};
