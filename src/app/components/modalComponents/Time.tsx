import * as React from "react";
import { TimeInput } from "../styled/Modal";
import { useState } from "react";

interface Props {
  initialValue: string;
  forwardRef: any;
}

export default function Name({ initialValue, forwardRef }: Props) {
  const [value, setValue] = useState(initialValue);

  return (
    <TimeInput
      value={value}
      ref={forwardRef}
      onChange={e => {
        setValue(e.target.value);
      }}
    />
  );
}
