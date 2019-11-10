import * as React from "react";
import { NameInput } from "../styled/Modal";
import { useState } from "react";

interface Props {
  initialValue: string;
}

export default function Name({ initialValue }: Props) {
  const [value, setValue] = useState(initialValue);

  return (
    <NameInput
      value={value}
      onChange={e => {
        setValue(e.target.value);
      }}
    />
  );
}
