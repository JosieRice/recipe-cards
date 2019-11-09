import * as React from "react";
import { StyledTextArea } from "../styled/Modal";
import { useState } from "react";

export default function Description(props: any) {
  const [value, setValue] = useState(props.initialValue);

  return (
    <StyledTextArea
      value={value}
      onChange={e => {
        setValue(e.target.value);
      }}
    />
  );
}
