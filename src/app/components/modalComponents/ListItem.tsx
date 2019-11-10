import * as React from "react";
import { useState } from "react";
import { ListInput } from "../styled/Modal";

interface Props {
  initialValue: string;
}

export default function ListItem({ initialValue }: Props) {
  const [value, setValue] = useState(initialValue);

  return (
    <ListInput
      value={value}
      onChange={e => {
        setValue(e.target.value);
      }}
    />
  );
}
