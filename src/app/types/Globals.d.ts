declare global {
  interface Window {
    FS: { identify: any };
  }
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
