import * as React from "react";
import { OL, StyledTextArea } from "../styled/Modal";
import { useContext } from "react";
import { userContext } from "../../context/UserContext";

export default function List(props: any) {
  const [user] = useContext(userContext);

  const { recipe, array, setArray, fullscreen, onChange, } = props;

  const list = recipe && array.map((prepInstruction: any, index: number) =>
    <li key={index}>
      <StyledTextArea
        disabled={fullscreen || !user}
        value={prepInstruction}
        onChange={e => onChange(index, array, e.target.value, setArray)}
      />
    </li>
  )

  return (
    <OL>{list}</OL>
  )
}




// const listIngredients = () => {
//   return (
//     recipe && ingredients.map((ingredient: any, index: number) =>
//       <Draggable draggableId={index.toString()} index={index} key={index} disableInteractiveElementBlocking={reorder}>
//         {(provided, snapshot) => (
//           <li
//             ref={provided.innerRef}
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//           >
//             <StyledTextArea
//               disabled={fullscreen || !user}
//               spellCheck={false}
//               value={ingredient}
//               rows={1}
//               onChange={e => handleArrayChange(index, ingredients, e.target.value, setIngredients)}
//             />
//           </li>
//         )}
//       </Draggable>
//     )
//   )

// }

// const IngredientsSection = () => {
//   return (
//     <Ingredients>
//       <Label>Ingredients: </Label>
//       <Droppable droppableId="ingredients">
//         {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
//           <UL
//             ref={provided.innerRef}
//           >
//             {listIngredients()}
//             {provided.placeholder}
//           </UL>
//         )}
//       </Droppable>
//       <button onClick={() => setIngredients([...ingredients, ""])}>+</button>
//     </Ingredients>
//   )
// }