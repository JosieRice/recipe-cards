import * as React from "react";
import ListItem from "../modalComponents/ListItem";
import { UL } from "../styled/Modal";

interface Props {
  listItems: string[];
  name: string;
}

export default function List({ listItems, name }: Props) {
  const list = listItems.map((item, i) => (
    <li>
      <ListItem initialValue={item} key={`${name}${i}`} />
    </li>
  ));
  return <UL>{list}</UL>;
}
