import * as React from "react";
import { StyledTextArea } from "../styled/Modal";
import { useState } from "react";

interface Props {
  initialValue: string;
  forwardRef: any;
}

export default function Description({ initialValue, forwardRef }: Props) {
  const [value, setValue] = useState(initialValue);

  return (
    <StyledTextArea
      value={value}
      ref={forwardRef}
      onChange={e => {
        setValue(e.target.value);
      }}
    />
  );
}
