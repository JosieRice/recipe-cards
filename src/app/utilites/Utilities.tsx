import * as React from 'react'
import axios from "axios";

import { default as angnosticStyled } from 'styled-components'

export function isEmpty(obj: Object) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export function strToArr(str: string) {
  const arrWithAll = str.split("\n");
  const arr = arrWithAll.filter(Boolean);
  return arr;
}

export function arrToStr(arr: any) {
  if (typeof (arr) === "string") return arr;
  const string = arr.join("\n")
  return string
}

export function extractHostname(url: string) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
    hostname = url.split('/')[2];
  }
  else {
    hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}

const production = location.hostname === "original-recipe.com";
const prodScraper = "https://sheltered-cove-44895.herokuapp.com/api/v1/recipes";
const stagingScraper = "http://localhost:8000/api/v1/recipes";

export const getRecipeDetails: any = async (url: string) => {
  const response = await axios({
    method: 'post',
    url: production ? prodScraper : stagingScraper,
    headers: {},
    data: {
      url
    }
  })

  console.log("post", response.data)

  return response.data.recipe
}




// Extends styled components to be able to assign HTML tags dynamically
// https://codesandbox.io/s/6881pjMLQ
// Not working for dnd
export default angnosticStyled(
  ({ tag = 'ol', children, ...props }) =>
    React.createElement(tag, props, children)
)