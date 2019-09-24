import { DragResult } from "../types/Globals";

export const arrayReorder = (result: DragResult, array: Array<string>, setState: any, setUpdate: any) => {
  const { destination, source } = result;

  let newArr = Array.from(array);
  newArr.splice(source.index, 1);
  newArr.splice(destination.index, 0, array[source.index]);

  setState(newArr);
  setUpdate(true);
}