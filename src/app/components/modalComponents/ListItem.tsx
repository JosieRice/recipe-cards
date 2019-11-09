import * as React from "react";
import { useState } from "react";

interface Props {
  initialValue: string;
}

export default function ListItem({ initialValue }: Props) {
  const [value, setValue] = useState(initialValue);

  return (
    <input
      value={value}
      onChange={e => {
        setValue(e.target.value);
      }}
    />
  );
}
