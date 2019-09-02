import * as React from "react";
import { StyledTextArea, OL } from "../styled/Modal";
import { useContext } from "react";
import { userContext } from "../../context/UserContext";
import { Draggable, Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";

export default function List(props: any) {
  const [user] = useContext(userContext);

  const { recipe, array, setArray, fullscreen, onChange, reorder, listId, setUpdate } = props;

  const list = recipe && array.map((listItem: any, index: number) =>
    <Draggable
      draggableId={`${listId} ${index.toString()}`}
      index={index}
      key={index}
      disableInteractiveElementBlocking={reorder}
    >
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <StyledTextArea
            disabled={fullscreen || !user}
            spellCheck={false}
            value={listItem}
            rows={1}
            onChange={e => onChange(index, array, e.target.value, setArray)}
          />
        </li>
      )}
    </Draggable>
  )

  const canEdit = !fullscreen && user

  return (
    <>
      <Droppable droppableId={listId}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <OL
            ref={provided.innerRef}
          >
            {list}
            {provided.placeholder}
          </OL>
        )}
      </Droppable>
      {canEdit && <button
        onClick={() => {
          setArray([...array, ""])
          setUpdate(true)
        }}>
        +
      </button>}
    </>
  )
}