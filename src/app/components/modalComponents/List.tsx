import * as React from "react";
import ListItem from "../modalComponents/ListItem";

export default function List(props: any) {
  const { listItems } = props;

  const list = listItems.map((ingred: string, i: string) => (
    <ListItem initialValue={ingred} key={i} />
  ));
  return list;
}
