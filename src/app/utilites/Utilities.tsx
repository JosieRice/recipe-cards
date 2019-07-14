import * as React from 'react'
import { default as angnosticStyled } from 'styled-components'

// Extends styled components to be able to assign HTML tags dynamically
// https://codesandbox.io/s/6881pjMLQ
// Not working for dnd
export default angnosticStyled(
  ({tag = 'ol', children, ...props}) =>
    React.createElement(tag, props, children)
)

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