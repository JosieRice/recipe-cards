export function isEmpty(obj: Object) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export function strToArr(str: string) {
  const arrWithAll = str.split("\n");
  const arr = arrWithAll.filter(Boolean);
  return arr;
}