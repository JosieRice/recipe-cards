import * as React from "react";
import { TimeInput } from "../styled/Modal";
import { useState } from "react";

export default function Name(props: any) {
  const [value, setValue] = useState(props.initialValue);

  return (
    <TimeInput
      value={value}
      onChange={e => {
        setValue(e.target.value);
      }}
    />
  );
}
