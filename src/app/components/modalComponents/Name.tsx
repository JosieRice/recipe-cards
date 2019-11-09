import * as React from "react";
import { NameInput } from "../styled/Modal";
import { useContext, useState } from "react";
import { userContext } from "../../context/UserContext";

interface Props {
  initialValue: string;
  fullscreen?: any;
  setValue?: any;
  setUpdate?: any;
}

export default function Name(props: Props) {
  const [user] = useContext(userContext);
  const [value, setValue] = useState(props.initialValue);
  // const { fullscreen, value, setValue, setUpdate } = props;

  return (
    <NameInput
      // disabled={fullscreen || !user}
      value={value}
      onChange={e => {
        setValue(e.target.value);
        // setUpdate(true);
      }}
    />
  );
}
