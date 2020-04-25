import * as React from "react";
import { useState } from "react";
import { ListInput } from "../styled/Modal";

interface Props {
  initialValue: string;
  forwardRef: any;
}

export default function ListItem({ initialValue, forwardRef }: Props) {
  const [value, setValue] = useState(initialValue);

  return (
    <ListInput
      value={value}
      ref={forwardRef}
      onChange={e => {
        setValue(e.target.value);
      }}
    />
  );
}
