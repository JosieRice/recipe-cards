import * as React from "react";
import { OL, StyledTextArea } from "../styled/Modal";
import { useContext } from "react";
import { userContext } from "../../context/UserContext";

export default function List(props: any) {
  const [user] = useContext(userContext);

  const { recipe, array, setArray, fullscreen, onChange, } = props

  const listPrep = recipe && array.map((prepInstruction: any, index: number) =>
    <li key={index}>
      <StyledTextArea
        disabled={fullscreen || !user}
        value={prepInstruction}
        onChange={e => onChange(index, array, e.target.value, setArray)}
      />
    </li>
  )

  return (
    <OL>{listPrep}</OL>
  )
}