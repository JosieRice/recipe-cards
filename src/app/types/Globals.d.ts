declare global {
  interface Window { FS: {identify: any} }
}

export interface UserObj {
  displayName: string;
  email: string;
  photoURL?: string;
  uid: string;
}
