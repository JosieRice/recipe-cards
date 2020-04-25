declare global {
  interface Window {
    FS: { identify: any };
  }
}

export interface UserObj {
  displayName: string;
  email: string;
  photoURL?: string;
  uid: string;
}

interface Location {
  droppableId: string;
  index: number;
}

export interface DragResult {
  draggableId: string;
  type: string;
  reason: string;
  source: Location;
  destination?: Location;
}
