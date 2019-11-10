import * as React from "react";
import { NameInput } from "../styled/Modal";
import { useState } from "react";

interface Props {
  initialValue: string;
  forwardRef: any;
}

export default function RecipeName({ initialValue, forwardRef }: Props) {
  const [value, setValue] = useState(initialValue);

  return (
    <NameInput
      value={value}
      ref={forwardRef}
      onChange={e => {
        setValue(e.target.value);
      }}
    />
  );
}
